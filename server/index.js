const express = require('express');
const cors = require('cors');
const reservationRouter = require('./app/routes/reservation.routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', reservationRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));