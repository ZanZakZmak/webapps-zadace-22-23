var express = require("express");
var moment = require("moment"); // require
//es6 module sintax---> import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require("uuid");

var app = express();
const port = 3000;

/*1. Kreirajte web servis za upravljanje obavjestima. Sastoji se od 4 rute.
(dodajObavjest, vratiObavjesti, vratiObavjest, izmjeniObavjest) Na rutu
za dodavanje obavjesti šalje se samo naziv i sadržaj obavjesti.
{"naziv":"Rok za predaju zadace","sadrzaj":"Rok za predaju
zadace je 8.11."}
Unutar funkcije novo dobivenoj obavjesti pridodaje se id i datum kad je
kreirana. Sprema se u memoriju. Kad se vraćaju sve obavjesti, vrati se
samo naziv i datum. Kad se vraća jedna obavjest, vrati se naziv, sadržaj i
timestamp.
{"naziv":"Rok za predaju zadace","sadrzaj":"Rok za predaju
zadace je 8.11.", "datum":"Fri Oct 28 2022 08:50:27 GMT+0200
(Central European Summer Time)"}
Kod izmjene obavjesti, moguće je samo izmjeniti sadržaj.*/

var tempStrorage = [];

//dodajObavjest, post
function dodajObavjestHandler(req, res) {
  let upit = req.params;
  tempStrorage.push({
    naziv: upit.naziv,
    sadrzaj: upit.sadrzaj,
    //ovdje sam zakomentirao id: jer na ovaj nacin je lakse prilikom testiranja posto znamo id napemet a dole je uuid ali je teže pristupat drugim rutama pošto u zadatku pise da se nigdje ne prikazuje id
    //id: tempStrorage.length,
    id: uuidv4(),
    datum: moment().format("MMMM Do YYYY, h:mm:ss a"),
  });
  let odgovor = {
    upit, // vraćamo upit natrag, čisto za provjeru
    status: "uspješno",
  };
  res.json(odgovor);
}
//vratiObavjesti, get smo naziv i datum
function vratiObavjestiHandler(req, res) {
  let odgovor = tempStrorage.map((element) => {
    return {
      naziv: element.naziv,
      datum: element.datum,
    };
  });
  res.json(odgovor);
}
//vratiObavjest, get
function vratiObavjestHandler(req, res) {
  let upit = req.params;
  let odgovor;
  for (let i = 0; i < tempStrorage.length; i++) {
    if (upit.id == tempStrorage[i].id) {
      odgovor = {
        naziv: tempStrorage[i].naziv,
        sadrzaj: tempStrorage[i].sadrzaj,
        timestamp: tempStrorage[i].datum,
      };
    }
  }
  res.json(odgovor);
}
//izmjeniObavjest pach
function izmjeniObavjestHandler(req, res) {
  let upit = req.params;
  for (let i = 0; i < tempStrorage.length; i++) {
    if (upit.id == tempStrorage[i].id) {
      tempStrorage[i].sadrzaj = upit.promjenaSadrzaja;
    }
  }
  res.send(console.log("promjena"));
}

//get id da dobijemo uuid za pristup pomocu drugih ruta
function getidHandler(req, res) {
  let i = 0;
  let odgovor = tempStrorage.map((element) => {
    return {
      id: element.id,
      br_stavke: i++,
    };
  });
  res.json(odgovor);
}

//home
app.get("/", (req, res) => {
  res.send(
    "rute:<br> /dodajObavjest/:naziv/:sadrzaj --> u prvi dio rute dodajemo naziv a nakon toga sadrzaj <br> /vratiObavjesti --> vraca naziv i datum svih obavjesti <br> vratiObavjest/:id --> pomocu ID vraca jednu obavjest (koristiti /listaID za pregled idjeva ) <br> /izmjeniObavjest/:id/:promjenaSadrzaja --> odabiremo obavjest pomocu ida i mozemo samo sadržaj promjenit (koristiti /listaID za pregled idjeva ) <br> /listaID --> da možemo vidjet idove posto su UUID za druge rute a uzadatku specificno ne pise da igdje drugdje prikazujemo"
  );
});
//dodajObavjest, post
app.post("/dodajObavjest/:naziv/:sadrzaj", dodajObavjestHandler);
//vratiObavjesti, get
app.get("/vratiObavjesti", vratiObavjestiHandler);
//vratiObavjest, get
app.get("/vratiObavjest/:id", vratiObavjestHandler);
//izmjeniObavjest patch
app.patch("/izmjeniObavjest/:id/:promjenaSadrzaja", izmjeniObavjestHandler);
// za laksi pristup idovima ako se testa
app.get("/listaID", getidHandler);

app.listen(port, () => console.log(`Slušam na portu ${port}!`));
