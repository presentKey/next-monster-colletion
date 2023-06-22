import { MainCategory } from '@/model/category';
import Link from 'next/link';

type Props = {
  category: MainCategory;
};

export default function SideCategoryCard({ category: { title, path } }: Props) {
  return (
    <Link href={`/${path}`}>
      <span>{title}</span>
    </Link>
  );
}
