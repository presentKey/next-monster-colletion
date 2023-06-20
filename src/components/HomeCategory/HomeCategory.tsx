import { getAllMainCategory } from '@/service/category';

export default async function HomeCategory() {
  const categories = await getAllMainCategory();
  console.log(categories);

  return (
    <section>
      <ul>
        {categories.map((category) => (
          <li key={category.path}>{category.title}</li>
        ))}
      </ul>
    </section>
  );
}
