import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createContext, useState, useEffect } from 'react';
import styles from './cart.style';
import IonIcons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants';
import fetchCart from '../hook/fetchCart';
import CartTile from '../components/cart/cartTile';
import Button from '../components/Button';


const Cart = ({ navigation }) => {
  const { data, loading, error, refetch } = fetchCart();
  const [selected, setSelected] = useState(null);
  const [select, setSelect] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
            name='chevron-back-circle'
            size={30}
            color={COLORS.primary}
          />

        </TouchableOpacity>
        <Text style={styles.titleText}>Cart</Text>
      </View>
      {loading ?
        (<ActivityIndicator />) :
        (<FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CartTile item={item} onPress={() => { setSelected(item), setSelect(!select) }} select={select} />}
        />)}

      {select === false ?
        (<View></View>) :
        (<Button title='Checkout'
          isValid={select}
          loader={false}
          onPress={() => { }} />)}
    </SafeAreaView>
  )
}

export default Cart