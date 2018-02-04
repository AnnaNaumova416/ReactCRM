import React, {Component} from "react";
import { Link, browserHistory } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
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
            templatelist: [],
            userroleslist:{
                user: {
                    role: {
                        permission: [],
                    },
                }
            },
        };

        this.clicked = this.clicked.bind(this); 
        this._templateStoreChange = this._templateStoreChange.bind(this);
        this._getSingleTemplate = this._getSingleTemplate.bind(this);
        this._handleTemplateSelection = this._handleTemplateSelection.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
    }

     componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
      UserStore.on('change', this._userStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
        UserStore.removeListener('change', this._userStoreChange);
     }

    componentDidMount() {
       TemplateAction._getTemplateList();
       UserAction._getUserRolesList();
    }

    _templateStoreChange(type){
        if(type == 'FormList'){
        let formlist = TemplateStore._getFormDetailsList() || {};
       
        this.setState({formlist});
    }
    if(type == 'OrganizationList'){
        let organizationlist = TemplateStore._getOrganizionDetailsList() || {};
        
        this.setState({organizationlist});
    }
    if(type == 'TemplateList'){
        let templatelist = TemplateStore._getTemplateDetailsList() || {};
        
        this.setState({templatelist});
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

    _getSingleTemplate(name){

      let data = {
          id : this.state.cell.row,
        };
        TemplateAction._getSingleTemplate(data);
    }



    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    

    _handleTemplateSelection(name){
      let data = {
          id : this.state.cell.row,
        };
        console.log("data",data);
        TemplateAction._deleteTemplate(data);
    }

    render() {
            let roleslist = this.state.userroleslist.user.role.permission || {};
            console.log('roleslist',roleslist);
          return (
            <div>
                {
                    roleslist.map((roles)=>{
                        if(roles.moduleName == "Templates" && roles.permissionName == "Read"){
                            return(
                            <Link to="/previewTemplate" className="ml-2 mr-0">
                                <i className="fa fa-eye" onClick={this._getSingleTemplate}></i> 
                            </Link>
                            
                            )
                          }     
                        })
                 }  

                 {
                    roleslist.map((roles)=>{
                        if(roles.moduleName == "Templates" && roles.permissionName == "Delete"){
                            return(
                            
                            <a  className="ml-2 mr-0" onClick={this._handleTemplateSelection}>
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