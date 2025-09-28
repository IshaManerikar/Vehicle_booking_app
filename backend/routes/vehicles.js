const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /vehicles/:typeId
router.get('/:typeId', async (req, res) => {
  const typeId = parseInt(req.params.typeId);
  try {
    const vehicles = await prisma.vehicle.findMany({
  where: { typeId },
  select: { id: true, name: true }
});
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

module.exports = router;