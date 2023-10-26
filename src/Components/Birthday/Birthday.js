import "./Birthday.css";
import moment from "moment";
import "moment/locale/fr";

export default function Birthday(props) {
  const data = props.object;

  const setAge = () => {
    const actualDate = moment(Date.now()).format("MM DD");
    const birthdayDate = moment(data.date).format("MM DD");
    if (actualDate < birthdayDate) {
      return (
        parseInt(moment(Date.now()).format("YYYY")) -
        parseInt(moment(data.date).format("YYYY")) -
        1
      );
    } else {
      return (
        parseInt(moment(Date.now()).format("YYYY")) -
        parseInt(moment(data.date).format("YYYY"))
      );
    }
  };

  const countDown = () => {
    const birthday = data.date.split("-");
    birthday[0] = "2023";
    const nextBirthday = birthday.join(" ");
    if (nextBirthday > moment(Date.now()).format("YYYY MM DD")) {
      const durationMs = new Date(nextBirthday) - Date.now();
      return parseInt(moment.duration(durationMs).asDays() + 1);
    } else if (nextBirthday < moment(Date.now()).format("YYYY MM DD")) {
      birthday[0] = "2024";
      const nextYearBirthday = birthday.join(" ");
      const durationMs = new Date(nextYearBirthday) - Date.now();
      return parseInt(moment.duration(durationMs).asDays() + 1);
    } else if (nextBirthday === moment(Date.now()).format("YYYY MM DD")) {
      return 0;
    }
  };

  return (
    <div className={data.sex === "M" ? "b-container" : "b-container female"}>
      <div className="birthday-avatar">
        <img src={data.avatar} alt="" />
      </div>
      <div className="b-name">
        <h2>{data.name}</h2>
        <p>({data.relationship})</p>
      </div>
      <div className="b-date">{moment(data.date).format("DD MMMM YYYY")}</div>
      <div className="b-date">{setAge()} ans</div>
      {data.countDown !== 0 && (
        <div className="b-count-down">{countDown()} jours restants</div>
      )}
      {data.countDown === 0 && (
        <div className="b-count-down">🎉 Jour d'anniversaire ! 🎉</div>
      )}
    </div>
  );
}
