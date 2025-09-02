import React from 'react';
import ReactDOM from 'react-dom/client';
function Football(){const
shoot=(a)=>{alert(a);
}
return(
<button onClick={()=>shoot("Goal!")}>Take the shot! from passing</button>
);
}
const root=ReactDOM.createRoot(document.getElementById('root'));root.render(<Football/>);
export default Football;