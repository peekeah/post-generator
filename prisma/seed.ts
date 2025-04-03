import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const seedPlans = async () => {
  try {
    await prisma.plan.createMany({
      data: [
        {
          name: "Free",
          price: 0,
          duration: 30,
          postLimit: 5
        },
        {
          name: "Premium",
          price: 150,
          duration: 30,
          postLimit: 30
        }
      ]
    })

  } catch (err) {
    console.log("Error while seeding plans:", err);
    throw err;
  }
}

seedPlans()
  .then(res => console.log("Successfully finished seeding"))
  .catch(err => console.log("Error while seeding the database entry"))
