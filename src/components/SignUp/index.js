import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import { Button, notification } from 'antd';
import {browserHistory} from 'react-router';

/* App components */
import CountryCodes from '../common/CountryCodes'
import {connect} from 'react-redux'
import {signup} from '../../redux/actions/auth'

String.prototype.toUpperCaseWords = function () {
    return this.replace(/\w+/g, function(a){ 
        return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()
    })
}
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs : {
                name : '', 
                email : '', 
                password : '', 
                countryCode : '+213', 
                phoneNumber : ''
            },
            usercode : "",
            error : "",
            revealPassword : true
        }
    }
    componentWillReceiveProps( props ){
        if( props.redirect === true ){
            browserHistory.push('/successful');
        }
        

        if( typeof props.error !== 'undefined' && props.error !== "" ){
            this.setState({error: props.error})
        }
    }

    componentDidMount = ()=>{
        let _this = this;
        axios.get( 'https://freegeoip.net/json/',{} ).then(function (resp) {
            if( typeof resp.data.country_code !== 'undefined' && resp.data.country_code !== "" ){
                _this.setState({ usercode : resp.data.country_code })
            }
        }).catch(function (err) {
        
        });

    }
    onInputChange = (e, type) =>{
        const {inputs} = this.state;
        if( type === 'countryCode' ){
            inputs[ type ] = e;
        }else if( type === 'name' ){
            let ucWords = e.target.value.toUpperCaseWords();
            inputs[ type ] = ucWords;
        }else{
            inputs[ type ] = e.target.value;
        }

        this.setState({ inputs });
    }  
     //On click sign up 
       onSignup() {
        const {dispatch} = this.props
        const {inputs} = this.state
        
        if( inputs.phoneNumber === "" || inputs.name === "" || inputs.password === "" ){
            this.setState({error: "Marked fields are required."})
            return false;
        }

        if( inputs.email !== "" ){
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if( !re.test( inputs.email ) ){
                this.setState({error: "Enter a valid email address"})
                return false;
            }
        }

        this.setState( { error: ""}, ( () =>{
            if( this.state.error !== "" ){
                return false;
            }
           dispatch( signup( inputs ) );
        }));
    }  
    render() {
        const {inputs,usercode} = this.state;
        let message = null;
        if( this.state.error ){
            message = <div className="error-landing">{this.state.error}</div>
        }
        return (
        <section className="hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-8 mx-auto">
                        <div className="card border-none">
                            <div className="card-body">
                                <div className="mt-2 text-center">
                                    <h2>Create Your Account</h2>
                                </div>
                                <p className="mt-4 text-white lead text-center">
                                    Sign up to get started with Authority
                                </p>
                                <div className="mt-4">
                                    <form>
                                    <div className="form-group">
                                        <CountryCodes onChange={ this.onInputChange.bind(this) }  defaultCountry={usercode}/>
                                    </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="phoneno" placeholder="Enter phone number"  onChange={ (e) => this.onInputChange(e, 'phoneNumber') } />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="name" placeholder="Enter name"  onChange={ (e) => this.onInputChange(e, 'name') } />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="email" placeholder="Enter email address" onChange={ (e) => this.onInputChange(e, 'email') }/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" placeholder="Enter password" onChange={ (e) => this.onInputChange(e, 'password') }/>
                                        </div>
                                        <button type="button" className="btn btn-primary btn-block" onClick={ () => this.onSignup() }>Create Account</button>
                                        {message}
                                    </form>
                                    <div className="clearfix"></div>
                                    <p className="content-divider center mt-4"><span>or</span></p>
                                </div>
                                <p className="mt-4 social-login text-center">
                                    <a href="#" className="btn btn-twitter"><em className="ion-social-twitter"></em></a>
                                    <a href="#" className="btn btn-facebook"><em className="ion-social-facebook"></em></a>
                                    <a href="#" className="btn btn-linkedin"><em className="ion-social-linkedin"></em></a>
                                    <a href="#" className="btn btn-google"><em className="ion-social-googleplus"></em></a>
                                    <a href="#" className="btn btn-github"><em className="ion-social-github"></em></a>
                                </p>
                                <p className="text-center">
                                    Already have an account? <Link to ="/" >Login Now</Link>
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

const mapStateToProps = function( state ){

    return state.auth.signup;
}

export default connect(mapStateToProps)(SignUp)