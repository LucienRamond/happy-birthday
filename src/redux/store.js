import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import BirthdaysReducer from "./reducer/Birthdays";
import AvatarReducer from "./reducer/avatar";
import NewBirthdayReducer from "./reducer/NewBirthday";

export default configureStore({
  reducer: {
    Birthdays: BirthdaysReducer,
    Avatar: AvatarReducer,
    NewBirthday: NewBirthdayReducer,
  },
  middleware: [thunk],
});
