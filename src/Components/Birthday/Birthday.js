import "./Birthday.css";
import moment from "moment";
import "moment/locale/fr";
import { useState } from "react";

export default function Birthday(props) {
  const data = props.object;
  const [accordion, setAccordion] = useState(false);

  const toggleAccordion = () => {
    setAccordion(!accordion);
  };

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

  const accordionClass = () => {
    if (accordion && data.sex === "M") {
      return "accordion-details accordion-details-translate";
    } else if (accordion && data.sex === "F") {
      return "accordion-details accordion-details-translate female-accordion";
    } else if (!accordion && data.sex === "F") {
      return "accordion-details female-accordion";
    } else if (!accordion && data.sex === "M") {
      return "accordion-details";
    }
  };

  const containerMargin = () => {
    if (accordion && data.sex === "M") {
      return "b-container b-container-margin";
    } else if (accordion && data.sex === "F") {
      return "b-container female b-container-margin";
    } else if (!accordion && data.sex === "F") {
      return "b-container female";
    } else if (!accordion && data.sex === "M") {
      return "b-container";
    }
  };

  return (
    <>
      <div className={containerMargin()} onClick={toggleAccordion}>
        <div className="birthday-avatar">
          <img src={data.avatar} alt="" />
        </div>
        <div className="b-name">
          <h2>{data.name}</h2>
          <p>({data.relationship})</p>
        </div>
        <div className="b-date">{moment(data.date).format("DD MMMM YYYY")}</div>
        <div className="age">{setAge()} ans</div>
        {data.countDown !== 0 && (
          <div className="b-count-down">{countDown()} jours restants</div>
        )}
        {data.countDown === 0 && (
          <div className="b-count-down">🎉 Jour d'anniversaire ! 🎉</div>
        )}
      </div>
      <div className={accordionClass()}>
        <div className="b-date-accordion">
          {moment(data.date).format("DD MMMM YYYY")}
        </div>
        <div>{setAge()} ans</div>
      </div>
    </>
  );
}
