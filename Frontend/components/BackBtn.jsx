import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import IonIcons from '@expo/vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';

const BackBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style= {styles.backBtn}>
        <IonIcons
         name='chevron-back-circle'
         size={30}
         color={COLORS.primary}
        />
    </TouchableOpacity>
  )
}

export default BackBtn;

const styles = StyleSheet.create({
  backBtn:{
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    top: SIZES.large - 10,
  }
})