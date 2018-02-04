import React from 'react';
import { Link } from 'react-router';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';



class loginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            accesstoken: '',
        };

        this._handleUserChange = this._handleUserChange.bind(this);
        this._handlePasswordChange = this._handlePasswordChange.bind(this);
        this._tokenGenerate = this._tokenGenerate.bind(this);
        this._clientStoreChange = this._clientStoreChange.bind(this);
        
    }

     componentWillMount() {
      ClientStore.on('change', this._clientStoreChange);
     }

    componentWillUnmount() {
        ClientStore.removeListener('change', this._clientStoreChange);
     }

    componentDidMount() {
      

    }


    _clientStoreChange(type){
        
        if (type == 'AccessToken') {
            let accesstoken = ClientStore._AccessToken() || {};
            this.setState({ accesstoken });
            console.log(accesstoken);
        }
    }

    _handleUserChange(e){
      this.setState({userName: e.target.value})
      console.log(e.target.value);
    }

    _handlePasswordChange(e){
       this.setState({password: e.target.value}) 
       console.log(e.target.value);
    }

    _tokenGenerate(e){
        e.preventDefault();
        let data = {
          grant_type : 'password',
          username: this.state.userName,
          password : this.state.password,
          /*client_id: 'client',
          client_secret: 'secret'*/
     };
     
      localStorage.setItem('username', this.state.userName);
      ClientAction._tokenGenerate(data);
    }

    
    render() {
        
        return (
            <div className="login_block">   
        <div className="card">
            <div className="card-body">                         
                <figure className="logo_block text-center mb-4">
                    <img src={require('../../assets/CradleWealthLogo.jpg')}  alt="" className="img-fluid" />
                    <span className="l l5"></span>
                </figure>
                
                <div className="auth-content">
                    <p className="text-center">LOGIN TO CONTINUE</p>
                    <form id="login-form" action="/index.html" method="GET" novalidate="">
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input type="email" className="form-control underlined" name="username" id="username" placeholder="Your email address" onChange={this._handleUserChange} value={this.state.userName} required /> </div>
                        <div className="form-group">
                            <label for="password">Password</label>
                            <input type="password" className="form-control underlined" name="password" id="password" placeholder="Your password" onChange={this._handlePasswordChange} value={this.state.password} required /> </div>
                        
                        <div className="form-group">
                            <label for="remember">
                                <input className="checkbox" id="remember" type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <a href="reset.html" className="forgot-btn pull-right">Forgot password?</a>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block btn-primary" onClick={this._tokenGenerate}>Login</button>
                        </div>
                        <div className="form-group">
                            <p className="text-muted text-center">Do not have an account?
                                <a href="signup.html">Sign Up!</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            {/*<div className="text-center">
                <Link to="/dashboard" className="btn btn-secondary btn-sm">
                <i className="fa fa-arrow-left"></i> Back to dashboard </Link>
            </div>*/}
        </div>
    </div>
            
        );
    }
}

export default loginPage;
