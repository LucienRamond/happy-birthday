import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BASE_URL_API } from "@/lib/constants";
import { useUser } from "@/providers/UserProvider";
import { Cake, Pencil } from "lucide-react";
import { useRef, useState } from "react";

import AvatarCreate from "./AvatarCreate";
import { birthdayType } from "./BirthdaysList";
import { avatarType } from "./BirthdayCreate";

export default function BirthdayUpdate({
  retry,
  birthday,
}: {
  retry: () => void;
  birthday: birthdayType;
}) {
  const [isDialogOpen, openDialog] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<avatarType>(JSON.parse(birthday.avatar));
  const [mySex, setMySex] = useState<string>("M");
  const [itsMe, setItsMe] = useState<boolean>(false);
  const { user } = useUser();

  console.log(birthday);

  const formRef = useRef<
    HTMLFormElement & {
      name: HTMLInputElement;
      birthday: HTMLInputElement;
      relation: HTMLInputElement;
      bday_id: HTMLInputElement;
    }
  >(null);

  const onCreate = async () => {
    if (!user?.id) return;

    let sex = "";

    if (formRef.current?.relation.value !== "moi") {
      sex = getSex(formRef.current?.relation.value || "");
    } else {
      sex = getSex(mySex);
    }

    fetch(`${BASE_URL_API}/birthday/update`, {
      method: "PUT",
      body: JSON.stringify({
        user_id: user?.id,
        name: formRef.current?.name.value,
        birthday: formRef.current?.birthday.value,
        relation: formRef.current?.relation.value,
        sex: sex,
        avatar: JSON.stringify(avatar),
        id: formRef.current?.bday_id.value,
      }),
    }).then(async (response) => {
      if (response.ok) {
        openDialog(false);
        retry();
      }
    });
  };

  const getSex = (identity: string) => {
    if (
      identity === "M" ||
      identity === "papa" ||
      identity === "papy" ||
      identity === "frere" ||
      identity === "cousin" ||
      identity === "copain"
    ) {
      return "M";
    } else {
      return "F";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={openDialog}>
      <DialogTrigger asChild>
        <Button className="w-1/2 rounded-none rounded-bl-[2px]" size={"icon"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded p-1 md:p-5">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Cake className=" opacity-80" />
              Ajouter
            </div>
          </DialogTitle>
        </DialogHeader>
        <form ref={formRef} className="grid gap-2">
          <AvatarCreate
            avatar={JSON.parse(birthday.avatar)}
            setAvatar={(avatar: avatarType) => setAvatar(avatar)}
          />
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              defaultValue={birthday.name}
              name="name"
              id="name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthday">Date de naissance</Label>
            <Input
              defaultValue={birthday.birthday}
              name="birthday"
              id="birthday"
              type="date"
              required
            />
          </div>
          <div className="flex gap-2">
            <Select
              required
              name="relation"
              defaultValue={birthday.relation}
              onValueChange={(e) =>
                e === "moi" ? setItsMe(true) : setItsMe(false)
              }
            >
              <SelectTrigger>
                <SelectValue>{birthday.relation}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="moi">Moi</SelectItem>
                  <SelectItem value="papa">Papa</SelectItem>
                  <SelectItem value="maman">Maman</SelectItem>
                  <SelectItem value="papy">Papy</SelectItem>
                  <SelectItem value="mamie">Mamie</SelectItem>
                  <SelectItem value="soeur">Soeur</SelectItem>
                  <SelectItem value="frere">Frère</SelectItem>
                  <SelectItem value="cousin">Cousin</SelectItem>
                  <SelectItem value="cousine">Cousine</SelectItem>
                  <SelectItem value="copain">Copain</SelectItem>
                  <SelectItem value="copine">Copine</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input className="hidden" value={birthday.id} name="bday_id" />
          </div>
          {itsMe && (
            <Select onValueChange={(e) => setMySex(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Garçon" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="M">Garçon</SelectItem>
                  <SelectItem value="F">Fille</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <Button
            onClick={(e) => {
              e.preventDefault();
              onCreate();
            }}
          >
            Ajouter
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
