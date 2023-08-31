import Unlock from "../_auth/Unlock";

export default function PasswordAsComment(context: any) {
  return (
    <div>
      Password As Comment<Unlock hackId={context.params.id}></Unlock>
    </div>
  );
}
