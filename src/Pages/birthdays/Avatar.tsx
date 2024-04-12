import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";
import { avatarPresets, eyesType, mouthType } from "./model";
import { avatarType } from "./BirthdayCreate";

export default function Avatar({
  avatar,
  className,
  radius,
}: {
  avatar: avatarType;
  className: string;
  radius?: number;
}) {
  const getAvatar = createAvatar(botttsNeutral, {
    seed: "Felix",
    radius: radius,
    backgroundColor: [avatarPresets.color[avatar.color]],
    eyes: [avatarPresets.eyes[avatar.eyes]] as eyesType,
    mouth: [avatarPresets.mouth[avatar.mouth]] as mouthType,
  });
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: getAvatar.toString() }}
    />
  );
}
