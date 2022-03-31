import { Image, Dimensions, TouchableOpacity, View, Text } from "react-native";
import { Actions } from "react-native-router-flux";

import CarPic from "../assets/img/car1.jpg";
import { useDispatch } from "react-redux";

const CategoryBlock = (props) => {
  const dispatch = useDispatch();

  const _onPress = () => {
    dispatch({ type: "SELECT_PRODUCT", payload: props.index });
    props.navigateToAddToCardScreen();
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={_onPress} activeOpacity={0.9}>
        <View>
          <Image style={styles.image} source={props.image} />
          <View style={styles.overlay} />
          <View style={styles.border} />
          <View style={styles.text}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.subtitle}>Shop Now</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryBlock;

const styles = {
  productImage: {},
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    marginTop: 100,
  },
  text: {
    width: Dimensions.get("window").width,
    height: 200,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: "#fdfdfd",
    fontSize: 32,
  },
  subtitle: {
    textAlign: "center",
    color: "#fdfdfd",
    fontSize: 16,
    fontWeight: "100",
    fontStyle: "italic",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(30, 42, 54, 0.4)",
  },
  border: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: "rgba(253, 253, 253, 0.2)",
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
};
