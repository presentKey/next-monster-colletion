import { Register } from '@/model/information';
import Label from './Label';

type Props = {
  registers: Register[];
};

export default function Registration({ registers }: Props) {
  return (
    <>
      {registers.map((register, index) => (
        <div key={index}>
          <span>{register?.tag}</span>
          {register?.job && <Label text={register.job} />}
          <ol>
            {register?.descriptions?.map((text, index) => (
              <li key={index}>{text}</li>
            ))}
          </ol>
          <ol>
            {register?.quest?.map((q, index) => (
              <div key={index}>
                <span>{q?.level}</span>
                <span>{q?.name}</span>
                <span>{q?.description}</span>
              </div>
            ))}
          </ol>
          <div>
            {register?.location?.main}
            {register?.location?.sub}
          </div>
          <div>{register?.timer}</div>
          <div>
            {register?.boss?.name}
            {register?.boss?.difficulty}
            {register?.boss?.description}
          </div>
        </div>
      ))}
    </>
  );
}
