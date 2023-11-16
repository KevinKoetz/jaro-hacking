import MatrixBackground from "@/app/_components/MatrixBackground";

export default function PageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MatrixBackground></MatrixBackground>
      {children}
    </>
  );
}
