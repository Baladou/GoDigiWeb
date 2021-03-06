import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
// import { register } from "./UserFunctions";
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      // first_name: "",
      username: "",
      email: "",
      password: "",
      telephone: "",
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.register = this.register.bind(this);
  }

  register = (newUser) => {
   
     return axios
       .post(
         "http://localhost:9191/oauth/users",
         {
           username: newUser.username,
           email: newUser.email,
           password: newUser.password,
           telephone: newUser.telephone,
         },
         {
           headers: {
             // "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
             Accept: "application/json",
             //Authorization: myToken,
             "Access-Control-Allow-Origin": "*"
           },
         }
       )
       .then((res) => {

        console.log(this.username);
        
         this.props.history.push("login");

         Swal.fire({
           title: "Compte créé",
           text:
             "Votre compte a été créé avec succès. Connectez-vous avce l'adresse mail ou le numéro renseignés",
           icon: "success",
           width: 400,
           heightAuto: false,
           confirmButtonColor: "#7fad39",

           confirmButtonText: "Ok!",
         });

   });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true }, () => {
    const user = {
      // first_name: this.state.first_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      telephone: this.state.telephone,
    };
    this.register(user)
      .then((res) => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
        Swal.fire({
          /* title: "Erreur de connection",*/
          text: "Email déjà existant",
          icon: "error",
          width: 400,
          heightAuto: false,
          confirmButtonColor: "#7fad39",

          confirmButtonText: "Ok!",
        });
      });
  });
  }
  render() {
     const { loading } = this.state;
    return (
      <div>
        <div className="contact-form spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
            <form action="#" className="text-center" onSubmit={this.onSubmit}>
              <center>
                {" "}
                <div
                  id="loginStyle"
                  className="row col-lg-6 col-md-6 text-center shoping__checkout"
                >
                  <div className="col-lg-12 col-md-12">
                    <center>
                      {" "}
                      <br /> <h2 className="text-center">S'inscrire</h2>
                    </center>
                    <br />{" "}
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="text"
                      placeholder="Nom d'utilisateur*"
                      name="username"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="email"
                      placeholder="Email*"
                      name="email"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    {/*  <input
                      type="text"
                      placeholder="Numéro de téléphone*"
                      onChange={this.onChange}
                      name="telephone"
                      pattern="(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}"
                      required
                    />
                    */}
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="password"
                      placeholder="Mot de passe*"
                      name="password"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <input
                      type="password"
                      placeholder="Confirmer Mot de passe*"
                      name="password"
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <br></br>
                  <div className="col-lg-12 text-center">
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
                          height="50"
                          width="50"
                        />
                      </div>
                    ) : (
                      <button type="submit" className="site-btn">
                        S'inscrire
                      </button>
                    )}
                    <br />
                    <br />
                    <i className="text-right">(*) Champs obligatoires</i>
                  </div>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default SignUp;
