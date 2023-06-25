type Props = {
  children: React.ReactNode;
};

export default function CategoryLayout({ children }: Props) {
  return (
    <>
      <section>사이드 nav</section>
      {children}
    </>
  );
}
