const initialState = {
  name: "",
  email: "",
  phone: "",
  country: {
    code: "",
    country: "",
  },
  address: "",
  city: "",
  postcode: "",
  note: "",
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER_INFO":
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
