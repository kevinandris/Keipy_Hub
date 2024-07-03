// // Contains functions to create category and sub category and level
// const { PrismaClient } = require("@prisma/client");
// const database = new PrismaClient();

// async function main() {
//   try {
//     const categories = [
//       {
//         name: "Engineering",
//         subCategories: {
//           create: [
//             { name: "Civil Engineering" },
//             { name: "Electrical and Electronic Engineering" },
//             { name: "Mechanical Engineering" },
//             { name: "Software Engineering" },
//           ],
//         },
//       },
//       {
//         name: "Computer and Information Sciences",
//         subCategories: {
//           create: [
//             { name: "Software Development" },
//             { name: "Data Science" },
//             { name: "Networks and Cybersecurity" },
//             { name: "Digital Services" },
//           ],
//         },
//       },
//       {
//         name: "Business",
//         subCategories: {
//           create: [
//             { name: "Accounting" },
//             { name: "Marketing" },
//             { name: "Finance" },
//             { name: "Management and Leadership" },
//           ],
//         },
//       },
//       {
//         name: "Design",
//         subCategories: {
//           create: [
//             { name: "Fashion Design" },
//             { name: "Industrial Design" },
//             { name: "Interaction Design" },
//             { name: "Communication Design" },
//           ],
//         },
//       },
//       {
//         name: "Health Science",
//         subCategories: {
//           create: [
//             { name: "Nursing" },
//             { name: "Counselling" },
//             { name: "Psychology" },
//             { name: "Midwifery" },
//           ],
//         },
//       },
//       {
//         name: "Sport and Recreation",
//         subCategories: {
//           create: [
//             { name: "Coaching" },
//             { name: "Exercise Science and Nutrition" },
//             { name: "Health and Physical Education" },
//             { name: "Sport and Exercise Science" },
//           ],
//         },
//       },
//     ];

//     // Sequentially create each category with its subcategories
//     for (const category of categories) {
//       await database.category.create({
//         data: {
//           name: category.name,
//           subCategories: category.subCategories,
//         },
//         include: {
//           subCategories: true,
//         },
//       });
//     }

//     await database.level.createMany({
//       data: [
//         { name: "Beginner" },
//         { name: "Intermediate" },
//         { name: "Advanced" },
//         { name: "All levels" },
//       ],
//     });

//     console.log("Seeding successfully");
//   } catch (error) {
//     console.log("Seeding failed", error);
//   } finally {
//     await database.$disconnect();
//   }
// }

// main();
