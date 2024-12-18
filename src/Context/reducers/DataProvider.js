const initialData = {
  classesData: [],
  Subject: [],
  CurrentSubject: [],
  Questions: [],
  CurrentQue: [],
  Logintype: "classes",
};

const DataProvider = (state = initialData, action) => {
  switch (action.type) {
    case "LOGIN_ADMIN":
      return {
        ...state,
        classesData: action.payload,
      };

    case "CLASSES":
      return {
        ...state,
        classesData: [action.payload],
      };

    case "SUBJECT":
      return {
        ...state,
        Subject: [action.payload],
      };

    case "QUESTIONS":
      return {
        ...state,
        Questions: [action.payload],
      };

    case "CURRENT":
      return {
        ...state,
        CurrentSubject: action.payload,
      };

    case "LOGIN_TYPE":
      return {
        ...state,
        Logintype: action.payload,
      };

    case "EDIT":
      return {
        ...state,
        CurrentQue: [action.payload],
      };

    case "LOGOUT":
      return {
        ...state,
        classesData: [],
        Subject: [],
        CurrentSubject: [],
        Questions: [],
        CurrentQue: [],
      };

    default:
      return state;
  }
};

export default DataProvider;
