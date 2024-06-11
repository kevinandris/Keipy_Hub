import CreateCourseForm from "@/components/courses/CreateCourseForm";
import { db } from "@/lib/db";

const CreateCoursePage = async () => {
  /* get categories in database */
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  return (
    <div>
      <CreateCourseForm
        categories={categories.map((category) => ({
          /* destructure the data to remove the error*/
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subcategory) => ({
            label: subcategory.name,
            value: subcategory.id,
          })),
        }))}
      />
    </div>
  );
};

export default CreateCoursePage;
