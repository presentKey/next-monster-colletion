'use client';
import { RecoilRoot } from 'recoil';

type Props = {
  children: React.ReactNode;
};

export default function RecoilContext({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
