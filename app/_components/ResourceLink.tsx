import Link from "next/link";

export default function ResourceLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <span>
      {" "}
      <Link href={href} target="_blank" className="text-blue-500 underline">
        {children}
      </Link>{" "}
    </span>
  );
}
