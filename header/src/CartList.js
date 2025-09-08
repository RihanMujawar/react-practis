import React,{useState,useEffect} from 'react'
import'./App.css'
function CartList({cart}) {
const [CART,setCART]= useState([])
useEffect(() => {
setCART(cart)
}, [cart])
return (
<div>
{
CART?.map((cartitem,cartindex)=>{
return(
<div>
<img src={cartitem.url} width={60}/>
<span> {cartitem.name} </span>
<button onClick={()=>{ 
const _CART = CART.map((item,index)=>{
return cartindex ===index? {...item,quantity:item.quantity>0?item.quantity-1:0}:item
})
setCART(_CART)
}}>
- </button>
<span> {cartitem.quantity} </span>
<button onClick={()=>{
const _CART = CART.map((item,index)=>{
	return cartindex === index ? { ...item, quantity: item.quantity + 1 } : item
})
setCART(_CART)
}}>+ </button>
<span>Rs.{cartitem.price* cartitem.quantity} </span>
</div>
)
})
}
<p>Total=<span>
</span>
{CART.map(item=>item.price*item.quantity).reduce((total,value)=>total+value,0)}
</p>
</div>
)
}
export default CartList;

