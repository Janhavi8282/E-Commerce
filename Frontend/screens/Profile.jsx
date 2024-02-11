import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '../constants';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
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
      } else {
        navigation.navigate('LoginScreen')
      }

    }
    catch (error) {
      console.log('Error', error);

    }
  }

  //logout function
  const userLogout = async () => {
    const id = await AsyncStorage.getItem('id');
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, 'id']);
      navigation.replace('Bottom Navigation');
    } catch (error) {
      console.log("Error in logout", error)
    }
  }

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel pressed")
        },
        {
          text: "Continue", onPress: () => userLogout()
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device?",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel clear cache")
        },
        {
          text: "Continue", onPress: () => console.log("Continue to clear")
        },
        { defaultIndex: 1 }
      ]
    )
  }

  const deleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel delete account")
        },
        {
          text: "Continue", onPress: () => console.log("Continue to delete")
        },
        { defaultIndex: 1 }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: '100%' }}>
          <Image
            source={require('../assets/images/profile_back.jpg')}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/profile.jpg')}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true ? userData.username : "Please login into your account"}
          </Text>
          {
            userLogin === false ? (
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}>L O G I N    </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>{userData.email} </Text>
              </View>
            )
          }


          {userLogin === false ? (
            <View>

            </View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                <View style={styles.menuItem(0.2)}>
                  <FontAwesomeIcon
                    name="heart-o"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Favourites</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={styles.menuItem(0.2)}>
                  <FontAwesomeIcon
                    name="shopping-cart"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteAccount()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="delete-outline"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => logout()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign
                    name="logout"
                    size={24}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>


          )
          }
        </View>
      </View>
    </View>
  )
}

export default Profile;