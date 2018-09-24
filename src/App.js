import React, { Component } from 'react'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

//Signin and signup page
import SignIn from './components/SignIn/'
import SignUp from './components/SignUp/'
//Resources
import './resources/css/style.css'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'



class App extends Component {
  render() {
    return (
    <Router history={browserHistory}>
      <Route path="/" component={SignIn}> </Route>
      <Route path="/registration" component={SignUp}></Route>
      <Route path="/successful"></Route>
      <Route path="/chat"></Route>

    </Router>
    );
  }
}

export default App;