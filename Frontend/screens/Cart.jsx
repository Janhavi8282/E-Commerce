import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useState, useEffect } from 'react';
import styles from './cart.style';
import IonIcons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants';
import fetchCart from '../hook/fetchCart';
import CartTile from '../components/cart/cartTile';
import Button from '../components/Button';
import { UpdateCartContext } from '../context/UpdateCartContext';

const Cart = ({ navigation }) => {
  const { setUpdateCart } = useContext(UpdateCartContext);
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState([]);
  const [select, setSelect] = useState(false);


  const toggleSelect = (itemId) => {
    setSelected((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Item is already selected, remove it
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Item is not selected, add it
        return [...prevSelectedItems, itemId];
      }

    });

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Cart</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <CartTile item={item} onPress={() => toggleSelect(item._id)} select={selected.includes(item._id)} />}
      />
      {selected.length === 0 ? (<View></View>) : (
        <Button
          title='Checkout'
          loader={false}

          onPress={() => { }} />
      )}
    </SafeAreaView>

  );
}

export default Cart