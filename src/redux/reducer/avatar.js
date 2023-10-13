import { createSlice } from "@reduxjs/toolkit";

export const AvatarSlice = createSlice({
  name: "Avatar",
  initialState: {
    eyesIndex: 0,
    eyesList: [
      "cheery",
      "normal",
      "confused",
      "starstruck",
      "winking",
      "sleepy",
      "sad",
      "angry",
    ],
    hairIndex: 0,
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

    mouthIndex: 0,
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
    eyesUpdateR: (state) => {
      state.eyesIndex > 6 ? (state.eyesIndex = 0) : state.eyesIndex++;
    },
    eyesUpdateL: (state) => {
      state.eyesIndex < 1 ? (state.eyesIndex = 7) : state.eyesIndex--;
    },
  },
});

export const {
  hairUpdateR,
  hairUpdateL,
  mouthUpdateL,
  mouthUpdateR,
  eyesUpdateL,
  eyesUpdateR,
} = AvatarSlice.actions;

export const hairList = (state) => state.Avatar.hairList;
export const hairIndex = (state) => state.Avatar.hairIndex;
export const mouthList = (state) => state.Avatar.mouthList;
export const mouthIndex = (state) => state.Avatar.mouthIndex;
export const eyesList = (state) => state.Avatar.eyesList;
export const eyesIndex = (state) => state.Avatar.eyesIndex;

export default AvatarSlice.reducer;
