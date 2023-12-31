import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './heading.style';
import IonIcons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Heading = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Arrivals</Text>
        <TouchableOpacity onPress={() => navigation.navigate("NewArrivals")}>
            <IonIcons name='ios-grid' size={24} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Heading