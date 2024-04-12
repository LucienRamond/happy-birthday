import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL_API } from "@/lib/constants";
import { useRef } from "react";
import { User, useUser } from "@/providers/UserProvider";

export default function Login() {
  const formRef = useRef<
    HTMLFormElement & {
      user_name: HTMLInputElement;
      user_password: HTMLInputElement;
    }
  >(null);
  const { setUser } = useUser();
  console.log(useUser());

  const onSignIn = async () => {
    await fetch(`${BASE_URL_API}/login`, {
      method: "POST",
      body: JSON.stringify({
        username: formRef.current?.user_name.value,
        password: formRef.current?.user_password.value,
      }),
    }).then((response: Response) => {
      if (response.ok) {
        response.json().then((data: { message: string; id: number }) => {
          if (data.message === "Connected") {
            setUser({
              username: formRef.current?.user_name.value,
              id: data.id,
            } as User);
            sessionStorage.setItem("connected", data.id.toString());
          }
        });
      }
    });
  };

  return (
    <div className="max-w-[500px] mx-auto border p-6 rounded-xl">
      <h2 className="text-center font-bold">Connexion</h2>
      <form
        ref={formRef}
        className="grid gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn();
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor="login_username">Identifiant</Label>
          <Input name="user_name" required type="text" id="login_username" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="login_password">Mot de passe</Label>
          <Input
            name="user_password"
            required
            type="password"
            id="login_password"
          />
        </div>
        <Button type="submit" className="mt-2">
          Connexion
        </Button>
      </form>
    </div>
  );
}
