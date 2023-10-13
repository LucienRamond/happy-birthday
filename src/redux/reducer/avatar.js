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
    hairColorIndex: 0,
    hairColorList: [
      "220f00",
      "3a1a00",
      "71472d",
      "e2ba87",
      "605de4",
      "238d80",
      "d56c0c",
      "e9b729",
    ],
    accessoriesIndex: 0,
    accessoriesList: [
      "",
      "catEars",
      "glasses",
      "sailormoonCrown",
      "clownNose",
      "sleepMask",
      "sunglasses",
      "faceMask",
      "mustache",
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
    hairColorUpdateR: (state) => {
      state.hairColorIndex > 6
        ? (state.hairColorIndex = 0)
        : state.hairColorIndex++;
    },
    hairColorUpdateL: (state) => {
      state.hairColorIndex < 1
        ? (state.hairColorIndex = 7)
        : state.hairColorIndex--;
    },
    accessoriesUpdateR: (state) => {
      state.accessoriesIndex > 7
        ? (state.accessoriesIndex = 0)
        : state.accessoriesIndex++;
    },
    accessoriesUpdateL: (state) => {
      state.accessoriesIndex < 1
        ? (state.accessoriesIndex = 8)
        : state.accessoriesIndex--;
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
  hairColorUpdateL,
  hairColorUpdateR,
  accessoriesUpdateL,
  accessoriesUpdateR,
} = AvatarSlice.actions;

export const hairList = (state) => state.Avatar.hairList;
export const hairIndex = (state) => state.Avatar.hairIndex;
export const mouthList = (state) => state.Avatar.mouthList;
export const mouthIndex = (state) => state.Avatar.mouthIndex;
export const eyesList = (state) => state.Avatar.eyesList;
export const eyesIndex = (state) => state.Avatar.eyesIndex;
export const hairColorList = (state) => state.Avatar.hairColorList;
export const hairColorIndex = (state) => state.Avatar.hairColorIndex;
export const accessoriesList = (state) => state.Avatar.accessoriesList;
export const accessoriesIndex = (state) => state.Avatar.accessoriesIndex;

export default AvatarSlice.reducer;
