import React, { PureComponent } from "react";
import './header.css';
import { Link } from "react-router-dom";
const firebase = require('firebase');

class Header extends PureComponent {

    constructor(props) {
      super(props);
      this.login = React.createRef();
      this.logout = React.createRef();
      this.name = React.createRef();
    }

    firebaseConfig = {
      apiKey: "AIzaSyA49LUXy5HkPlnoVqlYT8BFMuII6BBW21Q",
      authDomain: "piskel-clone-68932.firebaseapp.com",
      databaseURL: "https://piskel-clone-68932.firebaseio.com",
      projectId: "piskel-clone-68932",
      storageBucket: "piskel-clone-68932.appspot.com",
      messagingSenderId: "650808504364",
      appId: "1:650808504364:web:042aabbf57ccdc7b09a189"
    };

    componentDidMount () {
      firebase.initializeApp(this.firebaseConfig);
    }

    signIn = () => {
      const base_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(base_provider).then((res) => {
        console.log(res);
        this.name.current.style.display = 'block';
        this.login.current.style.display = 'none';
        this.logout.current.style.display = 'block';
        this.name.current.innerHTML = (res.user.displayName || res.user.email);
      }).catch((err) => {
        console.log(err);
      })
    }

    signOut = () => {
      firebase.auth().signOut().then(() => {
        this.name.current.style.display = 'none';
        this.login.current.style.display = 'block';
        this.logout.current.style.display = 'none';
      }).catch((err) => {
        console.log(err);
      });
    }

    render() {
        return (<header className = "header">
                  <div className = "header__right">
                    <Link className = "link" to='/landing'>  
                      <h1 className = "header__headline">Piskel-Clone</h1>
                    </Link>
                  </div>
                  <div className="header__left">
                    <p ref = {this.login} onClick = {this.signIn} className = "user-login">Log in</p>
                    <p ref = {this.logout} onClick = {this.signOut} className = "user-logout">Log out</p>
                    <p ref = {this.name} className = "user-name"></p>
                  </div>
                </header>);
    }
}

export default Header;
