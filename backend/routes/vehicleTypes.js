const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get('/:wheels', async (req, res) => {
  const wheels = parseInt(req.params.wheels);
  try {
    const types = await prisma.vehicleType.findMany({
      where: { wheels },
      select: { id: true, name: true }
    });
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle types" });
  }
});

module.exports = router;