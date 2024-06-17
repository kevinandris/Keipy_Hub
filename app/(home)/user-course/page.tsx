import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LearningPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const purchasedCourses = await db.purchase.findMany({
    where: {
      customerId: userId,
    },
    select: {
      course: {
        include: {
          category: true,
          SubCategory: true,
          sections: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="px-4 py-6 md:-m-5 md:px-10 xl:px-16">
      <h1 className="text-3xl font-bold">Your purchased courses below</h1>
      <span>We wish you the best endeavour for your learning 💪</span>
      <div className="flex flex-wrap gap-7 mt-7">
        {purchasedCourses.map((purchase) => (
          <CourseCard key={purchase.course.id} course={purchase.course} />
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
