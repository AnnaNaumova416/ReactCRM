import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

export default class ClickableRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cell: {
                row: this.props.value,
                col: this.props.colDef.headerName
            },
            clientdetails:  [],
            userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            
        };

        this.clicked = this.clicked.bind(this); 
        this._clientStoreChange = this._clientStoreChange.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
        this._getSingleClient = this._getSingleClient.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
    }

     componentWillMount() {
      ClientStore.on('change', this._clientStoreChange);
      UserStore.on('change', this._userStoreChange);
     }

    componentWillUnmount() {
        ClientStore.removeListener('change', this._clientStoreChange);
        UserStore.removeListener('change', this._userStoreChange);
     }

    componentDidMount() {
       ClientAction._getClientList();
       UserAction._getUserRolesList();
    }

    _clientStoreChange(type){
        if(type == 'ClientList'){
        let clientdetails = ClientStore._getClientDeatilsList() || {};
        console.log(clientdetails);
        this.setState({clientdetails});
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

    
    

    _handleFormSelection(name){
      let data = {
          id : this.state.cell.row,
        };
        
      ClientAction._deleteClient(data); 
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _getSingleClient(name){

      let data = {
          id : this.state.cell.row,
        };
        ClientAction._getSingleClient(data);
    }


    render() {
        let roleslist = this.state.userroleslist.user.role.permission || {};
        console.log('roleslist',roleslist);
          return (
            <div>
               {
                  roleslist.map((roles)=>{
                    if(roles.moduleName == "Clients" && roles.permissionName == "Read"){
                      return(
                      <Link to="/previewclientdetails" className=" mr-2">
                          <i className="fa fa-eye" onClick={this._getSingleClient}></i> 
                      </Link>
                      )
                        }   
                    })
                 }  

                 {
                  roleslist.map((roles)=>{
                    if(roles.moduleName == "Clients" && roles.permissionName == "Delete"){
                      return(
                      <a  className=" mr-2" onClick={this._handleFormSelection}>
                          <i className="fa fa-trash-o"></i>
                      </a>
                      )
                        }   
                    })
                 }  
                


                    

                </div>
          );
    }
}