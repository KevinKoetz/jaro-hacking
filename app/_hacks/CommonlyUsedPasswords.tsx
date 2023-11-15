import Unlock from "../_auth/Unlock";
import { HackContext } from "../hack/HackContext";

export default function CommonlyUsedPasswords(context: HackContext) {
  return (
    <div>
      Commonly Used Passwords
      <Unlock hackId={context.params.id + 1}></Unlock>
    </div>
  );
}
