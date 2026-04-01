import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Api is running');
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});