import { createSlice } from "@reduxjs/toolkit";

export const BirthdaysSlice = createSlice({
  name: "Birthdays",
  initialState: {
    my_birthdays: [
      {
        name: "Damian",
        relationship: "Moi",
        birth: "2016-12-08",
        sex: "M",
        countDown: 64,
        avatarUrl: "https://api.dicebear.com/7.x/big-smile/svg?hair=mohawk",
      },
    ],
  },

  reducers: {
    addNewBirthday: (state, action) => {
      state.my_birthdays.push(action.payload);
    },
    birthdayDelete: (state, action) => {
      state.my_birthdays.splice(action.payload, 1);
    },
    birthdayModify: (state, action) => {
      state.my_birthdays.splice(action.payload.index, 1, action.payload.line);
    },
  },
});

export const { addNewBirthday, birthdayDelete, birthdayModify } =
  BirthdaysSlice.actions;

export const my_birthdays = (state) => state.Birthdays.my_birthdays;

export default BirthdaysSlice.reducer;
