import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchCart = async () => {
  const [data, setData] = useState([]);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    const token = await AsyncStorage.getItem("token");

    try {
      const userId = await AsyncStorage.getItem("id");
      console.log("User id", userId);
      const endpoint = `http://192.168.2.24:3000/api/carts/find/${userId}`;
      const headers = {
        "Content-Type": "application/json",
        token: "Bearer " + JSON.parse(token),
      };

      const response = await axios.get(endpoint, { headers });
      console.log(response);

      const cartProducts = response.data[0].products;
      setData(cartProducts);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching cart data");
      setError(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setLoader(true);
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default fetchCart;
