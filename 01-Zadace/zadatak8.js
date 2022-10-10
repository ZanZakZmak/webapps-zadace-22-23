//Napiši funkciju koja prima dva objekta, te u slučaju da imaju iste kljućeve vraća true

function uspoređivanje_objekata(o1, o2) {
  var stanje = true;
  var object1_keys = Object.keys(o1).sort();
  var object2_keys = Object.keys(o2).sort();
  console.log(object1_keys);
  console.log(object2_keys);
  if (!(object1_keys.length == object2_keys.length)) {
    stanje = false;
  }
  for (var i = 0; i < object1_keys.length; i++) {
    if (!(object1_keys[i] == object2_keys[i])) {
      stanje = false;
    }
  }
  return stanje;
}

var object1 = { a: 1, b: 2, c: 3 };
var object2 = { b: 321, a: 3, c: 1 };

console.log(uspoređivanje_objekata(object1, object2));
