import React from 'react';
import { Link } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class OrganizationsUnit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           roleslist: [],
           orgunitlist: [],
           userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            columnDefs: [
            {
                headerName: "OrganizationsUnit name",
                field: "name",
                width: 150
            },
            {
                headerName: "Parent",
                field: "parentId",
                width: 150
            },
            
            
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 150
            }
        ],
        };
        this._userStoreChange = this._userStoreChange.bind(this);
        this.createRowData = this.createRowData.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
    }


    componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
       UserAction._getOrgUnitList();
       UserAction._getUserRolesList();
    }    

    _userStoreChange(type){
        if(type == 'OrgUnitList'){
        let orgunitlist = UserStore._getOrgUnitList() || {};
        this.setState({orgunitlist});
    }
    if(type == 'UserRolesList'){
        let userroleslist = UserStore._getUserRolesList() || {};
        this.setState({userroleslist});
    }

    
 }

onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createRowData() {
        return this.state.orgunitlist.organizationUnits;
    }

render() {
    let containerStyle = {
            height: 400
        };
        let roleslist = this.state.userroleslist.user.role.permission || {};
         console.log('roleslist',roleslist);
        return (
            <div>
              <aside className="content_block">
            <div className="title_block">
                <div className="row">
                        <div className="col-md-6"> <h4> Organizations Units </h4>   </div>
                        <div className="col-md-6">
                          {
                            roleslist.map((roles)=>{
                                if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Create"){
                                    return(
                                    
                                    <span className="pull-right"> 
                                    <a  className="btn btn-primary mr-1 ml-auto" data-toggle="modal" data-target="#newrole"> <i className="fa fa-plus-circle icon mr-1"></i> Create a New OrganizationsUnit</a> </span>
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
                                    rowData={this.state.orgunitlist.organizationUnits}
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

export default OrganizationsUnit;





