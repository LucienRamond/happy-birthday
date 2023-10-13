import "./BirthdayForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { birthdayUpdate } from "../../redux/reducer/Birthdays";
import moment from "moment";
import "moment/locale/fr";
import Avatar from "../Avatar/Avatar";

export default function BirthdayForm() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    relationship: "",
    birth: "",
    sex: "",
    key: 1,
    countDown: 0,
  });

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(birthdayUpdate(data));
    setData({ ...data, key: data.key + 1 });
  };

  const countDown = () => {
    const birthday = data.birth.split("-");
    birthday[0] = "2023";
    const nextBirthday = birthday.join(" ");
    if (nextBirthday > moment(Date.now()).format("YYYY MM DD")) {
      const durationMs = new Date(nextBirthday) - Date.now();
      return parseInt(moment.duration(durationMs).asDays());
    } else if (nextBirthday < moment(Date.now()).format("YYYY MM DD")) {
      birthday[0] = "2024";
      const nextYearBirthday = birthday.join(" ");
      const durationMs = new Date(nextYearBirthday) - Date.now();
      return parseInt(moment.duration(durationMs).asDays());
    } else if (nextBirthday == moment(Date.now()).format("YYYY MM DD")) {
      return 0;
    }
  };

  return (
    <>
      <form onSubmit={handleForm} className="b-form">
        <fieldset className="form-fieldset">
          <legend>Ajouter un anniversaire</legend>
          <div className="name">
            <label htmlFor="name">Prénom</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <select
            required
            id="relationship"
            name="relationship"
            onChange={(e) => setData({ ...data, relationship: e.target.value })}
          >
            <option value="">Relation</option>
            <option value="moi">Moi</option>
            <option value="papa">Papa</option>
            <option value="maman">Maman</option>
            <option value="frère">Frère</option>
            <option value="soeur">Soeur</option>
            <option value="papy">Papy</option>
            <option value="mamie">Mamie</option>
            <option value="tonton">Tonton</option>
            <option value="tatie">Tatie</option>
            <option value="cousin">Cousin</option>
            <option value="cousine">Cousine</option>
            <option value="copain">Copain</option>
            <option value="copine">Copine</option>
          </select>
          <div className="birthday">
            <label htmlFor="birthday">Date de naissance :</label>
            <input
              required
              type="date"
              id="birthday"
              onChange={(e) => {
                setData({
                  ...data,
                  birth: e.target.value,
                  countDown: countDown(),
                });
              }}
            />
          </div>
          <div className="sex">
            <input
              required
              type="radio"
              name="sex"
              id="male"
              value="M"
              onChange={(e) => setData({ ...data, sex: e.target.value })}
            />
            <label htmlFor="male">Garçon</label>
            <input
              required
              type="radio"
              name="sex"
              id="female"
              value="F"
              onChange={(e) => setData({ ...data, sex: e.target.value })}
            />
            <label htmlFor="female">Fille</label>
          </div>
          <button type="submit">Ajouter</button>
        </fieldset>
        <Avatar />
      </form>
    </>
  );
}
