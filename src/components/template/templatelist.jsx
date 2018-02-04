import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';


class TemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           formlist: {},
           organizationlist: {},
           templatelist: [],
           userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
           columnDefs: [
            {
                headerName: "Template Name",
                field: "name",
                width: 250
            },
            {
                headerName: "Template Title",
                field: "title",
                width: 250
            },
            {
                headerName: "Status",
                field: "status",
                width: 250
            },
            {
                headerName: "Created Date",
                field: "createdAt",
                width: 250
            },
            /*{
                headerName: "Last Modified",
                field: "updatedAt",
                width: 200
            },*/
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 250
            }
        ],
        };
      this._templateStoreChange = this._templateStoreChange.bind(this);
      this.clearSelection = this.clearSelection.bind(this);
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

    clearSelection() {
        action._getSingleTemplate();
    
   }

 render() {
    let roleslist = this.state.userroleslist.user.role.permission || {};
    
    
    let containerStyle = {
            height: 400
        };
        return (
            <div> 
                <aside className="content_block">
            <div className="title_block">
                <div className="row">
                        <div className="col-md-6"> <h4> Templates List </h4>   </div>
                        <div className="col-md-6"> 
                            
                            {
                                roleslist.map((roles)=>{
                                    
                                    if(roles.moduleName == "Templates" && roles.permissionName == "Create"){
                                        return(
                                        <Link to="/templatedetails" className="btn btn-primary pull-right" onClick={this.clearSelection}> <i className="fa fa-plus-circle icon mr-1"></i> Create New Template </Link>
                                        )
                                      }     
                                    })

                            }
                        </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header d-flex">
                            <div className="input-group col-md-3 search_group">
                                <span className="input-group-addon" id="basic-addon1"><i className="fa fa-search"> </i> </span>
                                <input className="form-control" placeholder="Search"/>
                            </div>
                            
                            
                        </div>                      
                        <div className="card-body p-0">

                           <div style={containerStyle} className="ag-theme-material">
                                <AgGridReact
                                    // properties
                                    rowData={this.state.templatelist.templates}
                                    columnDefs={this.state.columnDefs}
                                    // events
                                    pagination = {true}
                                    onGridReady={this.onGridReady}
                                    enableSorting
                                    enableFilter>

                                </AgGridReact>
                            </div>
                            
                            
                            
                            
                        </div>      
                    </div>
                </div>
            </div>

        </aside>
             </div>
        )
    }
}

export default TemplateList;





 