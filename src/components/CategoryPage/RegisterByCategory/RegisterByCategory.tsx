import { CategoryDetailInformation } from '@/model/category';
import InformationGroup from '../InformationGroup/InformationGroup';
import Headline from '@/components/common/Headline/Headline';
import Container from './Container';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <Container>
      {detail.subCategory.map((sub) => (
        <article key={sub.title}>
          <Headline title={sub.title} />
          <InformationGroup information={sub.information} />
        </article>
      ))}
    </Container>
  );
}
