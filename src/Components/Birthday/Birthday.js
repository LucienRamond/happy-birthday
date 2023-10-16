import "./Birthday.css";
import moment from "moment";
import "moment/locale/fr";

export default function Birthday(props) {
  const data = props.object;

  const setAge = () => {
    const age = parseInt(moment(data.birth).fromNow().split(" ")[3]) - 1;
    const actualYear = new Date();
    console.log(actualYear.getFullYear() - data.birth.split("-")[0]);
    return age;
  };

  return (
    <div className={data.sex === "M" ? "b-container" : "b-container female"}>
      <div className="birthday-avatar">
        <img src={data.avatarUrl} alt="" />
      </div>
      <div className="b-name">
        <h2>{data.name}</h2>
        <p>({data.relationship})</p>
      </div>
      <div className="b-date">{moment(data.birth).format("DD MMMM YYYY")}</div>
      <div className="b-date">{setAge()} ans</div>
      {data.countDown !== 0 && (
        <div className="b-count-down">{data.countDown} jours restants</div>
      )}
      {data.countDown === 0 && (
        <div className="b-count-down">🎉 Jour d'anniversaire ! 🎉</div>
      )}
    </div>
  );
}
