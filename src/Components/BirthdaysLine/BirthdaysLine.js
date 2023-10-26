import "./BirthdaysLine.css";
import moment from "moment";
import "moment/locale/fr";
import { useState } from "react";

export default function BirthdaysLine(props) {
  const data = props.object;
  const [onModify, setOnModify] = useState(false);
  const [newLine, setNewLine] = useState({
    name: data.name,
    relationship: data.relationship,
    date: data.date,
    sex: data.sex,
    avatar: data.avatar,
    id: data.id,
  });

  const deleteLine = (e) => {
    e.preventDefault();
    fetch("https://api.passion-musique.net/birthday_delete.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.id),
    });
  };

  const modifyLine = () => {
    setOnModify(!onModify);
    if (onModify) {
      fetch("https://api.passion-musique.net/birthday_update.php", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLine),
      });
    }
  };

  return (
    <>
      <ul
        className={
          onModify ? "line-container line-on-modification" : "line-container"
        }
      >
        <li>
          {onModify ? (
            <input
              defaultValue={data.name}
              onChange={(e) => setNewLine({ ...newLine, name: e.target.value })}
            />
          ) : (
            `${data.name}`
          )}
        </li>
        <li>
          {onModify ? (
            <select
              required
              id="relationship"
              name="relationship"
              defaultValue={data.relationship}
              onChange={(e) =>
                setNewLine({ ...newLine, relationship: e.target.value })
              }
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
          ) : (
            `${data.relationship}`
          )}
        </li>
        <li>
          {onModify ? (
            <input
              required
              type="date"
              id="birthday"
              defaultValue={data.date}
              onChange={(e) => setNewLine({ ...newLine, date: e.target.value })}
            />
          ) : (
            `${moment(data.date).format("DD MMMM  YYYY")}`
          )}
        </li>
        <li>
          {onModify ? (
            <select
              defaultValue={data.sex}
              onChange={(e) => setNewLine({ ...newLine, sex: e.target.value })}
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          ) : (
            `${data.sex}`
          )}
        </li>
        <li className="line-modify" onClick={modifyLine}>
          {onModify ? "✔" : "✎"}
        </li>
        <li className="line-delete" onClick={(e) => deleteLine(e)}>
          ⛌ <div className="erasure"></div>
        </li>
      </ul>
    </>
  );
}
