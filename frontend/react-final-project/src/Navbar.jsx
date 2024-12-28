
import { useSelector } from "react-redux";
import { Link  } from "react-router-dom"
function Navbar(){
  const cart =useSelector((state)=>state.cart);
  
  const totalItems = cart.reduce((sum,item)=>sum+item.quantity,0)
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">
                        <i className="fa-solid fa-house" /> ShopEase
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/veg" className="nav-link">
                                    <i className="fa-solid fa-seedling" /> Veg
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/nonveg" className="nav-link">
                                    <i className="fa-solid fa-drumstick-bite" /> Non Veg
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">
                                    <i className="fa-solid fa-cart-shopping" /> Cart {totalItems}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/purchasehistory" className="nav-link">
                                    <i className="fa-solid fa-clock-rotate-left" /> Purchase History
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/aboutus" className="nav-link">
                                    <i className="fa-solid fa-address-card" /> About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contactus" className="nav-link">
                                    <i className="fa-solid fa-phone" /> Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                </Link>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
    </>
  )
}
export default Navbar;