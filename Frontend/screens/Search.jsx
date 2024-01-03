import { View, Text , TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './Search.style';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';


const Search = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  //console.log(searchKey);
  

  const handleSearch = async() =>{
    try{
      const response = await axios.get(`http://localhost:3000/api/products/search/${searchKey}`)
      setSearchResults(response.data);
      console.log("==============");
      console.log(response.data);
      console.log("==============");
      //response.data
    }
    catch(error){
      console.log(error);
      console.log("Failed to get product");
    }
  }
 
  return (
    <SafeAreaView>
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
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder='What are you looking for?'
              onSubmitEditing={handleSearch}
            />
        </View> 
      </View>
    </SafeAreaView>
  );
}

export default Search;