import axios from "axios"

export const saveProduct = (jsonPayload)=>{
  try{
    const response = axios.post("http://localhost:8086/api/v1/save",jsonPayload);
    console.log("Product Complete response",response);
    console.log("data",response.data);
    alert("product saved successfully");

  }catch(error){
console.error("error saving product",error);
  }
  
}

export const getProducts= async ()=>{
  try{
    const response= await axios.get("http://localhost:8086/api/v1/products")
    console.log(response.data);
    return response.data;
  }catch(error){
    console.error("Error fetching products",error);
    return [];
  }
}

export const deleteProduct = async(id)=>{
  try{
    console.log(id);
    const response = await axios.delete(`http://localhost:8086/api/v1/products/${id}`);
    return response;
  }catch(error){
    console.error("Error while deleting product",error);
  }
}