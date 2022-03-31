import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const NavbarCartIcon = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("Cart")}>
      <Icon name="ios-cart" color="white" size={25} />
    </TouchableOpacity>
  );
};

export default NavbarCartIcon;
