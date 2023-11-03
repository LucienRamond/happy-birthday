import BirthdayForm from "../Components/BirthdayForm/BirthdayForm";
import { useState, useEffect } from "react";
import BirthdayTable from "../Components/BirthdayTable/BirthdayTable";

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
      <BirthdayTable />
    </>
  );
}
