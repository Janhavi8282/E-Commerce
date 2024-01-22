import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from '../../screens/cart.style';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartTile = ({item, onPress}) => {
    if(!item || !item.cartItem){
        return null;
    }
  return (
    <TouchableOpacity style={styles.favContainer} onPress={onPress}>
        <View style={styles.imageContainer}>
            <Image
              source={{uri: item.cartItem.imageUrl}}
              style={styles.image}
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productTitle} numberOfLines={1}>{item.cartItem.title}</Text>
            <Text style={styles.productSupp} numberOfLines={1}>{item.cartItem.supplier}</Text>
            <Text style={styles.productSupp} numberOfLines={1}>{item.cartItem.price}</Text>
        </View>

        <TouchableOpacity style={{paddingBottom: 20, paddingLeft: 75}} onPress={() =>{}}>
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