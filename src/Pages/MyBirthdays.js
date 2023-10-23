import BirthdaysLine from "../Components/BirthdaysLine/BirthdaysLine";
import { useSelector } from "react-redux";
import { my_birthdays } from "../redux/reducer/Birthdays";
import BirthdayForm from "../Components/BirthdayForm/BirthdayForm";

export default function MyBirthdays() {
  const birthdays = useSelector(my_birthdays);

  return (
    <>
      <BirthdayForm />
      <ul className="line-container">
        <li>Nom</li>
        <li>Relation</li>
        <li>Date de naissance</li>
        <li>Sexe</li>
      </ul>
      {birthdays.map((item, i) => {
        return <BirthdaysLine object={item} key={`birthday-${i}`} index={i} />;
      })}
    </>
  );
}
