import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import store from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import AddToCartScreen from "./src/screens/AddToCartScreen";
import NavbarCartIcon from "./src/component/NavbarCartIcon";
import CartScreen from "./src/screens/CartScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import PayScreen from "./src/screens/PayScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#2c3e50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => <NavbarCartIcon navigation={navigation} />,
          })}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddToCart" component={AddToCartScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Pay" component={PayScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
