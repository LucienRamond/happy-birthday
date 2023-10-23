import { createSlice } from "@reduxjs/toolkit";

export const NewBirthdaySlice = createSlice({
  name: "NewBirthday",
  initialState: {
    new_birthday: {
      name: "",
      relationship: "",
      birth: "",
      sex: "",
      countDown: "",
      avatarUrl: "",
    },
  },

  reducers: {
    nameUpdate: (state, action) => {
      state.new_birthday.name = action.payload;
    },
    relationshipUpdate: (state, action) => {
      state.new_birthday.relationship = action.payload;
    },
    birthUpdate: (state, action) => {
      state.new_birthday.birth = action.payload;
    },
    sexUpdate: (state, action) => {
      state.new_birthday.sex = action.payload;
    },
    countDownUpdate: (state, action) => {
      state.new_birthday.countDown = action.payload;
    },
    avatarUrlUpdate: (state, action) => {
      state.new_birthday.avatarUrl = action.payload;
    },
  },
});

export const {
  nameUpdate,
  relationshipUpdate,
  birthUpdate,
  sexUpdate,
  countDownUpdate,
  avatarUrlUpdate,
  keyUpdate,
} = NewBirthdaySlice.actions;

export const new_birthday = (state) => state.NewBirthday.new_birthday;
export const birth = (state) => state.NewBirthday.new_birthday.birth;

export default NewBirthdaySlice.reducer;
