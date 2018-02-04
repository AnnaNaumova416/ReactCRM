import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import {IndexLink} from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import Login from '../login/login.component.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import * as ContractAction from '../../actions/contractAction.jsx';
import ContractStore from '../../store/contractStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

const mainLoader = {
    display: 'inline-block',
    margin: 0,
    paddingTop: '15%',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 3000,
    backgroundColor: '#000000',
    opacity: 0.5,
    textAlign: 'center',
}
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          snackbarStr: '',
          showLoader:false,
          userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            }, 
        };
       this._handleRequestClose = this._handleRequestClose.bind(this);
       this._contractStoreChange = this._contractStoreChange.bind(this);
       this._userStoreChange = this._userStoreChange.bind(this);
       this._handleKeyUp = this._handleKeyUp.bind(this);
       this.removeToken = this.removeToken.bind(this);
    }

    componentWillMount() {
      ContractStore.on('change', this._contractStoreChange);
      UserStore.on('change', this._userStoreChange);
 
      document.addEventListener("keyup", this._handleKeyUp, false);
     }

    componentWillUnmount() {
       ContractStore.removeListener('change', this._contractStoreChange);
       UserStore.removeListener('change', this._userStoreChange);
       /*document.removeListener("keyup", this._handleKeyUp, false);*/
    }

    componentDidMount() {
        UserAction._getUserRolesList();
    }

    

    _contractStoreChange(type, value) {
        if (type == 'ContractList') {
            let contractlist = ContractStore._getContractDetailsList() || {};
            this.setState({ contractlist });
        }if(type == 'SnackBar'){
            this.setState({
              snackbarStr: value,
              open: true
            });
         }else if(type == 'Loader'){
              this.setState({
                showLoader: value
              })
            }
    }

    _userStoreChange(type){
        if(type == 'UserList'){
        let userdetails = UserStore._getUserDetailsList() || {};
        this.setState({userdetails});
    }
    if(type == 'RolesList'){
        let roleslist = UserStore._getRolesList() || {};
        this.setState({roleslist});
    }

    if(type == 'UserRolesList'){
        let userroleslist = UserStore._getUserRolesList() || {};
        this.setState({userroleslist});
    }
 }

    _handleRequestClose(){
    this.setState({
      open: false,
    });
  }

  _handleKeyUp(e){
    if(e.keyCode == 27){
      this.setState({showLoader: false});
    }
  }

  removeToken(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
  }

    
    render() {
        let token = localStorage.getItem('username');
        let accessToken = localStorage.getItem('accessToken');
        let roleslist = this.state.userroleslist.user.role.permission || {};
        
        let button = null;
            if (accessToken) {
              button = <div>
               <Snackbar
                    open={this.state.open}
                    message={this.state.snackbarStr ? this.state.snackbarStr : ''}
                    autoHideDuration={2000}
                    bodyStyle={{maxWidth:'1500px', backgroundColor: '#FF615E'}}
                    onRequestClose={this._handleRequestClose}
                  />
                {this.state.showLoader ? <CircularProgress size={150} thickness={8} style={mainLoader}/> : null}
               <header>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <a className="navbar-brand d-flex" href="#"> <img src={require('../../assets/CradleWealthLogo.jpg')}  className="img-fluid"/> </a>          
                        <button className="btn" id="menu_toggle" ><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" >
                            <ul className="navbar-nav ml-auto ">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={require('../../assets/5.jpg')}  alt="profile" className="profile_img"/> {token}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right profile_dropdown" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href="#"> <i className="fa fa-bell"></i> &nbsp; Notifications </a>
                                        <a className="dropdown-item" href="#"> <i className="fa fa-question"></i> &nbsp; Help </a>
                                        <Link to="/" onClick={this.removeToken} className="dropdown-item" > <i class="fa fa-lock"></i> &nbsp; Logout </Link>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>      
                </header>
                <aside className="side_bar" id="sidebar">
                <ul className="nav">
                    <li className="nav-item "><a href="/tabcontract" className="nav-link"> <i className="fa fa-home"></i>  <span className="menu_title">   &nbsp; Home </span></a></li>
                    {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == "Contracts" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown active" >
                                        <a className="navlink nav-link" href="#menu_contracts"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_contracts">
                                                <i className="fa fa-copy"></i>  &nbsp; <span className="menu_title"> Contracts </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_contracts" className="collapse list-unstyled">
                                            <li><Link to="/contractlist"  className="nav-link" > Contract List </Link></li>
                                            
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }
                    {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == "Templates" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#menu_templates"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_templates">
                                                <i className="fa fa-columns"></i>  &nbsp; <span className="menu_title"> Templates </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_templates" className="collapse list-unstyled" >
                                            <li><Link to="/templatelist"  className="navlink nav-link"> Template List </Link></li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }   
                    {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == "Clients" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#menu_clients"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_clients">
                                                <i className="fa fa-black-tie"></i>  &nbsp; <span className="menu_title"> Clients </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_clients" className="collapse list-unstyled">
                                            <li><Link to="/clients" className="nav-link">Clients List</Link></li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }
                    {
                        roleslist.map((roles)=>{

                            if(roles.moduleName == "Forms" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#menu_forms"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_forms">
                                                <i className="fa fa-list"></i>  &nbsp; <span className="menu_title"> Forms </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_forms" className="collapse list-unstyled">
                                            <li><Link to="/formlist" className="nav-link">Form List </Link></li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }       
                    {
                        roleslist.map((roles)=>{

                            if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown">
                                        <a className="nav-link" href="#menu_teams"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_teams">
                                                <i className="fa fa-group"></i>  &nbsp; <span className="menu_title"> Teams </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_teams" className="collapse list-unstyled">
                                            <li className=""><Link to="/teamlist" className="nav-link">Team List </Link></li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }       
                    {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == "Dashboard" && roles.permissionName == "Read"){
                                return(
                                   <li className="nav-item dropdown ">
                                            <a className="nav-link" href="#menu_reports"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_reports">
                                                <i className="fa fa-bar-chart"></i>  &nbsp; <span className="menu_title"> Reports </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                            </a>    
                                            <ul id="menu_reports" className="collapse list-unstyled">
                                                <li><Link to="/report" className="nav-link">Reports</Link></li>
                                            </ul>           
                                        </li>
                                
                                )
                              }     
                            })
                     }                   
                    
                    {
                        roleslist.map((roles)=>{
                            
                            if(roles.moduleName == "Admin" && roles.permissionName == "Read"){
                                return(
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link" href="#menu_users"  role="button" data-toggle="collapse" aria-haspopup="true" aria-controls="menu_clients">
                                                <i className="fa fa-cog"></i>  &nbsp; <span className="menu_title"> Administration </span> <span className="pull-right"> <i className="fa fa-angle-right"></i> </span>
                                        </a>
                                        <ul id="menu_users" className="collapse list-unstyled">
                                            {
                                                roleslist.map((roles)=>{

                                                    if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Read"){
                                                        return(
                                                            <li><Link to="/organizationlist" className="nav-link">Organisation Units</Link></li>
                                                        )
                                                    }
                                                })
                                            }
                                            <li><Link to="/users" className="nav-link">Users</Link></li>
                                            <li><a href="audit_logs.html" className="nav-link">Audit Logs</a></li>
                                            <li><Link to="/roles" className="nav-link">Roles</Link></li>    
                                            <li><a href="settings.html" className="nav-link">Settings</a></li>
                                        </ul>
                                    </li>
                                )
                            }
                        })
                    }   
                </ul>       
            </aside>   
            <div>
              {this.props.children}
            </div>  
            </div>;
            } 
            if(!accessToken){
                window.location.href='/';
            }
        return (
            <div>
               {button}
            </div>
        );
    }
}
index.propTypes = {
    children: PropTypes.object.isRequired
};
export default index;