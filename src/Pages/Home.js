import Birthday from "../Components/Birthday/Birthday";
import { useSelector } from "react-redux";
import { my_birthdays } from "../redux/reducer/Birthdays";

export default function Home() {
  const birthdays = useSelector(my_birthdays);
  const sortedBirthdays = [...birthdays];
  sortedBirthdays.sort((a, b) => {
    return a.countDown - b.countDown;
  });

  return (
    <>
      {sortedBirthdays.map((item) => {
        return <Birthday object={item} key={item.key} />;
      })}
    </>
  );
}
