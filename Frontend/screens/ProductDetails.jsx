import { Text, View, Image, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { useRoute } from '@react-navigation/native';
import styles from './productDetails.style';
import { COLORS } from '../constants';
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProductDetails = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  
  const [count,setCount] = useState(1);

  //increment the count
  const increment = () =>{
    setCount(count + 1);
  }

  //decrement the count
  const decrement = () =>{
    if(count > 1){
    setCount(count - 1);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
           name='chevron-back-circle'
           size={30}
           color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <IonIcons
           name='heart'
           size={30}
           color= {COLORS.primary}
          />
        </TouchableOpacity>
        
    </View>

    <Image
        source={{uri:item.imageUrl,}}
        style={styles.image}
        />

    <View style={styles.details}>
      <View style={styles.detailsTitle}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </View>

    <View style={styles.ratingRow}>
      <View style={styles.rating}>
        {[1,2,3,4,5].map((index) => (
          <FontAwesomeIcon
           key={index}
           name='star'
           size={24}
           color="gold"
          />
          
        ))}

        <Text style={styles.ratingText}> (4.9)</Text>
      </View>

      <View style={styles.rating}>
        <TouchableOpacity onPress={()=> increment()}>
        <EvilIcons
            name='plus'
            size={24}
           />
        </TouchableOpacity>

        <Text style={styles.ratingText}> {count} </Text>

        <TouchableOpacity onPress={()=> decrement()}>
        <EvilIcons
            name= 'minus'
            size={24}
           />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.descriptionWrapper}>
      <Text style={styles.description}>Decsription</Text>
      <Text style={styles.descTitle}>{item.description}</Text>
    </View>

    <View style={styles.locationWrapper}>
      <View style={styles.location}>
        <View style={{flexDirection: "row"}}>
          <IonIcons
           name='location-outline'
           size={24}
          />
          <Text>  {item.product_location}</Text>
        </View>

        <View style={{flexDirection: "row"}}>
          <MaterialCommunityIcons
           name='truck-delivery-outline'
           size={24}
          />
          <Text>  Free Delivery</Text>
        </View>
      </View>
    </View>

    <View style={styles.cartRow}>
        <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}>
          <Text style={styles.btnTitle}>BUY NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}} style={styles.addCartBtn}>
          <MaterialCommunityIcons 
          name= 'shopping'
          size={24}
          color={COLORS.lightWhite}
          />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ProductDetails
