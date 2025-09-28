const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/vehicle-types', require('./routes/vehicleTypes'));
app.use('/vehicles', require('./routes/vehicles'));
app.use('/bookings', require('./routes/bookings'));


app.listen(3001, () => {
  console.log('🚀 Backend running on http://localhost:3001');
});