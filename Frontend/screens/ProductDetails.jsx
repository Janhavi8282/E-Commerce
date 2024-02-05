import { Text, View, Image, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import styles from './productDetails.style';
import { COLORS } from '../constants';
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddToCart from '../hook/addToCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import addToCart from '../hook/addToCart';
import WebView from 'react-native-webview';

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [count, setCount] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(false);

  //increment the count
  const increment = () => {
    setCount(count + 1);
  }

  //decrement the count
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    checkUser();
    checkFavorites();
  }, [])

  const checkUser = async () => {
    try {
      const id = AsyncStorage.getItem("id")
      if (id !== null) {
        setIsLoggedIn(true);
        console.log(isLoggedIn);

      }
      else {
        console.log("User not logged in");
      }
    }
    catch (error) {

    }
  }

  const createCheckOut = async () => {
    const id = await AsyncStorage.getItem('id');

    const response = await fetch('https://stripe-payment-production-dcea.up.railway.app/stripe/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: JSON.parse(id),
        cartItems: [
          {
            name: item.title,
            id: item._id,
            price: item.price,
            cartQuantity: count,
          }
        ]
      })
    });

    if (!response.ok) {
      console.error('Error', response.status, response.statusText);
    } else {

      const { url } = await response.json();
      setPaymentUrl(url)
    };
  }


  const onNavigationStateChange = (webViewState) => {
    const { url } = webViewState;

    if (url && url.includes("checkout-success")) {
      navigation.navigate("Orders")
    }
    else if (url && url.includes("cancel")) {
      navigation.goBack();
    }
  }

  const addToFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = item._id;
    let productObj = {
      title: item.title,
      id: item._id,
      supplier: item.supplier,
      price: item.price,
      imageUrl: item.imageUrl,
      product_location: item.product_location
    }

    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if (favoritesObj[productId]) {
        delete favoritesObj[productId];
        setFavorites(false)
      }
      else {
        favoritesObj[productId] = productObj;
        setFavorites(true);
      }
      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleFavourites = () => {
    if (isLoggedIn === false) {
      navigation.navigate('LoginScreen');
    }
    else {
      addToFavorites();
    }
  }

  const handleBuy = () => {
    if (isLoggedIn === false) {
      navigation.navigate('LoginScreen');
    }
    else {
      createCheckOut();
    }
  }

  const handleCart = () => {
    if (isLoggedIn === false) {
      navigation.navigate('LoginScreen');
    }
    else {
      addToCart(item._id, count)
    }
  }

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if (favoritesObj !== null) {
        const favorites = JSON.parse(favoritesObj);

        if (favorites[item._id]) {
          setFavorites(true);
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }



  return (
    <View style={styles.container}>
      {paymentUrl ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <WebView
            source={{ uri: paymentUrl }}
            onNavigationStateChange={onNavigationStateChange}
          />
        </SafeAreaView>
      ) : (

        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IonIcons
              name='chevron-back-circle'
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFavourites()}>
            <IonIcons
              name={favorites ? 'heart' : 'heart-outline'}
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>

        </View>
      )}


      <Image
        source={{ uri: item.imageUrl }}
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
          {[1, 2, 3, 4, 5].map((index) => (
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
          <TouchableOpacity onPress={() => increment()}>
            <EvilIcons
              name='plus'
              size={24}
            />
          </TouchableOpacity>

          <Text style={styles.ratingText}> {count} </Text>

          <TouchableOpacity onPress={() => decrement()}>
            <EvilIcons
              name='minus'
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
          <View style={{ flexDirection: "row" }}>
            <IonIcons
              name='location-outline'
              size={24}
            />
            <Text>  {item.product_location}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name='truck-delivery-outline'
              size={24}
            />
            <Text>  Free Delivery</Text>
          </View>
        </View>
      </View>

      <View style={styles.cartRow}>
        <TouchableOpacity onPress={() => handleBuy()}
          style={styles.cartBtn}>
          <Text style={styles.btnTitle}>BUY NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleCart()}
          style={styles.addCartBtn}>
          <MaterialCommunityIcons
            name='shopping'
            size={24}
            color={COLORS.lightWhite}
          />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default ProductDetails
