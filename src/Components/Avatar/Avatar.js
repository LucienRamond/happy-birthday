import "./Avatar.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { avatarUrlUpdate } from "../../redux/reducer/NewBirthday";

const skinColorList = [
  "ffe4c0",
  "f5d7b1",
  "efcc9f",
  "e2ba87",
  "c99c62",
  "a47539",
  "8c5a2b",
  "643d19",
];
const eyesList = [
  "cheery",
  "normal",
  "confused",
  "starstruck",
  "winking",
  "sleepy",
  "sad",
  "angry",
];
const hairList = [
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
];
const hairColorList = [
  "220f00",
  "3a1a00",
  "71472d",
  "e2ba87",
  "605de4",
  "238d80",
  "d56c0c",
  "e9b729",
];
const accessoriesList = [
  "",
  "catEars",
  "glasses",
  "sailormoonCrown",
  "clownNose",
  "sleepMask",
  "sunglasses",
  "faceMask",
  "mustache",
];
const mouthList = [
  "openedSmile",
  "unimpressed",
  "gapSmile",
  "openSad",
  "teethSmile",
  "awkwardSmile",
  "braces",
  "kawaii",
];

export default function Avatar() {
  const dispatch = useDispatch();
  const [hairsIndex, setHairsIndex] = useState(0);
  const [mouthesIndex, setMouthesIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [hairsColorIndex, setHairsColorIndex] = useState(3);
  const [accessorieIndex, setAccessorieIndex] = useState(0);
  const [skinsColorIndex, setSkinsColorIndex] = useState(0);
  const [avatarUrl, setAvatarUrl] =
    useState(`https://api.dicebear.com/7.x/big-smile/svg?hair=${
      hairList[hairsIndex]
    }&mouth=${mouthList[mouthesIndex]}&eyes=${eyesList[eyeIndex]}&hairColor=${
      hairColorList[hairsColorIndex]
    }&accessories=${accessoriesList[accessorieIndex]}&accessoriesProbability=${
      accessoriesList[accessorieIndex] ? "100" : "0"
    }&skinColor=${skinColorList[skinsColorIndex]}
  `);

  const updateAvatar = (url) => {
    dispatch(avatarUrlUpdate(url));
  };

  useEffect(() => {
    setAvatarUrl(`https://api.dicebear.com/7.x/big-smile/svg?hair=${
      hairList[hairsIndex]
    }&mouth=${mouthList[mouthesIndex]}&eyes=${eyesList[eyeIndex]}&hairColor=${
      hairColorList[hairsColorIndex]
    }&accessories=${accessoriesList[accessorieIndex]}&accessoriesProbability=${
      accessoriesList[accessorieIndex] ? "100" : "0"
    }&skinColor=${skinColorList[skinsColorIndex]}
  `);
    updateAvatar(avatarUrl);
  }, [
    hairsIndex,
    mouthesIndex,
    eyeIndex,
    hairsColorIndex,
    accessorieIndex,
    skinsColorIndex,
    updateAvatar,
  ]);

  return (
    <div className="avatar-container">
      <div className="arrows">
        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              hairsColorIndex > 0 && setHairsColorIndex(hairsColorIndex - 1)
            }
          >
            ˂
          </div>
          <div
            className="arrow"
            onClick={() => hairsIndex > 0 && setHairsIndex(hairsIndex - 1)}
          >
            ˂
          </div>
        </div>

        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              accessorieIndex > 0 && setAccessorieIndex(accessorieIndex - 1)
            }
          >
            ˂
          </div>
          <div
            className="arrow"
            onClick={() => eyeIndex > 0 && setEyeIndex(eyeIndex - 1)}
          >
            ˂
          </div>
        </div>

        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              skinsColorIndex > 0 && setSkinsColorIndex(skinsColorIndex - 1)
            }
          >
            ˂
          </div>
          <div
            className="arrow"
            onClick={() =>
              mouthesIndex > 0 && setMouthesIndex(mouthesIndex - 1)
            }
          >
            ˂
          </div>
        </div>
      </div>

      <div className="b-avatar">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="arrows">
        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              hairsIndex < hairList.length - 1 && setHairsIndex(hairsIndex + 1)
            }
          >
            ˃
          </div>
          <div
            className="arrow"
            onClick={() =>
              hairsColorIndex < hairColorList.length - 1 &&
              setHairsColorIndex(hairsColorIndex + 1)
            }
          >
            ˃
          </div>
        </div>

        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              eyeIndex < eyesList.length - 1 && setEyeIndex(eyeIndex + 1)
            }
          >
            ˃
          </div>
          <div
            className="arrow"
            onClick={() =>
              accessorieIndex < accessoriesList.length - 1 &&
              setAccessorieIndex(accessorieIndex + 1)
            }
          >
            ˃
          </div>
        </div>

        <div className="double-arrows">
          <div
            className="arrow"
            onClick={() =>
              mouthesIndex < mouthList.length - 1 &&
              setMouthesIndex(mouthesIndex + 1)
            }
          >
            ˃
          </div>
          <div
            className="arrow"
            onClick={() =>
              skinsColorIndex < skinColorList.length - 1 &&
              setSkinsColorIndex(skinsColorIndex + 1)
            }
          >
            ˃
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
