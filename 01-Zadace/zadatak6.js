// Napiši funkciju koja za dani broj X provjeri nalazi li se unutar [0, 1000], temnoži sve višekratnike broja 7 do X te ispisuje rezultat

function visekratnici(broj) {
  var zbroj = 1;
  if (broj <= 0 || broj > 1000) {
    return "nije u rangeu";
  } else {
    for (var i = 0; i < broj; i++) {
      if ((i + 1) % 7 === 0) {
        zbroj = zbroj * (i + 1);
      }
    }
    return zbroj;
  }
}

var x = prompt("upisi broj izmedu 0 i 1000");
console.log(visekratnici(x));
