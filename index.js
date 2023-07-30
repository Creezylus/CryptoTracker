import express from 'express';
import axios, { all } from 'axios';
import bodyParser from 'body-parser';



const app  = express();
const port = 3000;

function cryptoObj(name, symbol, price, volume, marketcap, change ) {
    this.name       = name;
    this.symbol     = symbol;
    this.price      = price;
    this.volume     = volume;
    this.marketcap  = marketcap;
    this.change     = change;
  };


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const getAllUrl = "https://api.coincap.io/v2/assets/";
const getAllRes =  await axios.get(getAllUrl);
var allData     =  getAllRes.data.data;
const coinsArr  = allData.map(item => (capitalizeFirstLetter(item.id) + " (" + item.symbol + ")"));

var arrayCoinsData = new Array();
allData.forEach(element => {
    arrayCoinsData[arrayCoinsData.length] = new cryptoObj(
        capitalizeFirstLetter(element.id),
        element.symbol, element.priceUsd,
        element.volumeUsd24Hr, 
        element.marketCapUsd, 
        element.changePercent24Hr);
});

console.log(arrayCoinsData);
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}







































app.get("/", (req,res) => {
    try
    {
        res.render('index.ejs', 
        {
            Options : coinsArr,
            arrData: arrayCoinsData,
        });
    }
    catch(error)
    {
        console.log(error);
    }
});
// app.post("/search", async (req,res) => {

//     try
//     {
//         const asset  = req.body.searchCrypto.toLowerCase();
//         const url= ("https://api.coincap.io/v2/assets/" + asset);
//         const result = await axios.get(url);
//         res.render('index.ejs', 
//         {
//             Options : coinsArr,
//         });
//     }
//     catch
//     {
//         console.log(error);
//     }

// });
app.listen(port, ()=>
    {
        console.log(" I am active on port: 3000");
    }
);