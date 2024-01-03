import { TouchableOpacity, View, Text, Image } from 'react-native';
import React from 'react';
import styles from './productCardView.style';
import IonIcons from "@expo/vector-icons/Ionicons";
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';


const ProductCardView = ({item}) => {
    const navigation = useNavigation();
    console.log("Image", item.imageUrl);
  return (
   <TouchableOpacity onPress={()=> navigation.navigate("ProductDetails", {item})}>
    <View style= {styles.container}>
     <View style={styles.imageContainer}>
        <Image
         source={{uri: item.imageUrl}}
         style={styles.image}
        />
     </View>
     <View style= {styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
        <Text style={styles.price}>{item.price}</Text>
     </View>

     <TouchableOpacity style={styles.addToCartBtn}>
        <IonIcons name='add-circle' size={35} color={COLORS.primary}/>
     </TouchableOpacity>
    </View>
   </TouchableOpacity>
  )
}

export default ProductCardView