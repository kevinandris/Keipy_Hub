import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & { course: Course };

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: { total: number; count: number } } =
    {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;

    /* initialize a new entry if a purchase does not belong to a group */
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = { total: 0, count: 0 };
    }
    grouped[courseTitle].total += purchase.course.price!;
    grouped[courseTitle].count += 1;
  });

  return grouped;
};

export const getPerformance = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: { course: { instructorId: userId } },
      include: { course: true },
    });

    const groupedEarnings = groupByCourse(purchases);

    const data = Object.entries(groupedEarnings).map(
      ([courseTitle, { total, count }]) => ({
        name: courseTitle,
        total,
        count,
      })
    );

    const totalRevenue = data.reduce((acc, current) => acc + current.total, 0);
    const totalSales = purchases.length;

    return {
      data /* total revenue for each course, this is an array has all the objects, each object has name, total courses and count */,
      totalRevenue /* total courses */,
      totalSales /* total count of purchases */,
    };
  } catch (error) {
    console.log("[getPerformance]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
