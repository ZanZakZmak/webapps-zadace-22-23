var express = require("express");
var moment = require("moment"); // require
//es6 module sintax---> import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require("uuid");

var app = express();
app.use(express.json());
const port = 3000;

/*2. Kreirajte web servis za dodavanje autora. Sastoji se 3 rute. (dodajAutora,
  vratiAutore, izbrisiDjeloAutora) Kod dodavanja autora, očekuje se da se
  preda naziv i lista djela. Ukoliko se ne predaju isključivo ta dva ključa
  (naziv, djela) odgovara sa sljedecim JSON response -> {"Error":"Krivi
  kljucevi"}. Nakon toga provjerava je li duzina imena svakog djela manja
  od 20 znakova i u slučaju da nije vraća JSON response sa imenom djela koji
  je pre dugacak -> {"Error":"Djelo Process Mining in Practice ima
  vise od 20 znakova"} Ako je sve uredu dodaje datum i id, te sprema
  autora. Vrati autore vraca sve autore i djela. Ruta za brisanje djela brise
  iz liste djela autora jedno djelo.*/

var tempStrorage = [];

//dodajAutora, post
function dodajAutoraHendler(req, res) {
  let tempData = req.body;
  let kljucevi = Object.keys(tempData);
  //autor i djela provjer kljuceva
  let condition1 = false;
  let condition2 = false;
  //provjera dužine stringa
  let condition3 = true;
  for (let i = 0; i < kljucevi.length; i++) {
    if ("naziv" == kljucevi[i]) {
      condition1 = true;
    }
    if ("dijela" == kljucevi[i]) {
      condition2 = true;
    }
  }
  if (condition1 && condition2) {
    for (let i = 0; i < tempData.dijela.length; i++) {
      if (tempData.dijela[i].length > 20) {
        condition3 = false;
        res.json({
          Error: `Dijelo ${tempData.dijela[i]} ima više od 20 znakova`,
        });
      }
    }
  }

  if (condition1 && condition2 && condition3) {
    tempStrorage.push({
      autor: tempData.naziv,
      dijela: tempData.dijela,
      id: uuidv4(),
      datum: moment().format("MMMM Do YYYY, h:mm:ss a"),
    });
  } else {
    res.json({ Error: "Krivi ključevi" });
  }

  res.send(console.log(tempStrorage));
}
//vratiAutore, get
function vratiAutoreHendler(req, res) {
  let odgovor = tempStrorage.map((element) => {
    return {
      autor: element.autor,
      dijela: element.dijela,
    };
  });
  res.json(odgovor);
}
//izbrisiDjeloAutora delete
function izbrisiDjeloAutoraHendler(req, res) {
  let upit = req.params;
  for (let i = 0; i < tempStrorage.length; i++) {
    if (tempStrorage[i].autor == upit.ime_autora) {
      for (let j = 0; j < tempStrorage[i].dijela.length; j++) {
        if (tempStrorage[i].dijela[j] == upit.ime_dijela) {
          let tempDel = tempStrorage[i].dijela[j];
          tempStrorage[i].dijela.splice(j, 1);
          res.send(console.log(`uspješno obrisan ${tempDel}`));
        }
      }
    }
  }
  res.send(console.log("brisanje"));
}

//RUTE
//home
app.get("/", (req, res) => {
  res.send(
    "rute:<br> /dodajAutora --> prima json u body-u i provjerava dali su ispravni ključevi 'naziv' za autora i 'dijelo' za listu knjiga <br> /vratiAutore --> vraca autore i djela <br> /izbrisiDjeloAutora/:ime_autora/:ime_dijela --> brisanje dijela od pojedinih autora u parametre prvo moramo napisati ime autora a zatim  ime dijela"
  );
});
//dodajAutora,
app.post("/dodajAutora", dodajAutoraHendler);
//vratiAutore,
app.get("/vratiAutore", vratiAutoreHendler);
//izbrisiDjeloAutora
app.delete(
  "/izbrisiDjeloAutora/:ime_autora/:ime_dijela",
  izbrisiDjeloAutoraHendler
);

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
