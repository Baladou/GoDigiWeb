import React, { Component } from "react";
import YouTube from "react-youtube";


class Description extends Component {
  render() {
    const opts = {
      height: "390",
      width: "500",
    };
    return (
      <section className="product spad">
        <div id="apropos" className="container">
          <div class="col-lg-12 col-md-6">
            <h2 id="aproposh">DIGIWEB</h2> <br></br>
            <h5 id="apropo1">
              L’ANOC (Association Nationale Ovine et Caprine) est une
              association à but non lucratif qui a pour mission principale
              l’amélioration du revenu de l’éleveur ovin et caprin ainsi que la
              valorisation de son métier, notamment dans des conditions assez
              difficiles du milieu rural. Ainsi que la contribution au
              développement économique et rural par le développement de
              l’élevage des petits ruminants et la promotion de ses produits.
            </h5>
            <br></br>
            <br></br>
            <h2 id="aproposh"> Accès en tant que visiteur anonyme </h2>{" "}
            <br></br>
            <main>
              <ol class="gradient-list">
                <li>
                  Voir une brève description de l’application dans la page
                  d'accueil.
                </li>
                <li>
                  S'inscrire en tant que nouvel utilisateur (créer un compte).
                </li>
                <li> S'authentifier.</li>
              </ol>
            </main>
            <br></br>
            <h2 id="aproposh">
              {" "}
              Accès en tant qu'utilisateur enregistré{" "}
            </h2>{" "}
            <br></br>
            <main>
              <ol class="gradient-list">
                <li>
                  Ajouter une publication sous forme de texte, image ou les
                  deux.
                </li>
                <li>
                  Ajouter de nouveaux amis (cela permettra d’accéder à leur page
                  personnelle comportant des informations sur leur profil et
                  leurs publications).
                </li>
                <li>
                  {" "}
                  Voir les publications personnelles ainsi que celles des amis
                  dans le fil d’actualité.
                </li>
                <li> Commenter une publication.</li>
                <li> Liker une publication.</li>
                <li> Faire une conversation temps réel avec un ami (chat).</li>
                <li> Modifier les informations de son profil.</li>
                <li> Se déconnecter</li>
              </ol>
            </main>
            <br></br>
          </div>
        </div>
      </section>
    );
  }
}
export default Description;
