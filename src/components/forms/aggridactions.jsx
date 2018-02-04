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

            userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            formlist: {
                forms: []
            },
            organizationlist: {},
            templatelist: {
                templates: []
            },
        };

        this.clicked = this.clicked.bind(this); 
        this._templateStoreChange = this._templateStoreChange.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
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
       TemplateAction._getFormList();
       UserAction._getUserRolesList();
    }

    _templateStoreChange(type){
        if(type == 'FormList'){
        let formlist = TemplateStore._getFormDetailsList() || {};
        console.log("form list response", formlist);
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

    
    

    _handleFormSelection(name){
      let data = {
          id : this.state.cell.row,
        };
        console.log("data",data);
       TemplateAction._deleteForm(data);
       
    }

    clicked() {
       
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
        
    }

    render() {
         
         let roleslist = this.state.userroleslist.user.role.permission || {};
         console.log('roleslist',roleslist);
          return (
            <div>
               {/*<a href="" className="">
                                    <i className="fa fa-paperclip"></i> 
                                    <sup>
                                        <span className="counter">
                                            <b>3</b>
                                        </span>
                                    </sup>
                                </a>*/}
                                 {
                                    roleslist.map((roles)=>{
                                        if(roles.moduleName == "Contracts" && roles.permissionName == "Create"){
                                            return(
                                              <Link to="/formdetails" className=" mr-2">
                                                <i className="fa fa-eye"></i> 
                                            </Link>
                                            
                                            )
                                          }     
                                        })
                                 }      
                                  {
                                    roleslist.map((roles)=>{
                                        if(roles.moduleName == "Contracts" && roles.permissionName == "Create"){
                                            return(
                                            <a  className=" mr-2" onClick={this._handleFormSelection}>
                                                <i className="fa fa-trash-o"></i>
                                            </a>
                                            )
                                          }     
                                        })
                                 }      
                                

                                {/*<a href="" className=" mr-2">
                                    <i className="fa fa-file-text"></i> 
                                </a>

                                <a href="" className=" mr-2">
                                    <i className="fa fa-code-fork"></i> 
                                </a>*/}

                                

                            </div>
                           
              
                                  
        );
    }
}