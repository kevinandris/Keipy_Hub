import { db } from "@/lib/db";
import getCoursesByCategory from "@/app/actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  const courses = await getCoursesByCategory(null); // This will lead to another page, null acts as the main page

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />

      <div className="flex flex-wrap gap-7 justify-center">
        {/* >>Fetch all courses */}
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
