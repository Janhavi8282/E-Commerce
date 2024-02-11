import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useContext } from "react";


const addToCart = async (productId, quantity, updateCart) => {
  
  try {
    const token = await AsyncStorage.getItem("token");
    const endpoint = "http://192.168.2.24:3000/api/carts";
    console.log(token);
    const data = {
      cartItem: productId,
      quanity: quantity,
    };

    const headers = {
      "Content-Type": "application/json",
      token: "Bearer " + JSON.parse(token),
    };
    await axios.post(endpoint, data, { headers });
   updateCart({cartCount: updateCart.cartCount +1})
  } catch (error) {
    throw new Error(error.message);
  }
};

export default addToCart;
