// polje ispisuje polje djelivo sa 3 sve brojeve

function djeliv_sa_tri(polje) {
  var arr = [];
  for (var i = 0; i < polje.length; i++) {
    if (polje[i] % 3 == 0) {
      arr.push(polje[i]);
    }
  }
  return arr;
}

var polje = [];
var duljina = prompt("upisi Range brojeva da dobis sve djeljive sa 3");

for (var j = 0; j < duljina; j++) {
  polje.push(j + 1);
}

console.log(`brojevi djeljivi sa 3 su :${djeliv_sa_tri(polje)}`);
