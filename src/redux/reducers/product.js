import Car1 from "../../assets/img/car1.jpg";
import Car2 from "../../assets/img/car2.jpg";
import Car3 from "../../assets/img/car3.jpg";
import Car4 from "../../assets/img/car4.jpg";

const initialState = {
  products: [
    {
      id: 1,
      title: "Car1",
      image: Car1,
      description: "Impressive Car - Car1",
      price: 1200,
    },
    {
      id: 2,
      title: "Car2",
      image: Car2,
      description: "Brilliant Car - Car2",
      price: 2000,
    },
    {
      id: 3,
      title: "Car3",
      image: Car3,
      description: "Amazing Car - Car3",
      price: 3000,
    },
    {
      id: 4,
      title: "Car4",
      image: Car4,
      description: "Wonderful Car - Car3",
      price: 1000,
    },
  ],
  selected: 0,
  cart: [],
};

export default function product(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SELECT_PRODUCT":
      return {
        ...state,
        selected: payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { index: state.selected, quantity: payload }],
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    case "REMOVE_FROM_CART":
      let cart = [...state.cart];
      cart.splice(payload, 1);
      return {
        ...state,
        cart,
      };
    default:
      return state || initialState;
  }
}
