import { useEffect, useState, useRef } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import PhoneInput from "react-native-phone-number-input";
import CountryPicker from "rn-country-dropdown-picker";
import CreditCard from "react-native-credit-card-form-ui";
import Icon from "react-native-vector-icons/Ionicons";
import PAYPAL from "../assets/img/paypal.png";
import { CountryCodeList } from "react-native-country-picker-modal";

const CheckoutScreen = (props) => {
  const creditCardRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const cart = useSelector((state) => state.product.cart);
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const [usePaypal, setUsePaypal] = useState(false);

  const name = useSelector((state) => state.auth.name);
  const email = useSelector((state) => state.auth.email);
  const phone = useSelector((state) => state.auth.phone);
  const [country, setCountry] = useState("");
  const address = useSelector((state) => state.auth.address);
  const city = useSelector((state) => state.auth.city);
  const postcode = useSelector((state) => state.auth.postcode);
  const note = useSelector((state) => state.auth.note);

  const phoneInput = useRef();
  const value = useSelector((state) => state.auth.inputNumber);

  const [validation, setValidation] = useState({
    name: false,
    email: false,
    phone: false,
    country: false,
    address: false,
    city: false,
    postcode: false,
    note: false,
  });

  const confirmPay = () => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      props.navigation.navigate("Pay", {
        name,
        email,
        phone,
        country: country.country,
        address,
        city,
        postcode,
        note,
        data,
        usePaypal,
        total: cart.reduce(function summarize(sum, product) {
          const updatedSum =
            sum + products[product.index].price * product.quantity;
          return updatedSum;
        }, 0),
      });
    }
  };

  useEffect(() => {
    check();
  }, [email]);

  useEffect(() => {
    check();
  }, [address]);

  useEffect(() => {
    check();
  }, [city]);

  useEffect(() => {
    check();
  }, [postcode]);

  useEffect(() => {
    check();
  }, [note]);

  useEffect(() => {
    check();
  }, [name]);

  function check() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let _validation = {};
    if (reg.test(email)) _validation = { ..._validation, email: true };
    else _validation = { ...validation, email: false };
    if (address.length > 0) _validation = { ..._validation, address: true };
    else _validation = { ..._validation, address: false };
    if (city.length > 0) _validation = { ..._validation, city: true };
    else _validation = { ..._validation, city: false };
    if (postcode.length > 0) _validation = { ..._validation, postcode: true };
    else _validation = { ..._validation, postcode: false };
    if (note.length > 0) _validation = { ..._validation, note: true };
    else _validation = { ..._validation, note: false };
    if (/^[0-9]+$/.test(value) && value.length > 0)
      _validation = { ..._validation, phone: true };
    else _validation = { ..._validation, phone: false };
    if (/^[A-Za-z\s]+$/.test(name))
      _validation = { ..._validation, name: true };
    else _validation = { ..._validation, name: false };
    setValidation({ ...validation, ..._validation });
  }

  useEffect(() => {
    check();
  }, []);

  function handleSelection(e) {
    setCountry(e);
    setValidation({ ...validation, country: true });
  }

  const payModal = () => {
    let valid = true;
    Object.keys(validation).forEach((key) => {
      if (!validation[key]) {
        valid = false;
        alert(key + " field is not correct!!!");
      }
    });
    if (valid) setModalVisible(true);
  };

  return (
    <ScrollView>
      <View style={styles.cartcontainer}>
        <Text style={{ fontSize: 30, textAlign: "left", color: "blue" }}>
          Shipping Information
        </Text>
        <View style={{ marginTop: 30 }}>
          <TextInput
            style={[
              styles.input,
              !validation.name ? styles.invalid : styles.valid,
            ]}
            placeholder="Name"
            editable
            maxLength={40}
            value={name}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { name: e } })
            }
          />
          <TextInput
            style={[
              styles.input,
              !validation.email ? styles.invalid : styles.valid,
            ]}
            placeholder="Email"
            editable
            maxLength={40}
            value={email}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { email: e } })
            }
          />
          <View style={{ marginBottom: 20 }}>
            <PhoneInput
              ref={phoneInput}
              value={value}
              defaultCode="DM"
              layout="first"
              onChangeText={(text) => {
                dispatch({
                  type: "SET_USER_INFO",
                  payload: { inputNumber: text },
                });
              }}
              onChangeFormattedText={(text) => {
                dispatch({
                  type: "SET_USER_INFO",
                  payload: { phone: text },
                });
                setValidation({ ...validation, phone: true });
              }}
              withDarkTheme
              withShadow
              autoFocus
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <CountryPicker selectedItem={handleSelection} />
          </View>
          <TextInput
            style={[
              styles.input,
              !validation.address ? styles.invalid : styles.valid,
            ]}
            placeholder="Address"
            editable
            maxLength={40}
            value={address}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { address: e } })
            }
          />
          <TextInput
            style={[
              styles.input,
              !validation.city ? styles.invalid : styles.valid,
            ]}
            placeholder="City"
            editable
            maxLength={40}
            value={city}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { city: e } })
            }
          />
          <TextInput
            style={[
              styles.input,
              !validation.postcode ? styles.invalid : styles.valid,
            ]}
            placeholder="PostCode"
            editable
            maxLength={40}
            value={postcode}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { postcode: e } })
            }
          />
          <TextInput
            style={[
              styles.input,
              !validation.note ? styles.invalid : styles.valid,
            ]}
            placeholder="Note"
            editable
            maxLength={40}
            value={note}
            onChangeText={(e) =>
              dispatch({ type: "SET_USER_INFO", payload: { note: e } })
            }
          />
        </View>
        <View>
          <Text style={{ fontSize: 30, textAlign: "left", color: "blue" }}>
            Your Order
          </Text>
          <View>
            {cart.map((product, index) => (
              <View key={index} style={{ marginTop: 20 }}>
                <View style={styles.description}>
                  <Text>
                    {product.quantity + " "}
                    {products[product.index].title}(s) Price:
                    {products[product.index].price} * {product.quantity}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {product.quantity * products[product.index].price}$
                  </Text>
                </View>
                <View style={{ height: 2, backgroundColor: "gray" }} />
              </View>
            ))}
          </View>
        </View>
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
        <View>
          <Text style={{ fontSize: 30, textAlign: "left", color: "blue" }}>
            Payment Method
          </Text>
          <View style={styles.paymentMethod}>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={() => setUsePaypal(false)}>
                <View style={[styles.method, { borderTopWidth: 1 }]}>
                  <View
                    style={[
                      styles.circleView,
                      { width: 12, height: 12 },
                      !usePaypal ? styles.circleActive : {},
                    ]}
                  />
                  <Text style={{ marginLeft: 30, fontSize: 14 }}>
                    Pay With Card
                  </Text>
                  <View style={{ position: "absolute", right: 20 }}>
                    <Icon name="ios-card" color="#EE4F7C" size={25} />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUsePaypal(true)}>
                <View style={styles.method}>
                  <View
                    style={[
                      styles.circleView,
                      { width: 12, height: 12 },
                      usePaypal ? styles.circleActive : {},
                    ]}
                  />
                  <Text style={{ marginLeft: 30, fontSize: 14 }}>Paypal</Text>
                  <Image
                    source={PAYPAL}
                    style={{
                      width: 20,
                      height: 20,
                      position: "absolute",
                      right: 20,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={payModal}>
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "center",
              }}
            >
              Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CreditCard ref={creditCardRef} />
              <View style={styles.actionbar}>
                <TouchableOpacity onPress={confirmPay}>
                  <Text style={styles.custombutton}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.custombutton}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = {
  actionbar: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  custombutton: {
    width: 100,
    backgroundColor: "black",
    color: "white",
    height: 50,
    lineHeight: 40,
    textAlign: "center",
  },
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
    paddingLeft: 30,
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
  input: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    paddingLeft: 20,
    color: "black",
  },
  circleView: {
    borderRadius: 9,
    width: 18,
    height: 18,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  circleActive: {
    backgroundColor: "#EE4F7C",
  },
  paymentMethod: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
  },
  method: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    borderColor: "#d9d9d9",
    borderTopWidth: 0,
    borderWidth: 1,
    position: "relative",
  },
  payButton: {
    margin: 20,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#EE4F7C",
  },
  invalid: {
    borderColor: "red",
    borderWidth: 1,
  },
  valid: {
    borderColor: "green",
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    shadowColor: "#00000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    height: "100%",
    paddingTop: 200,
    position: "relative",
    left: 0,
    top: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
};

export default CheckoutScreen;
