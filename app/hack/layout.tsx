import MatrixBackground from "@/app/_components/MatrixBackground";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MatrixBackground></MatrixBackground>
      <div className="container mx-auto bg-gray-50/80 p-5 m-10">{children}</div>
    </>
  );
}
