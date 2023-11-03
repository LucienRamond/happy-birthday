import "./SelectDate.css";

export default function SelectDate(props) {
  return (
    <input
      id="input-b-date"
      type="date"
      className="select-date"
      defaultValue={props.date}
      onChange={(e) => props.setDate(e.target.value)}
    />
  );
}
