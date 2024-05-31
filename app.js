// configurare server
require('dotenv').config();

const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000;

const eventRoutes = require('./routes/eventRoutes');

const handle404Error = require('./middlewares/handle404Error');
const handle500Error = require('./middlewares/handle500Error');

app.use(express.json());

app.use('/events', eventRoutes);

app.use(handle404Error);
app.use(handle500Error);

app.listen(port, () => {    
    console.log(`Server avviato su http://localhost:${port}`);
});