import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { FacebookProvider, Like, ShareButton, MessageUs } from "react-facebook";

class HomeSheeps extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      loading : true,
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      annoncesPerPage: 6,
      Disabled: false,
      Annonces: [],
      selectedOptionRace: null,
      optionsRace: [
        { value: "Sardi", label: "Sardi" },
        { value: "Bargui", label: "Bargui" },
      ],
      selectedOptionCategorie: null,
      optionsCategorie: [
        { value: "mouton", label: "Mouton" },
        { value: "vache", label: "Vache" },
        { value: "chevre", label: "Chèvre" },
      ],
      selectedOptionVille: null,
      optionsVille: [
        { value: "Berkane", label: "Berkane" },
        { value: "Driouch", label: "Driouch" },
        { value: "Figuig", label: "Figuig" },
        { value: "Guercif", label: "Guercif" },
        { value: "Jerada", label: "Jerada" },
        { value: "Nador", label: "Nador" },
        { value: "Oujda-Angad", label: "Oujda-Angad" },
        { value: "Taourirt", label: "Taourirt" },
        { value: "Ahfir", label: "Ahfir" },
        { value: "Saida", label: "Saidia" },
        { value: "Tafoughalt", label: "Tafoughalt" },
      ],
      conditions: {
        statut: "disponible",
        order_by: "categorie",
        order_mode: "asc",
      },
      redirect: false,

      selectedOptionSort: null,
      optionsSort: [
        { value: null, label: "Options de tri" },
        { value: "created_at", label: "Date plus récent" },

        { value: "prix", label: "Prix croissant" },
        { value: "prix_dec", label: "Prix décroissant" },

        { value: "poids", label: "Poids croissant" },

        { value: "poids_dec", label: "Poids décroissant" },

        /*   { value: "age", label: "Date descendante" },
        { value: "prix", label: "Prix descendante" },
        { value: "poids", label: "Poids descendante" }, */
      ],
    };

    this.onChange = this.onChange.bind(this);
    this.handleChangeCategorie = this.handleChangeCategorie.bind(this);
    this.handelChercher = this.handelChercher.bind(this);
    this.sortData = this.sortData.bind(this);

    this.paginate = this.paginate.bind(this);
    // this.handleFavoris=this.handleFavoris.bind(this)
  }

  handleChangeCategorie = (selectedOptionCategorie) => {
    if (selectedOptionCategorie.value != "mouton") {
      this.setState({
        selectedOptionRace: null,
        conditions: Object.assign(this.state.conditions, {
          race: null,
        }),
        Disabled: true,
      });
      console.log(this.state.selectedOptionRace);
    } else
      this.setState({
        Disabled: false,
      });
    this.setState({ selectedOptionCategorie }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          categorie: this.state.selectedOptionCategorie.value,
        }),
      })
    );
  };

  handleChangeRace = (selectedOptionRace) => {
    this.setState({ selectedOptionRace }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          race: this.state.selectedOptionRace.value,
        }),
      })
    );
  };

  handleChangeSort = (selectedOptionSort) => {
    this.setState({ selectedOptionSort }, () =>
      this.setState({
        selectedOptionSort: selectedOptionSort,
      })
    );
  };

  handleChangeVille = (selectedOptionVille) => {
    this.setState({ selectedOptionVille }, () =>
      this.setState({
        conditions: Object.assign(this.state.conditions, {
          localisation: this.state.selectedOptionVille.value,
        }),
      })
    );
  };

  componentDidMount() {
    // const myToken = `Bearer ` + localStorage.getItem("myToken");
    const token = localStorage.getItem("usertoken");
    // if (!token) {
    //   this.props.history.push("/login");
    // } else {
    //   console.log(token)
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            // Accept: "application/json",
            // Authorization: myToken,
          },
          params: {
            statut: "disponible",
            order_by: "categorie",
            order_mode: "asc",
          },
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
            loading: false,
          });
          console.log(this.state.Annonces);
          const pageNumbers = [];
          for (
            let i = 1;
            i <=
            Math.ceil(this.state.Annonces.length / this.state.annoncesPerPage);
            i++
          ) {
            pageNumbers.push(i);
          }
          this.setState({ nombrePages: pageNumbers });
        });
    });
  }

  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
  }

  sortData(e) {
    //this.setState({ selectedOptionSort: Object.values(e)[0] });
    //console.log(this.state.selectedOptionSort);
    console.log(Object.values(e)[0]);
    // console.log( (Object.values(e)[0]).getFullYear());
    // created_date.getTime();
    const sortProperty = Object.values(e)[0];
    const sorted = this.state.Annonces;
    if (sortProperty === "prix" || sortProperty === "poids") { 
      this.setState({ loading: true }, () => {
      sorted.sort((a, b) => a[sortProperty] - b[sortProperty]);
      this.setState({ Annonces: sorted,
      loading : false });
    });
    } else if (sortProperty === "prix_dec") {
      const sort_ = "prix";
      this.setState({ loading: true }, () => {
      sorted.sort((a, b) => b[sort_] - a[sort_]);
      this.setState({ Annonces: sorted, loading: false });
      });
    } else if (sortProperty === "poids_dec") {
      const sort_ = "poids";
      this.setState({ loading: true }, () => {
      sorted.sort((a, b) => b[sort_] - a[sort_]);
      this.setState({ Annonces: sorted, loading: false });
      });
    } else {
      console.log(sortProperty);
      this.setState({ loading: true }, () => {
      sorted.sort(
        function(a, b){
          console.log(a[sortProperty]);
          console.log(new Date (a[sortProperty]));
         return new Date(b[sortProperty]) - new Date(a[sortProperty]);
        } );
      this.setState({ Annonces: sorted, loading: false });
      });
    }
    console.log(this.state.Annonces);
  }

  /* handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }*/

  handelChercher() {
   this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
            "Content-Type": "application/json",
          },
          params: this.state.conditions,
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
            loading : false,
          });
                const pageNumbers = [];
                for (
                  let i = 1;
                  i <=
                  Math.ceil(
                    this.state.Annonces.length / this.state.annoncesPerPage
                  );
                  i++
                ) {
                  pageNumbers.push(i);
                }
                this.setState({ nombrePages: pageNumbers });
        });
       });
  }

  annonceVision(a) {
    if (a.race === undefined) {
      return " ";
    } else return a.race;
  }
  // handleFavoris(Mid) {
  //   console.log(Mid);
  //   const token = localStorage.getItem("usertoken");
  //   if (!token) {
  //     this.props.history.push("/login");
  //   } else {
  //     // console.log(token);
  //     axios
  //       .put(
  //         "http://127.0.0.1:8000/api/consommateur/" + token + "/favoris",{ id_mouton: Mid }

  //        , {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }

  //       )
  //       .then((res) => {});
  //   }
  // }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const indexOfLastAnnonce =
      this.state.currentPage * this.state.annoncesPerPage;
    const indexOfFirstAnnonce = indexOfLastAnnonce - this.state.annoncesPerPage;
    const currentAnnonces = this.state.Annonces.slice(
      indexOfFirstAnnonce,
      indexOfLastAnnonce
    );
    const { selectedOptionRace } = this.state;
    const { selectedOptionSort } = this.state;
    const { optionsRace } = this.state;
    const { selectedOptionCategorie } = this.state;
    const { optionsCategorie } = this.state;
    const { selectedOptionVille } = this.state;
    const { optionsVille } = this.state;
    const { optionsSort } = this.state;
    const {loading} = this.state;
    return (
      <div>
        {/* <!-- Page Preloder --> */}
        {/* <div id="preloder">
          <div className="loader"></div>
        </div> */}

        <section className="">
          <br></br>

          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div id="rechercher" className="col-lg-12">
                  <br></br>
                  <div className="sidebar__item">
                    <h6 id="gras" className="latest-product__item">
                      <a id="Accbar" href="./Description">
                        Description DIGIWEB
                      </a>
                    </h6>

                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      <a id="Accbar" href="./Description">
                        Profile
                      </a>
                    </h6>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      <a id="Accbar" href="./HomeEleveur">
                        Créer Discussion
                      </a>
                    </h6>

                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      <a id="Accbar" href="./Description">
                        Profile
                      </a>
                    </h6>

                    <br></br>

                    

                    {/* <label className="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label> */}

                    {/* <label className="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12 ">
                <div id="centrerT" className="container">
                  <div>
                    <textarea
                      id="recherchePlace"
                      name="Publication"
                      cols="40"
                      rows="3"
                      type="text"
                      class="form-control"
                      placeholder=" Share something"
                      onChange={this.onChange}
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-lg-1 col-md-1">
                      <i id="like" class="fas fa-images icon-cog fa-2x"></i>
                    </div>
                    <div className="col-lg-4 col-md-4" id="centreT">
                      <input
                        type="file"
                        name="Image"
                        id="roundB"
                        onChange={this.handleChangeImage}
                        encType="multipart/form-data"
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-10 col-md-10"></div>
                    <div className="col-lg-2 col-md-2">
                      <i id="share" class="fas fa-share icon-cog fa-2x">
                        {" "}
                        <h6> Publier</h6>{" "}
                      </i>
                    </div>
                  </div>
                </div>

                <div className="filter__item">
                  {/** 
                  <div>
                    <div id="filterPlace" className="col-lg-5 col-md-5 fa ">
                      <Select
                        id="filterPlace"
                        value={this.state.selectedOptionSort}
                        onChange={this.sortData}
                        options={optionsSort}
                        placeholder="&#xf161;"
                        //
                        //f0b0

                        // className="Select"
                      />
                    </div>
                  </div>
                  */}

                  <br></br>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="filter__found text-left">
                        <h3>Fil d'Actualités</h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}
                <div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div id="anonce" class="product__item">
                      <div className="row">
                        <div className="col-lg-2 col-md-2">
                          <div>
                            <img
                              id="stylePostImage"
                              src="Images/Eleveur.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-10">
                          <br></br>
                          <h5>ADAMOU FODI Salah</h5>
                          <br></br>
                        </div>
                      </div>
                      <div
                        class="product__item__pic set-bg"

                        // src="Images/sardi1.jpg"
                      >
                        <img
                          src="Images/Eleveur.jpg"
                          // src=Annonces.images
                          class="product__item__pic set-bg"
                        />

                        <ul class="product__item__pic__hover">
                          {/* <li>
                              <a
                                id={Annonces._id}
                                onClick={(e) =>
                                  this.handleFavoris(e.currentTarget.id)
                                }
                              >
                                <i className="fa fa-heart"></i>
                              </a>
                            </li> */}
                          <li>
                            <Link to={`/DetailsMouton/`}>
                              <a href="#">
                                <i class="fa fa-eye"></i>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div class="product__item__text">
                        <h6>HtHHG</h6>
                        <h6>ME HGDHDJN</h6>
                        <br></br>
                      </div>
                      <div className="row">
                        <div className="col-lg-1 col-md-1">
                          <i
                            id="like"
                            class="fas fa-thumbs-up icon-cog fa-2x"
                          ></i>
                        </div>
                        <div className="col-lg-9 col-md-8">
                          <input
                            id="recherchePlace"
                            type="text"
                            class="form-control"
                            placeholder="Commentez .."
                            onChange={this.onChange}
                            name="commentaire"
                          />
                        </div>
                        <div className="col-lg-1 col-md-1">
                          <i id="like" class="fas fa-comments icon-cog fa-2x">
                            {" "}
                          </i>
                        </div>
                        <div className="col-lg-1 col-md-1">
                          <i id="like" class="fas fa-share icon-cog fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/** Post Sans image */}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div id="anonce" class="product__item">
                      <div className="row">
                        <div className="col-lg-2 col-md-2">
                          <div>
                            <img
                              id="stylePostImage"
                              src="Images/Eleveur.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-10 col-md-10">
                          <br></br>
                          <h5>ADAMOU FODI Salah</h5>
                          <br></br>
                        </div>
                      </div>

                      <div class="product__item__text">
                        <h6>HtHHG</h6>
                        <h6>ME HGDHDJN</h6>
                        <br></br>
                      </div>
                      <div className="row">
                        <div className="col-lg-1 col-md-1">
                          <i
                            id="like"
                            class="fas fa-thumbs-up icon-cog fa-2x"
                          ></i>
                        </div>
                        <div className="col-lg-9 col-md-8">
                          <input
                            id="recherchePlace"
                            type="text"
                            class="form-control"
                            placeholder="Commentez .."
                            onChange={this.onChange}
                            name="commentaire"
                          />
                        </div>
                        <div className="col-lg-1 col-md-1">
                          <i id="like" class="fas fa-comments icon-cog fa-2x">
                            {" "}
                          </i>
                        </div>
                        <div className="col-lg-1 col-md-1">
                          <i id="like" class="fas fa-share icon-cog fa-2x"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/** Post */}
                  <div className="col-lg-12  col-sm-12">
                    <div id="anonce" class="product__item">
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-4 col-xs-4">
                          <div>
                            <img
                              id="stylePostImage"
                              src="Images/Eleveur.jpg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-8 col-md-6 col-sm-8 col-xs-8">
                          <br></br>
                          <h5>ADAMOU FODI Salah</h5>
                          <br></br>
                        </div>
                      </div>
                      <div
                        class="product__item__pic set-bg"

                        // src="Images/sardi1.jpg"
                      >
                        <img
                          src="Images/Eleveur.jpg"
                          // src=Annonces.images
                          class="product__item__pic set-bg"
                        />

                        <ul class="product__item__pic__hover">
                          {/* <li>
                              <a
                                id={Annonces._id}
                                onClick={(e) =>
                                  this.handleFavoris(e.currentTarget.id)
                                }
                              >
                                <i className="fa fa-heart"></i>
                              </a>
                            </li> */}
                          <li>
                            <Link to={`/DetailsMouton/`}>
                              <a href="#">
                                <i class="fa fa-eye"></i>
                              </a>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div class="product__item__text">
                        <h6>HtHHG</h6>
                        <h6>ME HGDHDJN</h6>
                        <br></br>
                      </div>
                      <div className="row">
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                          <i
                            id="like"
                            class="fas fa-thumbs-up icon-cog fa-2x"
                          ></i>
                        </div>
                        <div className="col-lg-9 col-md-8 col-sm-8 col-xs-8">
                          <input
                            id="recherchePlace"
                            type="text"
                            class="form-control"
                            placeholder="Commentez .."
                            onChange={this.onChange}
                            name="commentaire"
                          />
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                          <i id="like" class="fas fa-comments icon-cog fa-2x">
                            {" "}
                          </i>
                        </div>
                        <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                          <i id="like" class="fas fa-share icon-cog fa-2x"></i>
                        </div>
                      </div>
                      {/** Comment section */}
                      <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                          <img
                            id="styleCommentImage"
                            src="Images/Eleveur.jpg"
                            alt=""
                          />
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                          <br></br>
                          <h5>ADAMOU FODI Salah</h5>
                          <br></br>
                          <p>Je commente mon texte hhhhhhhhhhhhhhhhhhh</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {loading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader
                        type="Oval"
                        color="#7fad39"
                        height="80"
                        width="80"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="row">
                        {currentAnnonces.map((Annonces) => (
                          <div className="col-lg-4  col-sm-6">
                            <div id="anonce" class="product__item">
                              <div
                                class="product__item__pic set-bg"
                                data-setbg={Annonces.images}
                                // src="Images/sardi1.jpg"
                              >
                                <img
                                  src={Annonces.image_face}
                                  // src=Annonces.images
                                  class="product__item__pic set-bg"
                                />

                                <ul class="product__item__pic__hover">
                                  {/* <li>
                              <a
                                id={Annonces._id}
                                onClick={(e) =>
                                  this.handleFavoris(e.currentTarget.id)
                                }
                              >
                                <i className="fa fa-heart"></i>
                              </a>
                            </li> */}
                                  <li>
                                    <Link to={`/DetailsMouton/${Annonces._id}`}>
                                      <a href="#">
                                        <i class="fa fa-eye"></i>
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <div class="product__item__text">
                                <h6>{"         " + Annonces.categorie}</h6>
                                <h6>
                                  {"         " + this.annonceVision(Annonces)}
                                </h6>
                                <h6>{"         " + Annonces.poids + " Kg"}</h6>
                                <h6>{"         " + Annonces.age + " mois"}</h6>
                                <h6>{"         " + Annonces.created_at}</h6>

                                <h5 id="mad">
                                  {"         " + Annonces.prix + " MAD"}
                                </h5>
                                <br></br>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="center-div">
                        <nav className="row">
                          <ul className="pagination center-div">
                            {this.state.nombrePages.map((number) => (
                              <li
                                key={number}
                                className="page-item stylePagination"
                              >
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
                    </div>
                  )}
                  {/* <!-- Sheeps Grid Section End --> */}
                </div>
                {/* <div className="product__pagination">
                  <a href="#">1</a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">
                    <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomeSheeps;
