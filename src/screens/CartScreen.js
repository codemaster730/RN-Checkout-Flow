import { useState } from "react";
import { Image, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.product.cart);
  const products = useSelector((state) => state.product.products);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART",
    });
  };

  const checkout = () => {
    if (cart.length == 0) {
      alert("Nothing to checkout");
      return;
    }
    props.navigation.navigate("Checkout");
  };

  const removeFromCart = (index) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: index,
    });
  };

  return (
    <ScrollView>
      <View style={styles.cartcontainer}>
        <Text style={{ fontSize: 30, textAlign: "center", color: "blue" }}>
          Your Cart
        </Text>
        <View>
          {cart.map((product, index) => (
            <View style={styles.productcontainer} key={index}>
              <Image
                style={styles.img}
                source={products[product.index].image}
              />
              <View style={styles.description}>
                <Text>Price: {products[product.index].price}$</Text>
                <Text>Quantity: {product.quantity}</Text>
                <Text>
                  Total: {products[product.index].price * product.quantity}$
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "90%",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity onPress={() => removeFromCart(index)}>
                    <Icon name="ios-trash" color="black" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 2, backgroundColor: "black", marginTop: 20 }} />
        <View>
          <Text style={{ textAlign: "right", marginTop: 10 }}>
            Total Price:{" "}
            {cart.reduce(function summarize(sum, product) {
              const updatedSum =
                sum + products[product.index].price * product.quantity;
              return updatedSum;
            }, 0)}
            $
          </Text>
        </View>
        <View style={styles.productcontainer}>
          <TouchableOpacity onPress={checkout}>
            <View style={styles.blackButton}>
              <Text style={{ color: "white" }}>Checkout </Text>
              <Icon name="ios-card" color="white" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearCart}>
            <View style={styles.whiteButton}>
              <Text>Empty Cart </Text>
              <Icon name="ios-trash" color="black" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  productcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  cartcontainer: {
    padding: 20,
  },
  description: {
    width: "40%",
  },
  img: {
    width: "40%",
  },
  blackButton: {
    backgroundColor: "black",
    borderRadius: 5,
    minWidth: "45%",
    height: 50,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  whiteButton: {
    backgroundColor: "white",
    border: "black",
    borderWidth: 1,
    borderRadius: 5,
    minWidth: "45%",
    height: 50,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
};

export default CartScreen;
