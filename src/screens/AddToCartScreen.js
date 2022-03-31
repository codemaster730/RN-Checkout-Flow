import { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const AddToCartScreen = (props) => {
  const product = useSelector(
    (state) => state.product.products[state.product.selected]
  );

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleQuantityPress = (num) => {
    if (quantity == 1 && num == -1) return;
    setQuantity(quantity + num);
  };

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: quantity,
    });
    props.navigation.goBack();
  };

  return (
    <View style={styles.addtocardcontainer}>
      <Image style={styles.product} source={product.image}></Image>
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        {product.description} {product.price}$
      </Text>
      <View style={{ padding: 20 }}>
        <View style={styles.quantityContainer}>
          <Text>Quantity:</Text>
          <View style={styles.numberContainer}>
            <TouchableOpacity
              onPress={() => handleQuantityPress(-1)}
              activeOpacity={0.9}
            >
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity
              onPress={() => handleQuantityPress(1)}
              activeOpacity={0.9}
            >
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{ marginTop: 20, textAlign: "center" }}>
          Total price: {product.price * quantity}
        </Text>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={addToCart}>
            <Text style={styles.fullwidth}>Add To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  fullwidth: {
    width: "100%",
    backgroundColor: "black",
    textAlign: "center",
    color: "white",
    height: 50,
    lineHeight: 40,
  },

  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 50,
    backgroundColor: "gray",
    textAlign: "center",
    color: "white",
    height: 50,
    lineHeight: 40,
    padding: 0,
  },
  numberContainer: {
    marginLeft: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 250,
  },
  addtocardcontainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  product: {
    width: "100%",
  },
};

export default AddToCartScreen;
