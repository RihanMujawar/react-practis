import React from 'react';
import ReactDOM from 'react-dom/client';
function Football() {const shoot=(a,b)=>{
alert(b.type);

}
return(
<button onClick={(event)=>shoot("Goal!",event)}>Taketheshot! from event</button>
);
}
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<Football/>);
export default Football;