// broj izmedu 100 i 150000

function doseg(broj) {
  if (broj > 100 && broj < 150000) {
    return `broj ${broj} je unutar [100,150000]`;
  } else {
    return `broj ${broj} nije unutar [100,150000]`;
  }
}
var unos = prompt("upisite broj da vidite dali je u rangeu");
console.log(doseg(unos));
