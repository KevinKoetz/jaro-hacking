import CommonlyUsedPasswords from "@/app/_hacks/CommonlyUsedPasswords";
import DisabledAttribute from "@/app/_hacks/DisabledAttribute";
import PasswordAsComment from "@/app/_hacks/PasswordAsComment";
import UrlManipulation from "@/app/_hacks/UrlManipulation";

const hacks = [
  UrlManipulation,
  PasswordAsComment,
  DisabledAttribute,
  CommonlyUsedPasswords,
];

export default function HackPage(context: { params: { id: string } }) {
  const id = Number.parseInt(context.params.id);
  if (Number.isNaN(id) || id < 0 || id > hacks.length - 1) {
    throw new Error("Ungültiger Pfad Parameter.");
  }
  return hacks[id]({ params: { id } });
}
