import { CategoryDetailInformation } from '@/model/category';
import InformationGroup from '../InformationGroup/InformationGroup';
import TabPanel from '@/components/common/TapPanel/TapPanel';
import Container from './Container';

type Props = {
  detail: CategoryDetailInformation;
};

export default function RegisterByCategory({ detail }: Props) {
  return (
    <Container>
      {detail.subCategory.map((sub) => (
        <article key={sub.title}>
          <TabPanel title={sub.title} />
          <InformationGroup information={sub.information} />
        </article>
      ))}
    </Container>
  );
}
