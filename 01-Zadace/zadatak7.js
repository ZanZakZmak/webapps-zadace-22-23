//Napiši funkciju koja vraća predano polje obrnutim redosljedom Ispis : [3,4,5,6] -> [6,5,4,3

function okrenuto(arr) {
  arr_upside_down = [];
  for (var i = arr.length; i > 0; i--) {
    arr_upside_down.push(arr[i - 1]);
  }
  return arr_upside_down;
}
//pokušaj necega neuspjeli
//var a=[]
//var x=prompt("upisi duzinu polja")
//for(var i =0;i<x;i++){
//  a.push(prompt(`upisite ${i+1} broj`))
//}
var a = [3, 4, 5, 6];
console.log(okrenuto(a));
