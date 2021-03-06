import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import Loader from "react-loader-spinner";

class ModifierProfile extends Component {
  constructor() {
    super();
    // let redirect = false;
    this.state = {
      Annonces: [],
      loading: true,

      /* AnnoncesPage: [],
      offset: 0,
      data: [],
      elements: [],
      perPage: 3,
      currentPage: 0,*/
      longueur: 0,
      activePage: 1,
      nombrePages: [],
      currentPage: 1,
      annoncesPerPage: 6,
      Disabled: false,
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
        // statut: "disponible",
        order_by: "race",
        order_mode: "asc",
      },
      redirect: false,
      selectedOptionSort: null,
      optionsSort: [
        { value: null, label: "Options de tri" },
        { value: "created_at", label: "Date plus récent" },
        { value: "disponible", label: "Bêtes disponibles" },
        { value: "réservé", label: "Bêtes réservées" },

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
    this.handelChercher = this.handelChercher.bind(this);
    this.paginate = this.paginate.bind(this);
    this.sortData = this.sortData.bind(this);
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
    // const ide = this.props.location.state.id;
    this.setState({ loading: true }, () => {
      axios
        .get("http://127.0.0.1:8000/api/Espece", {
          headers: {
            // "x-access-token": token, // the token is a variable which holds the token
          },
          params: {
            
            // statut: "disponible",
            order_by: "race",
            order_mode: "asc",
          },
        })
        .then((res) => {
          this.setState({
            Annonces: res.data,
            loading: false,
            /* pageCount: Math.ceil(res.data.length / this.state.perPage),*/
          });
          /*this.setElementsForCurrentPage();*/
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
        this.setState({ Annonces: sorted, loading: false });
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
    } else if (sortProperty === "created_at") {
      this.setState({ loading: true }, () => {
        sorted.sort(function (a, b) {
          console.log(a[sortProperty]);
          console.log(new Date(a[sortProperty]));
          return new Date(b[sortProperty]) - new Date(a[sortProperty]);
        });
        this.setState({ Annonces: sorted, loading: false });
      });
    } else if (sortProperty === "réservé") {
      this.setState({ loading: true }, () => {
        axios
          .get("http://127.0.0.1:8000/api/Espece", {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
            },
            params: {
              id_eleveur: this.props.location.state.id.id,
              statut: "réservé",
              order_by: "race",
              order_mode: "asc",
            },
          })
          .then((res) => {
            this.setState({
              Annonces: res.data,
              loading: false,
              /* pageCount: Math.ceil(res.data.length / this.state.perPage),*/
            });
            /*this.setElementsForCurrentPage();*/
            console.log(this.state.Annonces);
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
    } else if (sortProperty === "disponible") {
      this.setState({ loading: true }, () => {
        axios
          .get("http://127.0.0.1:8000/api/Espece", {
            headers: {
              // "x-access-token": token, // the token is a variable which holds the token
            },
            params: {
              id_eleveur: this.props.location.state.id.id,
              statut: "disponible",
              order_by: "race",
              order_mode: "asc",
            },
          })
          .then((res) => {
            this.setState({
              Annonces: res.data,
              loading: false,
              /* pageCount: Math.ceil(res.data.length / this.state.perPage),*/
            });
            /*this.setElementsForCurrentPage();*/
            console.log(this.state.Annonces);
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

    console.log(this.state.Annonces);
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  /* setElementsForCurrentPage() {
    let elements = this.state.Annonces.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({ AnnoncesPage: elements });
  }

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };
*/
  onChange(e) {
    const n = e.target.name,
      v = e.target.value;

    this.setState({
      conditions: Object.assign(this.state.conditions, { [n]: v }),
    });
  }

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
            loading: false,
          });
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

  annonceVision(a) {
    if (a.race === undefined) {
      return " ";
    } else return a.race;
  }

  render() {
    /* let paginationElement;
    if (this.state.pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Préc"}
          nextLabel={"Suiv →"}
          breakLabel={<span className="gap">...</span>}
          pageCount={this.state.pageCount}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }*/
    const indexOfLastAnnonce =
      this.state.currentPage * this.state.annoncesPerPage;
    const indexOfFirstAnnonce = indexOfLastAnnonce - this.state.annoncesPerPage;
    const currentAnnonces = this.state.Annonces.slice(
      indexOfFirstAnnonce,
      indexOfLastAnnonce
    );
    const { selectedOptionCategorie } = this.state;
    const { optionsCategorie } = this.state;
    const { selectedOptionRace } = this.state;
    const { optionsRace } = this.state;
    const { selectedOptionVille } = this.state;
    const { optionsVille } = this.state;
    const { optionsSort } = this.state;
    const { loading } = this.state;
    var reserv = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "réservé"
    );
    var dispo = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "disponible"
    );
    var vendu = this.state.Annonces.filter(
      (Annonces) => Annonces.statut == "vendu"
    );
    return (
      <div>
        <section className="">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div id="rechercher" className="col-lg-12">
                  <br></br>
                  <br></br>
                  <div className="sidebar__item">
                    <h4>Modifier le Profil</h4>

                    <h6 id="gras" className="latest-product__item">
                      Username
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="text"
                          class="form-control"
                          placeholder=" Budget min"
                          name="username"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      Old Password
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="password"
                          class="form-control"
                          placeholder="************"
                          name="password_o"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      New Password
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="password"
                          class="form-control"
                          placeholder="************"
                          name="password_n"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      Email
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="email"
                          class="form-control"
                          placeholder=" email"
                          name="prix_max"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <br></br>

                    <h6 id="gras" className="latest-product__item">
                      Telephone
                    </h6>
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <input
                          id="recherchePlace"
                          type="number"
                          class="form-control"
                          placeholder=" Poids min"
                          name="Telephone"
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    
                    <br></br>

              
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        {/* <button className="btn btn-success" onClick={this.handelChercher}> Rechercher </button><br/> */}
                        <button
                          id="roundB"
                          className="newBtn site-btn"
                          onClick={this.handelChercher}
                        >
                          {" "}
                          Modifier{" "}
                        </button>
                        <br></br>
                        <br></br>
                      </div>
                    </div>

                    {/* <label className="latest-product__item">
                      <input name="withImages" type="checkbox" /> Avec photos
                    </label> */}

                    {/* <label className="latest-product__item">
                      <input name="withVideos" type="checkbox" /> Avec video
                    </label> */}
                  </div>
                </div>
              </div>

              <div className="col-lg-9 col-md-7">
                <div className="filter__item">
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
                  <br></br>

                  <div className="row">
                    <div className="col-lg-4 col-md-5"></div>
                    <div className="col-lg-12 col-md-12">
                      
                      <br />
                      <div className="filter__found text-left">
                        <h6>
                          
                          Têtes de moutons au total
                        </h6>
                        <br />
                      </div>
                      <h6 id="centrerT">
                        
                      </h6>
                    </div>
                  </div>
                </div>

                {/*<!-- Sheeps Grid Section Begin --> */}
                <div>
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
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            
                             
                          </div>
                        ))}
                      </div>

                      <div className="center-div">
                        <nav className="row">
                          <ul className="pagination center-div">
                            
                          </ul>
                        </nav>
                      </div>
                      <br></br>
                    </div>
                  )}
                </div>

                {/*paginationElement*/}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ModifierProfile;
