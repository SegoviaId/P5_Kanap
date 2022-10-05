// fonction affichage  du numéro de commande et vide du storage lorsque l'on est sur la page confirmation
const page = document.location.href;

(function Commande() {
    if (page.match("confirmation")) {
      sessionStorage.clear();
      localStorage.clear();
      // valeur du numero de commande
      let numCom = new URLSearchParams(document.location.search).get("commande");
     
      document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
      console.log("valeur de l'orderId venant de l'url: " + numCom);
      //réinitialisation du numero de commande
      numCom = undefined;
    } else {
      console.log("sur page cart");
    }
  })();
  