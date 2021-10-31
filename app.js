const express = require ('express');
const path = require ('path');

const app = express();

//css static file
app.use(express.static(path.join(__dirname, '/public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

//server
app.listen(3000,()=>{
    console.log('Server running on port 3000...')
})