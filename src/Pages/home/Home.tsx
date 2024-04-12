import { BASE_URL_API } from "@/lib/constants";
import { useState, useEffect } from "react";
import { birthdayType } from "../birthdays/BirthdaysList";
import { useUser } from "@/providers/UserProvider";
import Avatar from "../birthdays/Avatar";

export default function Home() {
  const [birthdays, setBirthdays] = useState<birthdayType[]>([]);
  const [birthdaysError, setBirthdaysError] = useState<string>();
  const [me, setMe] = useState<birthdayType>();
  const { user } = useUser();

  useEffect(() => {
    fetch(`${BASE_URL_API}/birthday/list`, {
      method: "POST",
      body: JSON.stringify({
        id: user?.id,
      }),
    }).then(async (response) => {
      const datas = await response.json();
      if (response.ok) {
        if (datas.error) {
          console.log(datas.error);
          setBirthdaysError("Inscrivez-vous ou connectez-vous !");
        } else {
          setBirthdays(datas);
          setMe(
            datas.find((birthday: birthdayType) => {
              if (birthday.relation === "moi") {
                return birthday;
              }
            })
          );
          setBirthdaysError(undefined);
        }
      }
    });
  }, [user?.id]);

  return (
    <>
      {birthdaysError && <div className="text-center">{birthdaysError}</div>}
      <div className="md:max-w-[80%] grid mx-auto">
        {me && (
          <div className="hover:animate-pulse m-1">
            <div className="flex justify-center items-center text-[3rem] font-extrabold">
              {me.name.toUpperCase()}
            </div>
            <div className=" -translate-y-5 border-foreground">
              <Avatar
                radius={10}
                className="border-4 rounded-[11%] border-foreground w-[300px] mx-auto"
                avatar={JSON.parse(me.avatar)}
              />
              <div
                className={`w-fit rounded-b border-x-8  border-foreground flex justify-center items-center font-extrabold text-2xl mx-auto px-2`}
              >
                <div className="-translate-y-[44px] bg-background border-4 border-b-background border-x-foreground border-t-foreground rounded-t-md p-[2px]">
                  {me.remaining_days} JOURS !
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 p-1">
          {birthdays.map((birthday) => {
            if (birthday.relation === "moi") return;

            return (
              <div key={birthday.id} className=" border-foreground">
                <div className="flex justify-center items-center text-2xl font-extrabold translate-y-2">
                  {birthday.name.toUpperCase()}
                </div>
                <Avatar
                  radius={9}
                  className="hover:animate-pulse border-4 rounded-[12%] border-foreground"
                  avatar={JSON.parse(birthday.avatar)}
                />
                <div
                  className={`border-x-8 bg-background w-fit border-foreground flex justify-center items-center font-extrabold text-xl mx-auto px-2`}
                >
                  <div className="-translate-y-[40px] bg-background border-4 border-b-background border-x-foreground border-t-foreground rounded-t-md p-[2px]">
                    {birthday.remaining_days} JOURS !
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
