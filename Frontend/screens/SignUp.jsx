import { ScrollView, TouchableOpacity, Text, SafeAreaView, View, Image, TextInput, Alert} from 'react-native'
import React,{useState} from 'react';
import BackBtn from '../components/BackBtn';
import styles from './login.style';
import Button from '../components/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import IonIcons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../constants';
import axios from 'axios';

const validationSchema =  Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be atleast 6 characters')
    .required('Required'),
  email: Yup.string().email('Provide a valid email address').required('Required'),
  location: Yup.string().min(3, 'Provide a valid location').required('Required'),
  username: Yup.string().min(3, 'Provide a valid username').required('Required'),
});


const SignUp = ({navigation}) => {
    const [loader,setLoader] = useState(false);
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

    //registering user
    const registerUser = async(values) =>{
      setLoader(true);
      try{
        const endpoint = 'http://192.168.2.24:3000/api/register';
        const data = values;

        const response = await axios.post(endpoint,data);
        if(response.status === 201){
          navigation.replace("LoginScreen")
        }

      } catch(error){
        console.log(error);
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

          <Text style={styles.textTitle}>Sign Up</Text>
          <Formik 
           initialValues={{email: '', password: '', location: '', username: ''}}
           validationSchema = {validationSchema} 
           onSubmit = {(values) => registerUser(values)}>
            {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
              <View>
              <View style={styles.textInputWrapper}> 
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <MaterialCommunityIcons 
                      name='face-man-profile'
                      size={20}
                      color= {COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                     placeholder='Enter user name'
                     onFocus={()=>{setFieldTouched('username')}}
                     onBlur={() => {setFieldTouched('username','')}}
                     value= {values.username}
                     onChangeText={handleChange('username')}
                     autoCapitalize='none'
                     autoCorrect= {false}
                     style={{flex: 1}}
                    />
                  </View>
                  {touched.username && errors.username &&(
                    <Text style={styles.errorMessage}>{errors.username}</Text>
                  )}
                </View>

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

                <View style={styles.textInputWrapper}> 
                  <View style={styles.inputWrapper(touched.email ? COLORS.secondary : COLORS.offwhite)}>
                    <IonIcons 
                      name='location-outline'
                      size={20}
                      color= {COLORS.gray}
                      style={styles.iconStyle}
                    />

                    <TextInput
                     placeholder='Enter location'
                     onFocus={()=>{setFieldTouched('location')}}
                     onBlur={() => {setFieldTouched('location','')}}
                     value= {values.location}
                     onChangeText={handleChange('location')}
                     autoCapitalize='none'
                     autoCorrect= {false}
                     style={{flex: 1}}
                    />
                  </View>
                  {touched.location && errors.location &&(
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>
             
                
               <Button
                 title={"S I G N   U P"}
                 onPress={isValid ? handleSubmit : inValidForm}
                 loader={loader}
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

export default SignUp