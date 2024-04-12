import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/providers/UserProvider";
import { Axe, Cake, Settings, ShieldQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "@/assets/banner.png";
import { BASE_URL_API } from "@/lib/constants";

type UserType = {
  username: string;
};

export default function Navbar() {
  const { user, resetUser } = useUser();
  const [settings, openSettings] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsers = () => {
    fetch(`${BASE_URL_API}/users`, {
      method: "POST",
      body: JSON.stringify({
        id: user?.id,
      }),
    }).then(async (response) => {
      const datas = await response.json();
      if (response.ok) {
        if (!datas.error) {
          setUsers(datas);
        }
      }
    });
  };

  return (
    <div className="grid w-full">
      <NavigationMenu className="sm:flex justify-center pt-0 grid sm:justify-between w-full max-w-full ">
        <NavigationMenuList className=" grid grid-cols-[1fr_max-content_1fr_max-content_1fr_max-content_1fr] p-2">
          <NavigationMenuItem className="flex justify-center">
            <Link
              onClick={() => openSettings(false)}
              to="/"
              className={`${navigationMenuTriggerStyle()} h-14`}
            >
              <Cake
                fill="#88d2e6"
                size={40}
                className="hover:animate-spin hover:repeat-1"
              />
            </Link>
          </NavigationMenuItem>
          <Separator orientation="vertical" />
          <NavigationMenuItem className="flex justify-center">
            <Link
              onClick={() => openSettings(false)}
              to="/birthdays"
              className={`${navigationMenuTriggerStyle()} h-14`}
            >
              <Axe
                fill="#f6d54c"
                size={40}
                className="hover:animate-spin hover:repeat-1"
              />
            </Link>
          </NavigationMenuItem>
          <Separator orientation="vertical" />

          <NavigationMenuItem className="flex justify-center">
            <Link
              to="/about"
              onClick={() => openSettings(false)}
              className={`${navigationMenuTriggerStyle()} h-14`}
            >
              <ShieldQuestion
                fill="#cadc2b"
                size={40}
                className="hover:animate-spin hover:repeat-1"
              />
            </Link>
          </NavigationMenuItem>
          <Separator orientation="vertical" />

          <NavigationMenuItem
            className={"flex justify-center"}
            onClick={() => {
              openSettings(!settings);
              !settings && getUsers();
            }}
          >
            <div className={`${navigationMenuTriggerStyle()} h-14`}>
              <Settings
                fill="#f24f9a"
                size={40}
                className="hover:animate-spin hover:repeat-1"
              />
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="-translate-y-4">
          <img src={banner} className="w-full" />
        </div>
        {settings &&
          (user ? (
            <NavigationMenuList className="mb-2">
              <NavigationMenuItem className="mt-1">
                <Link
                  onClick={() => resetUser()}
                  className={`${navigationMenuTriggerStyle()}  text-xl`}
                  to="/"
                >
                  Déconnexion
                </Link>
              </NavigationMenuItem>
              {users.map((user: UserType) => {
                return <div>{user.username}</div>;
              })}
            </NavigationMenuList>
          ) : (
            <NavigationMenuList className="mb-2">
              <NavigationMenuItem>
                <Link
                  to="/connexion"
                  className={`${navigationMenuTriggerStyle()}  text-xl`}
                >
                  Connexion
                </Link>
              </NavigationMenuItem>
              <Separator orientation="vertical" className="h-3 bg-foreground" />
              <NavigationMenuItem>
                <Link
                  to="/inscription"
                  className={`${navigationMenuTriggerStyle()}  text-xl`}
                >
                  Inscription
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          ))}
      </NavigationMenu>
    </div>
  );
}
