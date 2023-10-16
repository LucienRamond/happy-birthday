import "./BirthdayForm.css";
import { useDispatch, useSelector } from "react-redux";
import { birthdayUpdate } from "../../redux/reducer/Birthdays";
import {
  new_birthday,
  nameUpdate,
  relationshipUpdate,
  birthUpdate,
  sexUpdate,
  countDownUpdate,
  keyUpdate,
  birth,
} from "../../redux/reducer/NewBirthday";
import moment from "moment";
import "moment/locale/fr";
import Avatar from "../Avatar/Avatar";

export default function BirthdayForm() {
  const dispatch = useDispatch();
  const birthdays = useSelector(birth);
  const data = useSelector(new_birthday);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(birthdayUpdate(data));
    dispatch(keyUpdate());
  };

  const countDown = () => {
    const birthday = birthdays.split("-");
    birthday[0] = "2023";
    const nextBirthday = birthday.join(" ");
    console.log(nextBirthday);
    if (nextBirthday > moment(Date.now()).format("YYYY MM DD")) {
      const durationMs = new Date(nextBirthday) - Date.now();
      return dispatch(
        countDownUpdate(parseInt(moment.duration(durationMs).asDays() + 1))
      );
    } else if (nextBirthday < moment(Date.now()).format("YYYY MM DD")) {
      birthday[0] = "2024";
      const nextYearBirthday = birthday.join(" ");
      const durationMs = new Date(nextYearBirthday) - Date.now();
      return dispatch(
        countDownUpdate(parseInt(moment.duration(durationMs).asDays() + 1))
      );
    } else if (nextBirthday === moment(Date.now()).format("YYYY MM DD")) {
      return dispatch(countDownUpdate(0));
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
              onChange={(e) => dispatch(nameUpdate(e.target.value))}
            />
          </div>
          <select
            required
            id="relationship"
            name="relationship"
            onChange={(e) => dispatch(relationshipUpdate(e.target.value))}
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
                dispatch(birthUpdate(e.target.value));
                countDown();
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
              onChange={(e) => dispatch(sexUpdate(e.target.value))}
            />
            <label htmlFor="male">Garçon</label>
            <input
              required
              type="radio"
              name="sex"
              id="female"
              value="F"
              onChange={(e) => dispatch(sexUpdate(e.target.value))}
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
