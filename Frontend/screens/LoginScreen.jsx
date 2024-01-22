import { ScrollView, TouchableOpacity, Text, SafeAreaView, View, Image, TextInput, Alert} from 'react-native'
import React,{useState} from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema =  Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be atleast 6 characters')
    .required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
});

const LoginScreen = ({navigation}) => {
  const [loader,setLoader] = useState(false);
  const [responseData , setResponseData] = useState(null);
  //for hiding password
  const [obsecureText,setObsecureText] = useState(false);

  const inValidForm = () =>{
    Alert.alert(
      "Invalid details",
      "Please provide valid email id and password",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel")
        },
        {
          text: "Continue", onPress: () => console.log("Continue")
        },
        {defaultIndex: 1}
      ]
    )
  }

  //for login using axios
  const login = async (values) =>{
    setLoader(true);
    try{
      const endpoint = "http://192.168.2.24:3000/api/login";
      const data = values;

      const response = await axios.post(endpoint, data)
      if(response.status === 200){
        setLoader(false);
        setResponseData(response.data);
        //console.log(`user${responseData._id}`)
       await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData));
       await AsyncStorage.setItem('id', JSON.stringify(responseData._id));
       await AsyncStorage.setItem('token', JSON.stringify(responseData.token));
       navigation.replace('Bottom Navigation');


      }else{
          Alert.alert(
            "Error logging in",
            "Please provide valid credentials",
            [
              {
                text: "Cancel", onPress: () => console.log("Cancel")
              },
              {
                text: "Continue", onPress: () => console.log("Continue")
              },
              {defaultIndex: 1}
            ]
          )
        }
    }
    catch(error){
      Alert.alert(
        "Error",
        "Oops, Error logging in.Please try again with valid credentials",
        [
          {
            text: "Cancel", onPress: () => console.log("Cancel")
          },
          {
            text: "Continue", onPress: () => console.log("Continue")
          },
          {defaultIndex: 1}
        ]
      );

    }
    finally{
      setLoader(false);
    }
  }

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
            <BackBtn onPress ={()=> navigation.goBack()}/>
            <Image
             source={require('../assets/images/bk.png')}
             style={styles.loginImage}
            />

            <Text style={styles.textTitle}>Sign In</Text>
            <Formik 
             initialValues={{email: '', password: ''}}
             validationSchema = {validationSchema} 
             onSubmit = {(values) => login(values)}>
              {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                <View>
                  <View style={styles.textInputWrapper}> 
                    
                    <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                      <MaterialCommunityIcons 
                        name='email-outline'
                        size={20}
                        color= {COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                       placeholder='Enter email'
                       onFocus={()=>{setFieldTouched('email')}}
                       onBlur={() => {setFieldTouched('email','')}}
                       value= {values.email}
                       onChangeText={handleChange('email')}
                       autoCapitalize='none'
                       autoCorrect= {false}
                       style={{flex: 1}}
                      />
                    </View>
                    {touched.email && errors.email &&(
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>

                  <View style={styles.textInputWrapper}> 
                    <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                      <MaterialCommunityIcons 
                        name='lock-outline'
                        size={20}
                        color= {COLORS.gray}
                        style={styles.iconStyle}
                      />

                      <TextInput
                      secureTextEntry={obsecureText}
                       placeholder='Enter password'
                       onFocus={()=>{setFieldTouched('password')}}
                       onBlur={() => {setFieldTouched('password','')}}
                       value= {values.password}
                       onChangeText={handleChange('password')}
                       autoCapitalize='none'
                       autoCorrect= {false}
                       style={{flex: 1}}
                      />
                      <TouchableOpacity onPress={()=>{setObsecureText(!obsecureText)}}>
                        <MaterialCommunityIcons
                         name={obsecureText? "eye-outline": "eye-off-outline"}
                         size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password &&(
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>
               
                  
                 <Button
                 loader={loader}
                   title={"L O G I N"}
                   onPress={isValid ? handleSubmit : inValidForm}
                   isValid={isValid}
                  />

                  <Text style={styles.registration} onPress={() => {navigation.navigate('SignUp')}}>Register</Text>
                </View>
     )}
              
            
            </Formik>

            

           
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginScreen;