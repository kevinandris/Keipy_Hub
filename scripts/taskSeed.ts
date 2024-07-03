// Contains functions to create category and sub category and level
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function taskMain() {
  try {
    const tasks = [
      {
        title: "asd",
        description: "asd",
        date: "11/02/2023",
        isCompleted: true,
        userId: "1",
      },
    ];

    // Sequentially create each category with its subcategories
    for (const task of tasks) {
      await db.task.create({
        data: {
          title: task.title,
          description: task.description,
          date: task.date,
          isCompleted: task.isCompleted,
          userId: task.userId,
        },
      });
    }

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await db.$disconnect();
  }
}

taskMain();
