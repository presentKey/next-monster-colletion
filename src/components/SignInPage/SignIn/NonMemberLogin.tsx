type Props = {
  children: React.ReactNode;
  csrfToken: string;
};

export default function NonMemberLogin({ children, csrfToken }: Props) {
  return (
    <form method='post' action='/api/auth/callback/credentials'>
      <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
      {children}
    </form>
  );
}
