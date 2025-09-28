import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.vehicle.create({
    data: {
      name: 'Honda City',
      type: 'Sedan',
      brand: 'Honda',
      registrationNumber: 'MH12AB1234',
      pricePerDay: 1500,
      available: true,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Isha',
      email: 'isha@example.com',
      password: 'securepassword',
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());