import BirthdaysLine from "../Components/BirthdaysLine/BirthdaysLine";
import BirthdayForm from "../Components/BirthdayForm/BirthdayForm";
import { useState, useEffect } from "react";

export default function MyBirthdays() {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const fetchBirthday = async () => {
      const results = await fetch(
        "https://api.passion-musique.net/index.php"
      ).then((response) => response.json());
      setBirthdays(results);
    };
    fetchBirthday();
  }, []);

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
        return <BirthdaysLine object={item} key={`birthday-${i}`} />;
      })}
    </>
  );
}
