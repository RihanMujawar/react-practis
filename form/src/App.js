import { useState } from 'react';
import './App.css';
export default function Form()
{
// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [submitted, setSubmitted] = useState(false);
const handleName = (e) => {
setName(e.target.value);
};
const handleEmail = (e) => {
setEmail(e.target.value);
};
const handlePassword = (e) => {
setPassword(e.target.value);
};
const handleSubmit = (e) => {
e.preventDefault();
if (name === '' || email === '' || password === '') {
alert("Please enter all the fields");
} else {
setSubmitted(true);
}
};
// Showing success message
const successMessage = () => {
if(submitted)
return (
<div className="success" >
<h1>User {name} successfully registered!!</h1>
</div>
);
};
return (
<div className="form">
<div>
<h1> Login to GPT mudhol Website </h1>
</div>

<form>
<fieldset>
{/* Labels and inputs for form data */}
<label className="label">Name</label>
<input onChange={handleName} className="input" value={name} type="text" /><br></br>
<label className="label">Email</label>
<input onChange={handleEmail} className="input" value={email} type="email" /><br></br>
<label className="label">Password</label><input onChange={handlePassword} className="input" value={password} type="password"
/><br></br>
<button onClick={handleSubmit} className="btn" type="submit">
Submit
</button>
</fieldset>
</form>
{/* Calling to the methods */}
<div className="messages">
{successMessage()}
</div>
</div>
);
}