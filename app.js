// configurare server
require('dotenv').config();

const express = require('express'); 
const app = express();
const port = process.env.PORT || 3000;

const eventRoutes = require('./routes/eventRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.use('/events', eventRoutes);

app.listen(port, () => {    
    console.log(`Server avviato su http://localhost:${port}`);
});