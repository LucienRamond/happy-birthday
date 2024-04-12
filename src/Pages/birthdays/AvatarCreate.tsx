import { Button } from "@/components/ui/button";
import { avatarPresets } from "./model";
import { useEffect, useState } from "react";
import { avatarType } from "./BirthdayCreate";
import Avatar from "./Avatar";

export default function AvatarCreate({
  setAvatar,
  avatar,
}: {
  setAvatar: (avatar: avatarType) => void;
  avatar?: avatarType;
}) {
  const [avatarColor, setAvatarColor] = useState(avatar?.color || 0);
  const [avatarEyes, setAvatarEyes] = useState(avatar?.eyes || 0);
  const [avatarMouth, setAvatarMouth] = useState(avatar?.mouth || 0);

  console.log(avatar);

  const onColorChange = () => {
    if (avatarColor === avatarPresets.color.length - 1) {
      setAvatarColor(0);
    } else {
      setAvatarColor(avatarColor + 1);
    }
  };

  const onEyesChange = () => {
    if (avatarEyes === avatarPresets.eyes.length - 1) {
      setAvatarEyes(0);
    } else {
      setAvatarEyes(avatarEyes + 1);
    }
  };

  const onMouthChange = () => {
    if (avatarMouth === avatarPresets.mouth.length - 1) {
      setAvatarMouth(0);
    } else {
      setAvatarMouth(avatarMouth + 1);
    }
  };

  useEffect(() => {
    setAvatar({ color: avatarColor, eyes: avatarEyes, mouth: avatarMouth });
  }, [avatarColor, avatarEyes, avatarMouth]);

  return (
    <div className="grid justify-center gap-2">
      <div className="flex gap-2">
        <Avatar
          radius={10}
          avatar={{ color: avatarColor, eyes: avatarEyes, mouth: avatarMouth }}
          className="w-[150px]"
        />
        <div className="grid items-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onColorChange();
            }}
          >
            Couleur
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onEyesChange();
            }}
          >
            Yeux
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onMouthChange();
            }}
          >
            Bouche
          </Button>
        </div>
      </div>
    </div>
  );
}
