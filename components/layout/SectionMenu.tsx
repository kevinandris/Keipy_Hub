import { Course, Section } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SectionMenu = ({
  course,
}: {
  course: Course & { sections: Section[] };
}) => {
  return (
    <div className="w-full max-w-[200px] z-20 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Button>Sections</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link
            href={`/courses/${course.id}/overview`}
            className="p-3 rounded-lg hover:bg-[#eaa7ea] mt-4"
          >
            Overview
          </Link>

          {course.sections.map((section) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/sections/${section.id}`}
              className="p-3 rounded-lg hover:bg-[#eaa7ea] mt-4"
            >
              {section.title}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionMenu;
