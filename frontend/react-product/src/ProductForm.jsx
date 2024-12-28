import { useRef } from "react";
import { saveProduct } from "./service/ProductService";

function ProductForm(){
  const nameRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const jsonPayload ={
      name : nameRef.current.value,
      quantity : parseInt(quantityRef.current.value,10),
      price : parseFloat(priceRef.current.value),
      category : categoryRef.current.value,
      image : imageRef.current.files[0].name
    }
    saveProduct(jsonPayload);
  }

  return(
    <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <label>Product Name</label>
    <input type="text" ref={nameRef} required />
    <br/><br/>
    <label>Product Quantity</label>
    <input type="number" ref={quantityRef} required/>
    <br/><br/>
    <label>Product Price</label>
    <input type="number" ref={priceRef} required />
    <br/><br/>
    <label>Product Category</label>
    <input type="text" ref={categoryRef} required />
    <br/> <br/>
    <label>Product Image</label>
    <input type="file" ref={imageRef} required />
    <br/><br/>
    <button type="submit">Submit</button>

    </form>
    </>
  )


}

export default ProductForm;