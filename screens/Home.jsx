import { TouchableOpacity,View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import IonIcons from "@expo/vector-icons/Ionicons";
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome5';
import { ScrollView } from 'react-native';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Heading from '../components/home/Heading';
import ProductRow from '../components/products/ProductRow';

const Home = () => {
  return (
    <SafeAreaView>
      <View style = {styles.appBarWrapper}>
          <View style = {styles.appBar}>
              <IonIcons
                name = "location-outline" 
                size = {24}
              />

              <Text style ={styles.location}>Kitchener, Ontario</Text>

              <View style={{alignItems: "flex-end"}}>
                <View style={styles.cartCount}>
                  <Text style={styles.cartNumber}>8</Text>
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
        <Welcome/>
        <Carousel/>
        <Heading/>
        <ProductRow/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;