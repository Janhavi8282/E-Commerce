import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UpdateCartContext } from '../../context/UpdateCartContext';
import styles from '../../screens/cart.style';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS } from '../../constants';

const CartTile = ({ item, onPress, select }) => {
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const deleteCart = async (id) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const endpoint = `http://192.168.2.24:3000/api/carts/${id}`;

      const headers = {
        "Content-Type": "application/json",
        "token": "Bearer " + JSON.parse(token)
      }

      const response = await axios.delete(endpoint, { headers });
      if (response.status === 200) {
        setUpdateCart(!updateCart);
      }
    }
    catch (error) {
      console.log(error.message);
    }
  }

  return (
    <TouchableOpacity style={styles.favContainer(select ? COLORS.secondary : '#FFF')} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.cartItem.imageUrl }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.cartItem.title}</Text>
        <Text style={styles.productSupp} numberOfLines={1}>{item.cartItem.supplier}</Text>
        <Text style={styles.productSupp} numberOfLines={1}>{item.cartItem.price} * {item.quantity}</Text>
      </View>

      <TouchableOpacity style={{ paddingBottom: 20, paddingLeft: 75 }} onPress={() => deleteCart(item._id)}>
        <AntDesign
          name='delete'
          size={18}
          color={COLORS.red}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default CartTile;