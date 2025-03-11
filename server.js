const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});


app.use(require('./auth/routes'));
const restaurantRouter = require('./routes/restaurantRouter');
app.use('/api', restaurantRouter);



const PORT = 6666;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
