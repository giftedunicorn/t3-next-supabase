import { AppHeader } from "@/components/AppHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
