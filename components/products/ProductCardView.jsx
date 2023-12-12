import { TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import styles from './productCardView.style';
import IonIcons from "@expo/vector-icons/Ionicons";
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = ({item}) => {
    const navigation = useNavigation();
  return (
   <TouchableOpacity onPress={()=> navigation.navigate("ProductDetails")}>
    <View style= {styles.container}>
     <View style={styles.imageContainer}>
        <Image
         source={require('../../assets/images/carousel2.jpg')}
         style={styles.image}
        />
     </View>

     <View style= {styles.details}>
        <Text style={styles.title} numberOfLines={1}>Product</Text>
        <Text style={styles.supplier} numberOfLines={1}>Product</Text>
        <Text style={styles.price}>$2453</Text>
     </View>

     <TouchableOpacity style={styles.addToCartBtn}>
        <IonIcons name='add-circle' size={35} color={COLORS.primary}/>
     </TouchableOpacity>
    </View>
   </TouchableOpacity>
  )
}

export default ProductCardView