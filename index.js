import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app  = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req,res) => {
    res.render('index.ejs');
});
app.listen(port, ()=>
{
    console.log(" I am active on port: 3000");
}
);