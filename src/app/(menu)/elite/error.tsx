'use client';
import ErrorOrNotFound from '@/components/common/ErrorOrNotFound';
import EliteResetButton from '@/components/common/ResetButton/EliteResetButton';

export default function Error() {
  return (
    <>
      <ErrorOrNotFound text='페이지가 존재하지 않거나 오류가 발생했습니다. [E]'>
        <EliteResetButton />
      </ErrorOrNotFound>
    </>
  );
}
