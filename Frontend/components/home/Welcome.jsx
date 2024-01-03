import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react';
import styles from './welcome.style';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
      </View>

      
      <View style={styles.searchContainer}>
        <TouchableOpacity>
            <FontAwesomeIcon
              name="search"
              size={24}
              style= {styles.searchIcon}
            />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value=""
              onPressIn={()=>navigation.navigate("Search")}
              placeholder='What are you looking for?'
            />
        </View> 
      </View>

    </View>

    
    
  )
}

export default Welcome