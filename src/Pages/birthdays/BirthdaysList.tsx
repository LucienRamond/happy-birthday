import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL_API } from "@/lib/constants";
import { useEffect, useState } from "react";
import { months } from "./model";

export type birthdayType = {
  id: number;
  name: string;
  birthday: string;
  age: number;
  sex: string;
  remaining_days: number;
  relation: string;
  avatar: string;
};

import { useUser } from "@/providers/UserProvider";
import BirthdayCreate from "./BirthdayCreate";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BirthdayUpdate from "./BirthdayUpdate";
import Avatar from "./Avatar";
import { Input } from "@/components/ui/input";

export default function BirthdaysList() {
  const [birthdays, setBirthdays] = useState<birthdayType[]>([]);
  const [birthdaysError, setBirthdaysError] = useState<string>();
  const [retry, setRetry] = useState(false);
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
          setBirthdaysError(undefined);
        }
      }
    });
  }, [user?.id, retry]);

  const setDate = (date: string) => {
    const arrayDate = date.split("-");
    return `${arrayDate[2]} ${months[parseInt(date.split("-")[1]) - 1]} ${
      arrayDate[0]
    }`;
  };

  const onDelete = (id: number) => {
    fetch(`${BASE_URL_API}/birthday/delete`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    }).then(async (response) => {
      const datas = await response.json();
      if (response.ok) {
        console.log(datas);
      }
    });
    setRetry(!retry);
  };

  return (
    <>
      <BirthdayCreate retry={() => setRetry(!retry)} />

      {birthdaysError && <div className="text-center">{birthdaysError}</div>}

      <div className="sm:grid hidden gap-2 m-auto md:max-w-[80%]">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Anniversaire</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Jours restants</TableHead>
              <TableHead>Relation</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {birthdays.map((birthday) => (
              <TableRow key={birthday.id}>
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{ __html: birthday.avatar }}
                    className="w-[50px]"
                  />
                </TableCell>
                <TableCell>{birthday.name}</TableCell>
                <TableCell>{setDate(birthday.birthday)}</TableCell>
                <TableCell>{birthday.age} ans</TableCell>
                <TableCell>{birthday.remaining_days} jours</TableCell>
                <TableCell>{birthday.relation}</TableCell>
                <TableCell className="flex gap-2">
                  <Input type="text" />

                  <Button type="submit" size={"icon"}>
                    Subscribe
                  </Button>

                  <Button onClick={() => onDelete(birthday.id)} size={"icon"}>
                    <Pencil />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className=" text-center" colSpan={7}>
                <strong>Total: </strong>
                {birthdays.length} anniversaires
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="sm:hidden grid grid-cols-2">
        {birthdays.map((birthday) => {
          return (
            <div
              key={birthday.id}
              className="border border-foreground rounded m-1 shadow-lg"
            >
              <div className="flex justify-center items-center text-lg font-bold h-[40px]">
                {birthday.name} - {birthday.age} ans
              </div>
              <Avatar
                radius={0}
                className=" border-y rounded-none border-foreground hover:animate-pulse"
                avatar={JSON.parse(birthday.avatar)}
              />
              <div className="flex">
                <BirthdayUpdate
                  birthday={birthday}
                  retry={() => setRetry(!retry)}
                />
                <Button
                  className="w-1/2 rounded-none rounded-br-[2px]"
                  onClick={() => onDelete(birthday.id)}
                  size={"icon"}
                  variant={"destructive"}
                >
                  <X />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
