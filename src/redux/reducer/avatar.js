import { createSlice } from "@reduxjs/toolkit";

export const AvatarSlice = createSlice({
  name: "Avatar",
  initialState: {
    hairList: [
      "bangs",
      "bunHair",
      "mohawk",
      "shortHair",
      "bowlCutHair",
      "braids",
      "curlyBob",
      "curlyShortHair",
      "froBun",
      "halfShavedHead",
      "shavedHead",
      "straightHair",
      "wavyBob",
    ],
    hairIndex: 0,
    mouthList: [
      "openedSmile",
      "unimpressed",
      "gapSmile",
      "openSad",
      "teethSmile",
      "awkwardSmile",
      "braces",
      "kawaii",
    ],
    mouthIndex: 0,
  },

  reducers: {
    hairUpdateR: (state) => {
      state.hairIndex > 11 ? (state.hairIndex = 0) : state.hairIndex++;
    },
    hairUpdateL: (state) => {
      state.hairIndex < 1 ? (state.hairIndex = 12) : state.hairIndex--;
    },
    mouthUpdateR: (state) => {
      state.mouthIndex > 6 ? (state.mouthIndex = 0) : state.mouthIndex++;
    },
    mouthUpdateL: (state) => {
      state.mouthIndex < 1 ? (state.mouthIndex = 7) : state.mouthIndex--;
    },
  },
});

export const { hairUpdateR, hairUpdateL, mouthUpdateL, mouthUpdateR } =
  AvatarSlice.actions;

export const hairList = (state) => state.Avatar.hairList;
export const hairIndex = (state) => state.Avatar.hairIndex;
export const mouthList = (state) => state.Avatar.mouthList;
export const mouthIndex = (state) => state.Avatar.mouthIndex;

export default AvatarSlice.reducer;
