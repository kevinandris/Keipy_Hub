import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { DollarSign, Layers3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="border rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 ease-in-out"
    >
      <Image
        src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
        alt={course.title}
        width={500}
        height={300}
        className="rounded-t-xl w-[320px] h-[180px] object-cover"
      />
      <div className="px-4 py-3 flex flex-col gap-2">
        <h2 className="text-lg font-bold hover:[#ab40ab]">{course.title}</h2>
        <div className="flex justify-between text-sm font-medium">
          {instructor && (
            <div className="flex gap-2 items-center">
              <Image
                src={
                  instructor.imageUrl
                    ? instructor.imageUrl
                    : "/avatar_placeholder.jpg"
                }
                alt={
                  instructor.fullName ? instructor.fullName : "Instructor photo"
                }
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{instructor.fullName}</p>
            </div>
          )}

          {level && (
            <div className="flex gap-1">
              <Layers3 size={20} />
              <p>{level.name}</p>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <DollarSign className="w-4 h-4" />
          <p className="text-sm font-semibold">{course.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
