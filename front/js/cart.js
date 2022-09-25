const page = document.location.href;
// Récupération des produits de l'api

// appel de la ressource api product (voir script.js) si on est sur la page panier
if (page.match("cart")) {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((objetProduits) => {
          console.log(objetProduits);
          // appel de la fonction affichagePanier
          affichagePanier(objetProduits);
      })
      .catch((err) => {
          document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
          console.log("erreur 404, sur ressource api: " + err);
      });
    } else {
      console.log("sur page confirmation");
    }


// Fonction détermine les conditions d'affichage des produits du panier

function affichagePanier(index) {
  
    let panier = JSON.parse(localStorage.getItem("panierStocké"));
     if (panier && panier.length != 0) {
      for (let choix of panier) {
        console.log(choix);
        for (let g = 0, h = index.length; g < h; g++) {
          if (choix._id === index[g]._id) {
            choix.name = index[g].name;
            choix.prix = index[g].price;
            choix.image = index[g].imageUrl;
            choix.description = index[g].description;
            choix.alt = index[g].altTxt;
          }
        }
      }
      affiche(panier);
    } else {
      document.querySelector("#totalQuantity").innerHTML = "0";
      document.querySelector("#totalPrice").innerHTML = "0";
      document.querySelector("h1").innerHTML =
        "Vous n'avez pas d'article dans votre panier";
    }
    modifQuantité();
    suppression();
  }
  
  //Fonction d'affichage panier (tableau)

  function affiche(indexé) {
    let zonePanier = document.querySelector("#cart__items");
    zonePanier.innerHTML += indexé.map((choix) => 
    `<article class="cart__item" data-id="${choix._id}" data-couleur="${choix.couleur}" data-quantité="${choix.quantité}" data-prix="${choix.prix}"> 
      <div class="cart__item__img">
        <img src="${choix.image}" alt="${choix.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${choix.name}</h2>
          <span>couleur : ${choix.couleur}</span>
          <p data-prix="${choix.prix}">${choix.prix} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choix.quantité}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${choix._id}" data-couleur="${choix.couleur}">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
      ).join(""); 

    totalProduit();
  }

  

// fonction modifQuantité on modifie dynamiquement les quantités du panier

function modifQuantité() {
    const cart = document.querySelectorAll(".cart__item");
    cart.forEach((cart) => {
      cart.addEventListener("change", (eq) => {
        // vérification d'information dans les articles
        let panier = JSON.parse(localStorage.getItem("panierStocké"));
        // boucle pour modifier la quantité du produit du panier grace 
        for (article of panier)
          if (
            article._id === cart.dataset.id &&
            cart.dataset.couleur === article.couleur
          ) {
            article.quantité = eq.target.value;
            localStorage.panierStocké = JSON.stringify(panier);
            // on met à jour 
            cart.dataset.quantité = eq.target.value;
            totalProduit();
          }
      });
    });
  }

  // fonction supression d'un article dynamiquement du panier 
  
  function suppression() {
    
    const cartdelete = document.querySelectorAll(".cart__item .deleteItem");
    cartdelete.forEach((cartdelete) => {
      cartdelete.addEventListener("click", () => {
        // appel local storage
        let panier = JSON.parse(localStorage.getItem("panierStocké"));
        for (let d = 0, c = panier.length; d < c; d++)
          if (
            panier[d]._id === cartdelete.dataset.id &&
            panier[d].couleur === cartdelete.dataset.couleur
          ) {
            // déclaration pour la suppression
            const num = [d];
            // création d'un tableau miroir
            let nouveauPanier = JSON.parse(localStorage.getItem("panierStocké"));
            //suppression de 1 élément 
            nouveauPanier.splice(num, 1);
            //affichage informatif
            if (nouveauPanier && nouveauPanier.length == 0) {
              document.querySelector("#totalQuantity").innerHTML = "0";
              document.querySelector("#totalPrice").innerHTML = "0";
              document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
            }
            // panier converti dans le localStorage
            localStorage.panierStocké = JSON.stringify(nouveauPanier);
            totalProduit(); 
            return location.reload();
          }
      });
    });
  }

  // fonction ajout nombre total produit et coût total

function totalProduit() {

  let totalArticle = 0;
  let totalPrix = 0;

  const cart = document.querySelectorAll(".cart__item");
  cart.forEach((cart) => {
    totalArticle += JSON.parse(cart.dataset.quantité);
    totalPrix += cart.dataset.quantité * cart.dataset.prix;
  });
  
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrix;
}

//  formulaire
// les données seront stockées dans ce tableau pour la commande sur page panier
if (page.match("cart")) {
  var contactClient = {};
  localStorage.contactClient = JSON.stringify(contactClient);

  var prenom = document.querySelector("#firstName");
  prenom.classList.add("regex_texte");
  var nom = document.querySelector("#lastName");
  nom.classList.add("regex_texte");
  var ville = document.querySelector("#city");
  ville.classList.add("regex_texte");
  var adresse = document.querySelector("#address");
  adresse.classList.add("regex_adresse");
  var email = document.querySelector("#email");
  email.classList.add("regex_email");
  var regexTexte = document.querySelectorAll(".regex_texte"); 
  document.querySelector("#email").setAttribute("type", "text");
}

//regex 
let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;
let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex

if (page.match("cart")) {
  regexTexte.forEach((regexTexte) =>
    regexTexte.addEventListener("input", (e) => {
      // la valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      // le regNormal sera la valeur de la réponse regex, 0 ou -1
      let regNormal = valeur.search(regexLettre);
      if (regNormal === 0) {
        contactClient.firstName = prenom.value;
        contactClient.lastName = nom.value;
        contactClient.city = ville.value;
      }
      if (
        contactClient.city !== "" &&
        contactClient.lastName !== "" &&
        contactClient.firstName !== "" &&
        regNormal === 0
      ) {
        contactClient.regexNormal = 3;
      } else {
        contactClient.regexNormal = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regNormal, valeur, regexTexte);
      valideClic();
    })
  );
  }
// le champ écouté via la regex regexLettre fera réagir, grâce à texteInfo

texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
texteInfo(regexLettre, "#lastNameErrorMsg", nom);
texteInfo(regexLettre, "#cityErrorMsg", ville);

// attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex

if (page.match("cart")) {
  let regexAdresse = document.querySelector(".regex_adresse");
  regexAdresse.addEventListener("input", (e) => {
    // valeur sera la valeur de l'input en dynamique
    valeur = e.target.value;
    // regNormal sera la valeur de la réponse regex, 0 ou -1
    let regAdresse = valeur.search(regexChiffreLettre);
    if (regAdresse == 0) {
      contactClient.address = adresse.value;
    }
    if (contactClient.address !== "" && regAdresse === 0) {
      contactClient.regexAdresse = 1;
    } else {
      contactClient.regexAdresse = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regAdresse, valeur, regexAdresse);
    valideClic();
  });
}

// le champ écouté via la regex regexChiffreLettre fera réagir, grâce à texteInfo

texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);

// attribution de point(pour sécurité du clic) si ce champ est ok d'après les regex

if (page.match("cart")) {
  let regexEmail = document.querySelector(".regex_email");
  regexEmail.addEventListener("input", (e) => {
    // valeur sera la valeur de l'input en dynamique
    valeur = e.target.value;
    
    let regMatch = valeur.match(regMatchEmail);
    // quand le resultat sera correct, le console log affichera une autre réponse que null; regValide sera la valeur de la réponse regex, 0 ou -1
    let regValide = valeur.search(regValideEmail);
    if (regValide === 0 && regMatch !== null) {
      contactClient.email = email.value;
      contactClient.regexEmail = 1;
    } else {
      contactClient.regexEmail = 0;
    }
    localStorage.contactClient = JSON.stringify(contactClient);
    couleurRegex(regValide, valeur, regexEmail);
    valideClic();
  });
}

// texte sous champ email

if (page.match("cart")) {
  email.addEventListener("input", (e) => {
    
    valeur = e.target.value;
    let regMatch = valeur.match(regMatchEmail);
    let regValide = valeur.search(regValideEmail);
    // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
    if (valeur === "" && regMatch === null) {
      document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
      document.querySelector("#emailErrorMsg").style.color = "white";
      // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
    } else if ( regValide !== 0) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
      document.querySelector("#emailErrorMsg").style.color = "white";
      // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
    } else if (valeur != "" && regMatch == null) {
      document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
      document.querySelector("#emailErrorMsg").style.color = "white";
    } else {
      document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
      document.querySelector("#emailErrorMsg").style.color = "white";
    }
  });
}

// fonction couleurRegex qui modifira la couleur de l'input par remplissage tapé, aide visuelle et accessibilité

let valeurEcoute = "";
// fonction réutilisable, la regex, la valeur d'écoute, et la réponse à l'écoute
function couleurRegex(regSearch, valeurEcoute, inputAction) {
 
  if (valeurEcoute === "" && regSearch != 0) {
    inputAction.style.backgroundColor = "white";
    inputAction.style.color = "black";
    
  } else if (valeurEcoute !== "" && regSearch != 0) {
    inputAction.style.backgroundColor = "rgb(220, 50, 50)";
    inputAction.style.color = "white";
    
  } else {
    inputAction.style.backgroundColor = "rgb(0, 138, 0)";
    inputAction.style.color = "white";
  }
}

// fonction d'affichage individuel des paragraphes sous input sauf pour l'input email

function texteInfo(regex, pointage, zoneEcoute) {
      if (page.match("cart")) {
      zoneEcoute.addEventListener("input", (e) => {
      valeur = e.target.value;
      index = valeur.search(regex);
    
      if (valeur === "" && index != 0) {
        document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
        document.querySelector(pointage).style.color = "white";
        
      } else if (valeur !== "" && index != 0) {
        document.querySelector(pointage).innerHTML = "Reformulez cette donnée";
        document.querySelector(pointage).style.color = "white";
        
      } else {
      document.querySelector(pointage).innerHTML = "Caratères acceptés pour ce champ.";
      document.querySelector(pointage).style.color = "white";
      }
    });
  }
}