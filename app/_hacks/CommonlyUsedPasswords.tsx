import Unlock from "../_auth/Unlock";
import { HackContext } from "../hack/HackContext";

export default function CommonlyUsedPasswords(context: HackContext) {
  return (
    <div>
      <p>
        Selbst die best abgesichterten Internetseiten können einfach gehackt
        werden, wenn Ihre Nutzer unsichere Passwörter verwenden.
      </p>
      <p>
        Es könnte sein, dass die nächste Seite mit einem der meist genutzen
        Passwörter geschützt ist. Vielleicht findest du über Suchmaschinen ja
        das Passwort heraus?
      </p>
      <Unlock hackId={context.params.id + 1}></Unlock>
    </div>
  );
}
