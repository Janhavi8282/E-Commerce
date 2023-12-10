import { Text, View, Image, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import styles from './productDetails.style';
import { COLORS } from '../constants';
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ProductDetails = ({navigation}) => {
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
        source={require('../assets/images/fn1.jpg')}
        style={styles.image}
        />

    <View style={styles.details}>
      <View style={styles.detailsTitle}>
        <Text style={styles.title}>Product</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>$1200.56</Text>
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
      <Text style={styles.descTitle}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</Text>
    </View>

    <View style={styles.locationWrapper}>
      <View style={styles.location}>
        <View style={{flexDirection: "row"}}>
          <IonIcons
           name='location-outline'
           size={24}
          />
          <Text>  Kitchener</Text>
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
