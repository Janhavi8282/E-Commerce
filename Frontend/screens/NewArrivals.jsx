import { View, Text , TouchableOpacity} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './NewArrivals.style';
import { useNavigation } from '@react-navigation/native';
import IonIcons from "@expo/vector-icons/Ionicons";
import { COLORS } from '../constants';
import ProductList from '../components/products/ProductList';

const NewArrivals = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style= {styles.container}>
      <View style = {styles.wrapper}>
        <View style = {styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <IonIcons
                    name="chevron-back-circle"
                    size={30}
                    color = {COLORS.lightWhite}
                />
            </TouchableOpacity>

            <Text style= {styles.heading}>Products</Text>
        </View>
        <ProductList/>
      </View>
    </SafeAreaView>
  )
}

export default NewArrivals