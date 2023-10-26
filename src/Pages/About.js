import { useState, useEffect } from "react";

export default function About() {
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
      <ul>
        {birthdays.map((birthday) => (
          <li>
            {birthday.name}, {birthday.date},{birthday.sex},{birthday.avatar},
            {birthday.relationship},
          </li>
        ))}
      </ul>
    </>
  );
}
