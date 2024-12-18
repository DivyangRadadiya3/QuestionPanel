const userInfo = JSON.parse(localStorage.getItem("classes"));
console.log("authentication",userInfo);

const authState = userInfo
  ? { isLoggedIn: true, userInfo }
  : { isLoggedIn: false, userInfo: null };

const Authentication = (state = authState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: [action.payload],
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    case "REGISTER_SUCCES":
      return {
        ...state,
        
      };

    case "REGISTER_FAIL":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    default:
      return state;
  }
};

export default Authentication;
