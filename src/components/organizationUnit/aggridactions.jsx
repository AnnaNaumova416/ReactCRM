import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
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
            userdetails:  [],
            orgunitlist: [],
            singleorgunit: {},
            userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            
        };

        this._userStoreChange = this._userStoreChange.bind(this);
        this._getSingleUser = this._getSingleUser.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
    }

     componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
        UserAction._getUsersList();
        UserAction._getUserRolesList();
    }    

    _userStoreChange(type){
        if(type == 'OrgUnitList'){
        let orgunitlist = UserStore._getOrgUnitList() || {};
        this.setState({orgunitlist});
    }
    if(type == 'SingleOrgUnit'){
        let singleorgunit = UserStore._getSingleOrgunit() || {};
        this.setState({singleorgunit});
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
        console.log(this.state.cell);
      UserAction._deleteOrgUnit(data);
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _getSingleUser(name){

      let data = {
          id : this.state.cell.row,
        };
        console.log(this.state.cell);
        UserAction._getSingleOrgUnit(data);
    }


    render() {
        let roleslist = this.state.userroleslist.user.role.permission || {};
         console.log('roleslist',roleslist);
          return (
            <div>
                 {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Read"){
                                return(
                                <Link to="/previeworgdetails" className=" mr-2">
                                    <i className="fa fa-eye" onClick={this._getSingleUser}></i> 
                                </Link>
                                
                                )
                              }     
                            })
                     }
                     {
                        roleslist.map((roles)=>{
                            if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Delete"){
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