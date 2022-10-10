//hrk u eure funkcija 7.53 0.13

function kn_to_e(kn) {
  var euro = kn / 7.53 - (kn % 7.53) / 7.53;
  var centi = (Math.round(((kn % 7.53) / 7.53) * 100) / 100) * 100;
  return [euro, centi];
}
var a = prompt("upisite vrjednost u kunama");
var values = kn_to_e(a);
console.log(`${values[0]} eura ${values[1]} centi`);
