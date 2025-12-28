type Props = {
  children: React.ReactNode;
};

export default function GlassContainer({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass w-full max-w-3xl p-8">{children}</div>
    </div>
  );
}
