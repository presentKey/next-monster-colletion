type Props = {
  id: string;
  check: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckButton({ id, check, onChange }: Props) {
  return (
    <div>
      <input
        type='checkbox'
        id={id}
        checked={check}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor={id}>수식어 보기</label>
    </div>
  );
}
