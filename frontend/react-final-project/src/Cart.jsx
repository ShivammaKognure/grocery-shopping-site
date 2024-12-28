import { useDispatch, useSelector } from "react-redux";
import { addPurchase, clearCart, decrement, increment, removeItem } from "./store";
import { useState } from "react";


function Cart(){

const cart = useSelector((state) => state.cart)
const dispatch = useDispatch()

//const totalItems = cart.reduce((sum,item) => sum+item.quantity,0)

//convert all cart items into list with buttons + -
const items =cart.map((item,index)=>
  <li key={index}>{item.name} - ${item.price} Qty-{item.quantity}
  <button onClick={()=>dispatch(increment({name:item.name}))}>+</button>
  <button onClick={() => dispatch(decrement(item))}>-</button>
  <button onClick={()=> dispatch(removeItem(item))}>Remove</button>
  </li>)

  //calculate coupen discount
  const [coupenCode,setCopenCode] = useState("")
  const [coupenDis,setCoupenDis] = useState(0)
  const handleApplyCoupen=()=>{
    switch (coupenCode) {
      case "RATAN10":
        setCoupenDis(10);        
        break;
      case "RATAN20":
        setCoupenDis(20);
        break;  
      default:
        alert("Invalid Coupen code")
        setCoupenDis(0)
        break;
    }
  }

//calculating discount
const [disPrice,setDisPrice] = useState(0)

const applyDiscount = (disValue)=>{
  setDisPrice(disValue)
}

const calculateTotal = ()=>{
  //calculate total amount
  const total = cart.reduce((sum,item) => sum+ item.price*item.quantity,0) 
  //calclate discount price
  const discountPrice = total*(disPrice)/100;
  //calculate coupen discount
  const coupenDiscount = total*(coupenDis)/100;
  //calculate Final Amount
  const netAmount = total - discountPrice - coupenDiscount;
  return{
    total:parseFloat(total.toFixed(2)),
    discountPrice:parseFloat(discountPrice.toFixed(2)),
    coupenDiscount:parseFloat(coupenDiscount.toFixed(2)),
    netAmount:parseFloat(netAmount.toFixed(2)), 
  }
    
}

const handlePurchase =()=>{
  //take values
  const {netAmount} = calculateTotal();
  const purchaseDate = new Date().toLocaleDateString();

  //using above values make objects
  const purchaseDetails = {
    date : purchaseDate,
    items : [...cart],
    totalAmount : Number(netAmount),
  };

  //dispatch clear cart reducer
  dispatch(clearCart());

  //dispatch reducer which add purchase details to purchase history
  dispatch(addPurchase(purchaseDetails));

}

const {total,discountPrice,coupenDiscount,netAmount}=calculateTotal();

// These two states control the visibility of the coupon input and discount buttons

const [showCouponInput, setShowCouponInput] = useState(false);
const [showDiscountButtons, setShowDiscountButtons] = useState(false);


  return(
    <>
    <div className="container mt-4 col-md-6">
      {items.length === 0 ? (
        <>        
        <div >
        <img src={`images/cartempty.jpg`} style={{ height: '80%', width:'80%'}}/>
        <h2 className="container mt-4 col-md-6">Cart is Empty</h2>
        </div>
        </>
      ) : (
        <>
          {/* List of Cart Items */}
          <h2 className="mb-4">Shopping Cart</h2>
          <div className="cart-content ">
          
          <ul className="list-group mb-4">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name} - ${item.price} x {item.quantity}
              <div>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => dispatch(increment({ name: item.name }))}>+</button>
                <button className="btn btn-sm btn-outline-primary me-1" onClick={() => dispatch(decrement(item))}>-</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => dispatch(removeItem(item))}>Remove</button>
              </div>
            </li>
            ))}
          </ul>
          
          {/* Total before discounts */}
          <p className="fw-bold">Total before discount: ${total}</p>
          
          {/* Discount Options */}
          <div className="mt-3">
            <button className="btn btn-outline-primary me-2" onClick={() => {
              setShowCouponInput(!showCouponInput);
              setShowDiscountButtons(false);
            }}>
              Apply Coupon
            </button>
            <button className="btn btn-outline-primary" onClick={() => {
              setShowDiscountButtons(!showDiscountButtons);
              setShowCouponInput(false);
            }}>
              Apply Discount
            </button>
          </div>

          {/* Coupon Input */}
          {showCouponInput && (
            <>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                style={{ boxShadow: 'none' }} 
                value={coupenCode}
                onChange={(e) => setCopenCode(e.target.value)}
                placeholder="Enter Coupon Code"
              />

              <button className="btn btn-outline-secondary" onClick={handleApplyCoupen}>
                Apply Coupon
              </button>
              
            </div>
            <p>Coupon Discount Amount: ${coupenDiscount}</p>
             </>
          )}

          {/* Discount Buttons */}
          {showDiscountButtons && (
            <>
            <div className="mt-2">
              <button className="btn btn-outline-primary me-2" onClick={() => applyDiscount(10)}>10%</button>
              <button className="btn btn-outline-primary me-2" onClick={() => applyDiscount(20)}>20%</button>
              <button className="btn btn-outline-primary" onClick={() => applyDiscount(30)}>30%</button>
              <p>Discount Amount: ${discountPrice}</p>
            </div>
            
            </>
          )}
          
          {/* Discount Summary  <p>Discount applied: {disPrice}%</p>*/}
          <div className="mt-3">
            
            
           
            <p className="fw-bold">Total After Discount Applied: ${netAmount}</p>
          </div>
          
          {/* Purchase Button */}
          <button className="mt-3" onClick={handlePurchase}>
            Complete Purchase
          </button>
          </div>
         
          
        </>
      )}
    </div>
    </>
  )
}
export default Cart;