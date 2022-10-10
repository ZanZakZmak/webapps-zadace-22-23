// minute x u sate i minute

function vrijeme(minute) {
  var sat = minute / 60 - (minute % 60) / 60;
  var min = minute % 60;
  return `${sat} Sati i ${min} Minuta`;
}
var unos = prompt("upisite minute");
console.log(vrijeme(unos));
