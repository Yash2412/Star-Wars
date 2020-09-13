const experss = require('express');
const app = experss();

app.use(experss.static('./public'))

app.use('/',(req, res) => {
    res.redirect('/index.html');
})


app.listen('5000' , ()=>{console.log('Running on port 5000')});