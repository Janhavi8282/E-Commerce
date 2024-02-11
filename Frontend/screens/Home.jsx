import { TouchableOpacity, View, Text } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome5';
import { ScrollView } from 'react-native';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { UpdateCartContext } from '../context/UpdateCartContext';



const Home = () => {
  const { updateCart } = useContext(UpdateCartContext);
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);


  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser != null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }

    }
    catch (error) {
      console.log('Error', error);

    }
  }
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <IonIcons
            name="location-outline"
            size={24}
          />

          <Text style={styles.location}>{userData ? userData.location : 'Canada'}</Text>

          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>0</Text>
            </View>

            <TouchableOpacity>
              <FontAwesomeIcon
                name="shopping-cart"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel />
        <Heading />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;