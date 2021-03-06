import React, { Component } from "react";

import Swal from "sweetalert2";
import axios from "axios";
import Loader from "react-loader-spinner";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      login: "",
      password: "",
      redirect: true,
      loading : false,
     // timeConnexion: new(Date),
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("myToken");
    localStorage.removeItem("expiredTimeToken");
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      login: this.state.login,
      password: this.state.password,
    };

    this.setState({ loading: true }, () => {
    axios
      .post("http://127.0.0.1:8000/api/login", user)
      .then((res) => {
        console.log(res.data.success.token.token.user_id);
        localStorage.setItem("usertoken", res.data.success.token.token.user_id);
        localStorage.setItem("myToken", res.data.success.token.accessToken);
        localStorage.setItem(
          "expiredTimeToken",
          res.data.success.token.token.expires_at
        );

        // return res.data.success.token;
        this.props.history.push("/ToutesLesAnnonces");
        window.location.reload();
        this.setState({loading:false});
        // else
        //   alert("Email or password was incorrect.");
        // this.props.history.push("/login");
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
        Swal.fire({
         /* title: "Erreur de connection",*/
          text: "Votre email ou mot de passe est incorrect",
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
      <div className="text-center">
        <div className="contact-form spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
            <centre>
              <form
                action="#"
                className="text-center"
                noValidate
                onSubmit={this.onSubmit}
              >
                <center>
                  {" "}
                  <div
                    id="loginStyle"
                    className="row col-lg-6 col-md-6 text-center shoping__checkout"
                  >
                    <div className="col-lg-12 col-md-12">
                      <center>
                        {" "}
                        <br /> <h2 className="text-center">Se connecter</h2>
                      </center>
                      <br />
                      <br />{" "}
                      <div className="row">
                        <div id="LoginIcon" className="col-lg-1 col-md-1">
                          <p></p>
                          <span class="symbol-input100">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                          </span>{" "}
                        </div>
                        <div id="LoginIcon" className="col-lg-11 col-md-11">
                          <input
                            type="text"
                            placeholder="Email "
                            aria-hidden="true"
                            name="login"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <p></p>
                      <div className="row">
                        <div id="LoginIcon" className="col-lg-1 col-md-1">
                          <p></p>
                          <span class="symbol-input100">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                          </span>{" "}
                        </div>
                        <div id="LoginIcon" className="col-lg-11 col-md-11">
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <p></p>
                    </div>
                    <p></p>
                    <div className="col-lg-12 text-center">
                      <p></p>
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
                        <div className="col-lg-12 text-center">
                          <button type="submit" className="site-btn1">
                            Se connecter
                          </button>
                        </div>
                      )}
                      <p></p>
                    </div>
                    <div className="col-lg-12 text-center">
                      <a type="submit" href="/register" className="site-btn1">
                        S'inscrire
                      </a>
                    </div>
                    <div>
                      <br />
                      <i className="text-right">
                        Mot de passe oublié ? Vous pouvez créer un nouveau.{" "}
                      </i>

                      <a type="submit" href="/changePassword">
                        Réinitialiser
                      </a>
                    </div>
                  </div>
                </center>
              </form>
            </centre>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
