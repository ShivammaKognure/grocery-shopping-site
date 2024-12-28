import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts } from "./store";
import { useEffect } from "react";

function Veg(){

  const dispatch =useDispatch()
  
  const status = useSelector((state) => state.products.status);

  //action
  useEffect(() => {
   // if (status === 'idle') {
      dispatch(fetchProducts());
   // }
  }, [dispatch]);
  //state
  const vegProducts = useSelector(state => state.products.veg)
  
  // const items = vegProducts.map( (product,index) =>
  //                               <li key={index}>{product.name}- ${product.price.toFixed(2)}
  //                               <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
  //                               </li>
  //                               )
                 
  return(
    <>
  <div className="container m-4">
  <h2>Vegetarian Products</h2>
      <div className="row">
        {vegProducts.map((product) => (
          <div className="col-md-2 mb-4" key={product.id}>
            <div className="card p-1 shadow-lg text-center"> 
            <div className="" > 
            {product.image ? (
                  <img
                    src={`images/${product.image}`} // Assuming 'product.image' contains the image URL
                    className="ard-img-top"
                    alt={product.name}
                    style={{ height: '110px', width:'100%'}}
                  />
                  ) : 'No Image'}
                  </div>
              
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: <i class="fa-solid fa-indian-rupee-sign"/>{product.price.toFixed(2)}</p>
                <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
export default Veg;