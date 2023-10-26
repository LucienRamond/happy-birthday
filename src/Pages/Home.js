import Birthday from "../Components/Birthday/Birthday";
import { useState, useEffect } from "react";

export default function Home() {
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
      {birthdays.map((item, i) => {
        return <Birthday object={item} key={`birthday-${i}`} />;
      })}
    </>
  );
}
