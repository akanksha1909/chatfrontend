/*global FB*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router'
import maleimage from './images/male.jpg'
import notification from 'antd/lib/notification';

import config from '../../config'
import { Button } from 'antd/lib/radio';

import { login } from '../../redux/actions/auth'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                username: "",
                password: ""
            },
            facebooklogin: {
                id: "",
                accesstoken: "",
                time: Date.now()
            },
            error: "",
            redirect: false,
            revealPassword: false
        }
    }
    componentDidMount() {
        // Load the required SDK asynchronously for facebook, google and linkedin
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: config.auth.facebook.app_id,
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.8' // use version 2.1
            });
        };
    }
    facebookLogin = () => {
        const { facebooklogin } = this.state
        window.FB.login(
            function (resp) {
                this.statusChangeCallback(resp);
            }.bind(this), { scope: 'email,public_profile' });
    }

    checkLoginState() {
        alert("Checking Login Status")
        console.log("Checking login status...........");

        window.FB.getLoginStatus(function (response) {
            alert("FB Callback")
            console.log("----------->")
            console.log(response)
            this.statusChangeCallback(response);
        }.bind(this));
    }

    statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            alert("Connected to facebook. Retriving user from fb");
            // Logged into your app and Facebook.
            this.fetchDataFacebook();
        } else if (response.status === 'not_authorized') {
            console.log('Import error', 'Authorize app to import data', 'error')
        } else {
            console.log('Import error', 'Error occured while importing data', 'error')
        }
    }

    fetchDataFacebook = () => {
        console.log('Welcome!  Fetching your information.... ');

        window.FB.api('/me', function (user) {
            console.log(user);
            console.log('Successful login from facebook : ' + user.name);
            alert('Successful login for: ' + user.name);
        });
    }
    componentWillReceiveProps(props) {
        if (props.signin.error != undefined) {
            this.setState({ error: props.signin.error });
            console.log('aajajajjaj');
            notification['error']({
                message     : 'Login Failure',
                description : props.signin.error,
                placement   : 'bottomRight',
                duration    : 10
            });
        }
        if (props.signin.redirect == true) {
            browserHistory.push('/chat');
        }
    }
    onInputChange = (value, type) => {
        const { inputs } = this.state;
        inputs[type] = value;
        this.setState(inputs);
    }
    onLogin = () => {
        console.log('hello')

        const { inputs } = this.state;
        const { dispatch } = this.props;
        console.log(inputs);
        dispatch(login(inputs));
    }

    render() {
        const { inputs } = this.state;
        return (
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-8 mx-auto">
                            <div className="card border-none">
                                <div className="card-body">
                                    <div className="mt-2">
                                        <img src={maleimage} alt="Male" className="brand-logo mx-auto d-block img-fluid rounded-circle" />
                                    </div>
                                    <p className="mt-4 text-white lead text-center">
                                        Sign in to access your Authority account
                                </p>
                                    <div className="mt-4">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Enter email address" onChange={(e) => this.onInputChange(e.target.value, 'username')} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e) => this.onInputChange(e.target.value, 'password')} />
                                        </div>
                                        <label className="custom-control custom-checkbox mt-2">
                                            <input type="checkbox" className="custom-control-input" />
                                            <span className="custom-control-indicator"></span>
                                            <span className="custom-control-description text-white">Keep me logged in</span>
                                        </label>
                                        <button className="btn btn-primary float-right" onClick={(e) => this.onLogin()}>Sign in</button>
                                        <div className="clearfix"></div>
                                        <p className="content-divider center mt-4"><span>or</span></p>
                                    </div>
                                    <p className="mt-4 social-login text-center">


                                        {/* <a href="#" className="btn btn-twitter"><em className="ion-social-twitter"></em></a> */}
                                        <button type="button" className="btn btn-primary" onClick={() => this.facebookLogin()}>Facebook</button>
                                        {/* <a href="#" className="btn btn-linkedin"><em className="ion-social-linkedin"></em></a>
                                    <a href="#" className="btn btn-google"><em className="ion-social-googleplus"></em></a>
                                    <a href="#" className="btn btn-github"><em className="ion-social-github"></em></a> */}

                                    </p>
                                    <p className="text-center">
                                        Don't have an account yet?<Link to="/registration/">Sign Up Now</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div className="col-sm-12 mt-5 footer">
                            <p className="text-white small text-center">
                                &copy; 2017 Login/Register Forms. A FREE Bootstrap 4 component by
                            <a href="https://wireddots.com">Wired Dots</a>. Designed by <a href="https://twitter.com/attacomsian">@attacomsian</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return { signin: state.auth.signin };
}
export default connect(mapStateToProps)(SignIn);