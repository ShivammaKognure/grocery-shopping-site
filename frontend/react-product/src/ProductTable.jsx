import React, { useState } from 'react';
import { deleteProduct, getProducts } from './service/ProductService';

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Function to fetch products when the button is clicked
  const handleFetchData = async() => {
      try{
        const data = await getProducts()
        setProducts(data);
        setIsDataFetched(true);
      }catch(error){
        console.error('Error fetching products:', error);

      } 
  };

  const handleDelete = async(id)=>{
    try{
      await deleteProduct(id);
      //const updatedProducts = products.filter(product => product.id !== id);
      //setProducts(updatedProducts);
      handleFetchData();
    }catch(error){
      console.error("Error deleting the product",error);
    }

  }

  return (
    <>
      <h3>Product Table</h3>
      <button onClick={handleFetchData}>Fetch Data</button>
      
      {isDataFetched ? (
        <table border="1" style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  {product.image ? (
                    <img src={`images/${product.image}`} alt="Product" width="50" />
                  ) : 'No Image'}
                </td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button>Edit</button>
                  <button onClick={()=>handleDelete(product.id)}>Delete</button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data fetched. Click "Fetch Data" to load products.</p>
      )}
    </>
  );
}

export default ProductTable;
