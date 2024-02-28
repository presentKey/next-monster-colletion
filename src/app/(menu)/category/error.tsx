'use client';
import ErrorOrNotFound from '@/components/common/ErrorOrNotFound/ErrorOrNotFound';
import BookmarkResetButton from '@/components/common/ResetButton/BookmarkResetButton';

export default function Error() {
  return (
    <>
      <ErrorOrNotFound text='페이지가 존재하지 않거나 오류가 발생했습니다. [B]'>
        <BookmarkResetButton />
      </ErrorOrNotFound>
    </>
  );
}
