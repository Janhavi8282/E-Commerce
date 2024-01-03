import {React} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcons from "@expo/vector-icons/Ionicons";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/index';
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";


const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle:{
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60
    }
}

const BottomTabNavigator = () =>{
    return(
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                        tabBarIcon: ({focused}) =>{
                            return( 
                            <IonIcons name={focused? "home" : "home-outline"} 
                            size={24}
                            color={focused? COLORS.primary : COLORS.gray2}/>
            )}
                    
                }}/>
            
            <Tab.Screen 
                name="Search" 
                component={Search}
                options={{
                        tabBarIcon: ({focused}) =>{
                            return (
                            <IonIcons 
                            name={"search-sharp"} 
                            size={24}
                            color={focused? COLORS.primary : COLORS.gray2}
                            />
                )}
                    
                }}/>

            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                        tabBarIcon: ({focused}) =>{
                            return (
                            <IonIcons 
                            name={focused? "person" : "person-outline"} 
                            size={24}
                            color={focused? COLORS.primary : COLORS.gray2}/>
            )}

                }}/>
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;