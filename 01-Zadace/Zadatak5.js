//Napiši funkciju kojoj se predaje string, te ona ispisuje bez razmaka svaku rijec velikim slovom (cammelCase)
//spis : “web apps vjezbe” -> “webAppsVjezbe

function cammelCase(str) {
  var zavrsni_string = "";
  for (var i = 0; i < str.length; i++) {
    console.log(i);
    if (!(str[i] == " ")) {
      console.log("xxx");
      if (str[i - 1] == " " || i == 0) {
        zavrsni_string += str[i].toUpperCase();
      } else {
        zavrsni_string += str[i];
      }
    }
  }
  return zavrsni_string;
}

console.log(cammelCase("web apps vjezbe"));
