// Récupération des produits de l'api

fetch("http://localhost:3000/api/products")
  // donne le résultat en json.
  .then((res) => res.json())
  // ce qui a été traité en json sera appelé objetProduits
  .then((objetProduits) => {
    // informations sur la console sous forme tableau
    console.table(objetProduits);
    // appel de la fonction d'affichage des produits
    lesKanaps(objetProduits);
  })
  // en cas d'une erreur remplace le h1 par erreur 404 
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });


// fonction d'affichage des produits de l'api sur la page index

function lesKanaps(index) {
  // déclaration de variable de la zone d'article
  let zoneArticle = document.querySelector("#items");
  // boucle pour chaque indice(nommé 'article') dans index
  for (let article of index) {

    // ajout des zones d'articles, insertion de l'adresse produit via chemin produit + paramètres(son id);
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>
  `;
  }
}
