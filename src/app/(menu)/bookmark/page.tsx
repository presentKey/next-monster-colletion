import BookmarkList from '@/components/routes/bookmark/BookmarkList';
import styles from './page.module.css';
import Notice from '@/components/common/Notice/Notice';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '북마크',
  description: '몬스터 북마크',
};

const NOTE_TEXT = ['몬스터의 ☆ 클릭 시, 북마크를 등록/해제 할 수 있습니다.'];

export default function BookmarkPage() {
  return (
    <div className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} margin='1rem' />
      <BookmarkList />
    </div>
  );
}
