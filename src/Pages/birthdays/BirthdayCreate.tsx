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
import { Cake, Plus } from "lucide-react";
import { useRef, useState } from "react";

import AvatarCreate from "./AvatarCreate";

export type avatarType = {
  color: number;
  eyes: number;
  mouth: number;
};

export default function BirthdayCreate({ retry }: { retry: () => void }) {
  const [isDialogOpen, openDialog] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<avatarType>();
  const [mySex, setMySex] = useState<string>("M");
  const [itsMe, setItsMe] = useState<boolean>(false);
  const { user } = useUser();

  const formRef = useRef<
    HTMLFormElement & {
      name: HTMLInputElement;
      birthday: HTMLInputElement;
      relation: HTMLInputElement;
    }
  >(null);

  console.log("avatar");

  const onCreate = async () => {
    if (!user?.id) return;

    let sex = "";

    if (formRef.current?.relation.value !== "moi") {
      sex = getSex(formRef.current?.relation.value || "");
    } else {
      sex = getSex(mySex);
    }

    fetch(`${BASE_URL_API}/birthday/create`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user?.id,
        name: formRef.current?.name.value,
        birthday: formRef.current?.birthday.value,
        relation: formRef.current?.relation.value,
        sex: sex,
        avatar: JSON.stringify(avatar),
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
        <Button
          className="mx-auto w-1/3 md:w-[100px] grid mb-2 bg-orange-600 border border-foreground "
          size={"sm"}
        >
          <Plus color={"black"} />
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
          <AvatarCreate setAvatar={(avatar: avatarType) => setAvatar(avatar)} />
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input name="name" id="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="birthday">Date de naissance</Label>
            <Input name="birthday" id="birthday" type="date" required />
          </div>
          <div className="flex gap-2">
            <Select
              required
              name="relation"
              onValueChange={(e) =>
                e === "moi" ? setItsMe(true) : setItsMe(false)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Relation" />
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
