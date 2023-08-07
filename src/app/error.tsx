'use client';
import ErrorOrNotFound from '@/components/common/ErrorOrNotFound/ErrorOrNotFound';
import { useEffect } from 'react';

type Props = {
  error: Error & { digest?: string };
};
export default function Error({ error }: Props) {
  useEffect(() => console.error(error));

  return (
    <ErrorOrNotFound text='페이지가 존재하지 않거나 오류가 발생했습니다.' />
  );
}
