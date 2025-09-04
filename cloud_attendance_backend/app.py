from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import numpy as np
import base64
import cv2
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient("mongodb+srv://<username>:<password>@cluster.mongodb.net/")
db = client["attendance_db"]
students_col = db["students"]
attendance_col = db["attendance"]

def decode_image(image_base64):
    image_data = base64.b64decode(image_base64.split(',')[1])
    np_arr = np.frombuffer(image_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    image = decode_image(data['image'])
    name = data.get('name', 'Unknown')
    student_id = data.get('student_id', None)

    encodings = face_recognition.face_encodings(image)
    if len(encodings) == 0:
        return jsonify({"message": "No face detected"}), 400

    embedding = encodings[0].tolist()

    students_col.insert_one({
        "student_id": student_id,
        "name": name,
        "embedding": embedding
    })

    return jsonify({"message": "Face registered successfully!"})

@app.route('/attendance', methods=['POST'])
def attendance():
    data = request.json
    image = decode_image(data['image'])
    encodings = face_recognition.face_encodings(image)
    if len(encodings) == 0:
        return jsonify({"message": "No face detected"}), 400

    captured_face = encodings[0]

    # Compare with registered students
    students = list(students_col.find())
    for student in students:
        known_embedding = np.array(student['embedding'])
        result = face_recognition.compare_faces([known_embedding], captured_face)
        if result[0]:
            attendance_col.insert_one({
                "student_id": student['student_id'],
                "name": student['name'],
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "status": "Present"
            })
            return jsonify({"message": f"Attendance marked for {student['name']}!"})

    return jsonify({"message": "Face not recognized!"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
