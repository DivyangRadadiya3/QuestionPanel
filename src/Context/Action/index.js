export const loginUser = (data) => {
    return {
        type: "LOGIN_USER",
        payload: data,
    };
}

export const loginAdmin = (data) => {
    return {
        type: "LOGIN_ADMIN",
        payload: data
    };
}

export const loginType = (data) => {
    return {
        type: "LOGIN_TYPE",
        payload: data
    };
}

export const logOutAdmin = (data) => {
    return {
        type: "LOGOUT",
        payload: data
    };
}

export const updateData = (data) => {
    return {
        type: "UPDATE",
        payload: data
    };
}

export const SubjectData = (data) => {
    return {
      type: "SUBJECT",
      payload: data,
    };
  };
  export const QuestionList = (data) => {
    return {
      type: "QUESTIONS",
      payload: data,
    };
  };
  export const CurrentData = (data) => {
    return {
      type: "CURRENT",
      payload: data,
    };
  };
  export const CurrentQuestion = (data) => {
    return {
      type: "EDIT",
      payload: data,
    };
  };