import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

export default function PayScreen(props) {
  const params = props.route.params;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: "CLEAR_CART", payload: "" });
  }, []);

  return (
    <View style={{ padding: 50 }}>
      <Text>Name: {params.name}</Text>
      <Text>Email: {params.email}</Text>
      <Text>Phone: {params.phone}</Text>
      <Text>Country: {params.country}</Text>
      <Text>Address: {params.address}</Text>
      <Text>City: {params.city}</Text>
      <Text>Postcode: {params.postcode}</Text>
      <Text>Note: {params.note}</Text>
      <Text>Your Card Expiration: {params.data.expiration}</Text>
      <Text>Your Card Holder: {params.data.holder}</Text>
      <Text>Your Card Number: {params.data.number}</Text>
      <Text>
        You Paid {params.total} $ with{" "}
        {params.usePaypal ? "Paypal" : "Your Card"}
      </Text>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Text style={{ color: "blue", marginTop: 50 }}>
          Click here to Go Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
