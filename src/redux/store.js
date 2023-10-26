import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import BirthdaysReducer from "./reducer/Birthdays";
import NewBirthdayReducer from "./reducer/NewBirthday";

export default configureStore({
  reducer: {
    Birthdays: BirthdaysReducer,
    NewBirthday: NewBirthdayReducer,
  },
  middleware: [thunk],
});
