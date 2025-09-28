const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.post('/', async (req, res) => {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  try {
    

    let user = await prisma.user.findFirst({
  where: { name: `${firstName} ${lastName}` }
});

if (!user) {
  user = await prisma.user.create({
    data: { name: `${firstName} ${lastName}` },
  });
}


    // Step 3: Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vehicleId: parseInt(vehicleId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: "confirmed",
      },
    });

    res.json(booking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

module.exports = router;