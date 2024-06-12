import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  const { userId } = auth();
  const values = await req.json();

  try {
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course not Found", { status: 404 });
    }

    const section = await db.section.update({
      where: {
        id: sectionId,
        courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          sectionId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
          sectionId,
        },
      });
    }

    return NextResponse.json(section, { status: 200 });
  } catch (error) {
    console.log("[sectionId_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { courseId, sectionId } = params;

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        instructorId: userId,
      },
    });

    if (!course) {
      return new NextResponse("Course not Found", { status: 404 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        courseId,
      },
    });

    if (!section) {
      return new NextResponse("Section not Found", { status: 404 });
    }

    if (section.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          sectionId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
    }

    await db.section.delete({
      where: {
        id: sectionId,
        courseId,
      },
    });

    /* >> we need this to have one section published, because u cannot publish a course without a section */
    const publishedSectionsInCourse = await db.section.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    if (!publishedSectionsInCourse.length) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return new NextResponse("Section Deleted", { status: 200 });
  } catch (error) {
    console.log("[sectionId_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
