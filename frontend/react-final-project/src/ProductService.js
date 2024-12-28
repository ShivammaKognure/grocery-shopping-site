import axios from "axios"

export const getProducts = async() =>{
  try{
    const response = await axios.get("http://localhost:8086/api/v1/products")
    console.log("Api response",response.data);
    return response.data;
  }catch(error){
    console.error(error);
    return [];
  }
}