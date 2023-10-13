import "./Avatar.css";
import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  hairList,
  hairUpdateR,
  hairUpdateL,
  mouthUpdateL,
  mouthUpdateR,
  hairIndex,
  mouthList,
  mouthIndex,
  eyesList,
  eyesIndex,
  eyesUpdateL,
  eyesUpdateR,
  hairColorIndex,
  hairColorList,
  hairColorUpdateL,
  hairColorUpdateR,
} from "../../redux/reducer/avatar";
import { useDispatch } from "react-redux";

export default function Avatar() {
  const hair = useSelector(hairList);
  const hairsIndex = useSelector(hairIndex);
  const mouth = useSelector(mouthList);
  const mouthesIndex = useSelector(mouthIndex);
  const eyes = useSelector(eyesList);
  const eyeIndex = useSelector(eyesIndex);
  const hairColor = useSelector(hairColorList);
  const hairsColorIndex = useSelector(hairColorIndex);
  const dispatch = useDispatch();
  const avatarUrl = `https://api.dicebear.com/7.x/big-smile/svg?hair=${hair[hairsIndex]}&mouth=${mouth[mouthesIndex]}&eyes=${eyes[eyeIndex]}&hairColor=${hairColor[hairsColorIndex]}`;

  const changeHairR = () => {
    dispatch(hairUpdateR());
  };
  const changeHairL = () => {
    dispatch(hairUpdateL());
  };
  const changeMouthR = () => {
    dispatch(mouthUpdateR());
  };
  const changeMouthL = () => {
    dispatch(mouthUpdateL());
  };
  const changeEyesR = () => {
    dispatch(eyesUpdateR());
  };
  const changeEyesL = () => {
    dispatch(eyesUpdateL());
  };
  const changeHairColorR = () => {
    dispatch(hairColorUpdateR());
  };
  const changeHairColorL = () => {
    dispatch(hairColorUpdateL);
  };

  return (
    <div className="avatar-container">
      <div className="arrows">
        <div className="double-arrows">
          <div className="arrow" onClick={changeHairColorL}>
            ˂
          </div>
          <div className="arrow" onClick={changeHairL}>
            ˂
          </div>
        </div>

        <div className="arrow" onClick={changeEyesL}>
          ˂
        </div>
        <div className="arrow" onClick={changeMouthL}>
          ˂
        </div>
      </div>

      <div className="b-avatar">
        <img src={avatarUrl} alt="" />
      </div>
      <div className="arrows">
        <div className="double-arrows">
          <div className="arrow" onClick={changeHairR}>
            ˃
          </div>
          <div className="arrow" onClick={changeHairColorR}>
            ˃
          </div>
        </div>

        <div className="arrow" onClick={changeEyesR}>
          ˃
        </div>
        <div className="arrow" onClick={changeMouthR}>
          ˃
        </div>
      </div>
    </div>
  );
}
