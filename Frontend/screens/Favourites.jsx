import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './favourites.style';
import IonIcons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { COLORS } from '../constants';

const Favourites = ({navigation}) => {
  const[favoritesData, setFavoritesData] = useState([]);

  useEffect(()=>{
    checkFavorites();
  },[])


  const checkFavorites = async() =>{
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;
    try{
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if(favoritesObj !== null){ 
        const favorites = JSON.parse(favoritesObj);
        const favList = Object.values(favorites) 

        setFavoritesData(favList);

      }
    }
    catch(error){
      console.log(error);
    }
  }

  const deleteFavorites = async(product) =>{
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites${JSON.parse(id)}`;

    let productId = product;
    

    try{
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem) : {};

      if(favoritesObj[productId]){
        delete favoritesObj[productId];
        checkFavorites();
        
      }
      await AsyncStorage.setItem(favoritesId, JSON.stringify(favoritesObj));
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <SafeAreaView style ={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcons
          name='chevron-back-circle'
          size={30}
          color={COLORS.primary}
          />

        </TouchableOpacity>
        <Text style={styles.titleText}>Favorites</Text>
      </View>
      <FlatList
       data={favoritesData}
       renderItem={({item})=>(
        <View style={styles.favContainer}>
            <View style={styles.imageContainer}>
                <Image
                 source={{uri: item.imageUrl}}
                 style={styles.image}
                />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.favTitle}>{item.title}</Text>
              <Text style={styles.favSupplier}>{item.supplier}</Text>
              <Text style={styles.favSupplier}>{item.price}</Text>
            </View>
              <MaterialIcons
              onPress={() =>deleteFavorites(item.id)}
              name= 'delete-outline'
              size={26}
              color ={COLORS.red}
              />
            
        </View>
       )}
       keyExtractor={(item,index) => index.toString()}
      />
    </SafeAreaView>
  )
}

export default Favourites