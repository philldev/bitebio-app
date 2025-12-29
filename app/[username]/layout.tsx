export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <main>{children}</main>
    </div>
  );
}
