import React from 'react'
import './App.css'
function Header(props) {
return (
<div className='flex shopping-cart'>
<div onClick={()=>props.handleShow(false)}>ShoppingCart</div>
<div onClick={()=>props.handleShow(true)}> Cart
<sup>{props.count}</sup>
</div>
</div>
)
}
export default Header;