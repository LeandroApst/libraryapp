
const express = require('express')

const app = express();

const path = require('path');

const router = express.Router();

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/library.html'));
})

app.use('/', router)
app.use(express.static(path.join(__dirname,"js")))

app.listen(process.env.PORT || 3000);

console.log('servidor ligado')

