import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Profile extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Eleveurs: [],
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      eleveursPerPage: 2,
      // Annonces:[],
      redirect: false,
    };
    this.paginate = this.paginate.bind(this);
  }

  componentDidMount() {
     const myToken = `Bearer ` + localStorage.getItem("myToken");
    axios
      .get("http://127.0.0.1:8000/api/eleveurs", {
        headers: {
          // "x-access-token": token, // the token is a variable which holds the token
           
        },
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          Eleveurs: res.data,
        });

        const elv = this.state.Eleveurs.filter(
          (Eleveurs) => Eleveurs.Especes !== undefined
        );
        console.log(this.state.Eleveurs);
        const pageNumbers = [];
        for (
          let i = 1;
          i <=
          Math.ceil(elv.length / this.state.eleveursPerPage);
          i++
        ) {
          pageNumbers.push(i);
        }
        this.setState({ nombrePages: pageNumbers });
      });
  }
  
  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    var elv = this.state.Eleveurs.filter(
      (Eleveurs) => Eleveurs.Especes!== undefined
    );

    const indexOfLastEleveur =
      this.state.currentPage * this.state.eleveursPerPage;
    const indexOfFirstEleveur =
      indexOfLastEleveur - this.state.eleveursPerPage;
    const currentEleveurs = elv.slice(
      indexOfFirstEleveur,
      indexOfLastEleveur
    );
    console.log(elv);
    return (
      <div>
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-log-4 cl-md-6">
                <div>
                  <img id="styleProfileImage" src="Images/Eleveur.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-8 col-md-6">
                <br></br>
                <br></br>
                <h3>ADAMOU FODI Salah</h3>
                <br></br>
                <div>
                  <p>UERNAME: solahfodi</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 col-md-7">
                <div className="filter__item">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="filter__found text-left">
                        <h3>DETAILS DU COMPTE </h3>
                        <br></br>
                        <div className="row">
                          <div className="col-lg-2 col-md-2"> UERNAME : </div>
                          <div className="col-lg-8 col-md-8"> solahfodi </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2 col-md-2"> EMAIL : </div>
                          <div className="col-lg-8 col-md-8">
                            {" "}
                            solahfodi@gmail.com{" "}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-2 col-md-2"> MOBILE : </div>
                          <div className="col-lg-8 col-md-8"> 0602843034 </div>
                        </div>
                        <br></br>
                        <br></br>
                        <a type="submit" href="/ModifierProfile" className="site-btn1">
                          Modifier Profil
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<!-- Sheeps Grid Section Begin --> */}
                <div class="row">
                  {currentEleveurs.map((Eleveurs) => (
                    <div class="col-lg-3 col-md-6 col-sm-6">
                      <div id="styleEleveur" class="product__item">
                        <div
                          class="product__item__pic set-bg"
                          // data-setbg="Images/Eleveur.jpg"
                        >
                          <br></br>
                          <center>
                            <img
                              id="imageRleveur"
                              src="Images/profilEleveur.jpg"
                              className="product__item__pic set-bg"
                            />
                          </center>
                          <ul class="product__item__pic__hover">
                            <Link
                              key={Eleveurs._id}
                              to={{
                                pathname: "/HomeSheepsParEleveur",
                                state: {
                                  id: {
                                    id: Eleveurs._id,
                                    nom: Eleveurs.nom,
                                    prenom: Eleveurs.prenom,
                                  },
                                },
                              }}
                              // id={Eleveurs._id}
                            >
                              <li>
                                <a href="ToutesLesAnnoncesElveur">
                                  {" "}
                                  <i class="fa fa-eye"></i>{" "}
                                </a>
                              </li>
                            </Link>
                          </ul>
                        </div>
                        <br></br>
                        <div id="txteFormat" class="product__item__text">
                          <p>{Eleveurs.prenom + "         " + Eleveurs.nom}</p>
                          <h6>{"         " + Eleveurs.adresse}</h6>
                          <p>
                            {"         " + Eleveurs.Especes.length + " "}
                            bêtes
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <br></br>

                <div className="center-div">
                  <nav className="row">
                    <ul className="pagination center-div">
                      {this.state.nombrePages.map((number) => (
                        <li key={number} className="page-item stylePagination">
                          <a
                            onClick={() => this.paginate(number)}
                            className="page-link"
                          >
                            {number}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <br></br>
                {/* <!-- Sheeps Grid Section End --> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default Profile;
