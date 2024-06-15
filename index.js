const express = require("express");
const connectDb = require("./Configs/dbConnection.js");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./Middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json({ limit: '200mb' }));

connectDb();

app.use('/api/user', require('./Routes/userRoutes.js'))
app.use('/api/feedback/', require('./Routes/feedbackRoutes.js'));
app.use('/api/reminder/', require('./Routes/reminderRoutes.js'));
app.use('/api/products/', require('./Routes/productsRoutes.js'));
app.use('/api/product-orders/', require('./Routes/productOrdersRoutes.js'));


app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});