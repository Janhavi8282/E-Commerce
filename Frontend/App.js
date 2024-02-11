import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState } from "react";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Cart from "./screens/Cart";
import {
  ProductDetails,
  NewArrivals,
  LoginScreen,
  Orders,
  Favourites,
  SignUp,
} from "./screens";
//import { UpdateCartContext } from "./context/UpdateCartContext";


const Stack = createNativeStackNavigator();
//const STRIPE_PUBLISHABLE_KEY = 'pk_test_51Oe0aRAEWKGknB4qU391rQbgEyUNFFd3Y5X28cn3C3DMysv6wMVv69Snksl368yADnRhwgQUXhLmkImzkaRZtJqJ00oNRHGnlC';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [updateCart,setUpdateCart] = useState({cartCount: 0});

  const updateCartCount =(count)=>{
    setUpdateCart({cartCount: count});
    //console.log("Cart", cartCount);
  };

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NewArrivals"
          component={NewArrivals}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

    </NavigationContainer>
    
    
  );
}
