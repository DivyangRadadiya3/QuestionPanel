import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice";
import userReducer from "../Slice/userSlice";
import subjectReducer from "../Slice/subjectSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    subjects: subjectReducer,
  },
});

export default store;
