import { createSlice } from "@reduxjs/toolkit";

export const NewBirthdaySlice = createSlice({
  name: "NewBirthday",
  initialState: {
    new_birthday: {
      name: "",
      relationship: "",
      birth: "",
      sex: "",
      key: 0,
      countDown: 0,
      avatarUrl: "",
    },
  },

  reducers: {
    birthdayUpdate: (state, action) => {
      //   state.new_birthday = {...state.new_birthday, action.payload.key : action.payload.value} ;
    },
  },
});

export const { birthdayUpdate } = NewBirthdaySlice.actions;

export const new_birthday = (state) => state.NewBirthday.new_birthday;

export default NewBirthdaySlice.reducer;
