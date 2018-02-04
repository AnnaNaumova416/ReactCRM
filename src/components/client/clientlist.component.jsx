import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class clientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientdetails:  [],
            userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            columnDefs: [
            /*{
                headerName: "Client ID",
                field: "id",
                width: 250
            },*/
            {
                headerName: "Client Name",
                field: "name",
                width: 100
            },
            {
                headerName: "Status",
                field: "status",
                width: 100
            },
            {
                headerName: "Registered Date",
                field: "createdAt",
                width: 100
            },
            {
                headerName: " Active Contracts",
                field: "status",
                width: 100
            },
            /*{
                headerName: "Total Investment Amount",
                field: "",
                width: 200
            },
            {
                headerName: "Total Monthly Payout",
                
                field: "",
                width: 200
            },*/
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 150
            }
        ],
    };
        this._clientStoreChange = this._clientStoreChange.bind(this);
        this.createRowData = this.createRowData.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
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
   clearSelection() {
        action._getSingleClient();
    
   } 
   onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createRowData() {
        return this.state.clientdetails.clients;
    }

    


    render() {
        let containerStyle = {
            height: 400
        };
        let roleslist = this.state.userroleslist.user.role.permission || {};
        console.log('roleslist',roleslist);
        return (
            <div>
                <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
                <aside className="content_block">
                <div className="title-block">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center">
                            <h5 className="title mr-auto"> Clients </h5>
                            {
                                roleslist.map((roles)=>{
                                    if(roles.moduleName == "Clients" && roles.permissionName == "Create"){
                                        return(
                                        <Link to="/clientdetails" className="btn btn-primary btn-lg rounded-s mb-0" onClick={this.clearSelection}> <i className="fa fa-user icon mr-1"></i> Create New Client </Link>
                                        )
                                      }     
                                    })
                             }  
                            
                        </div>
                    </div>
                </div>
                <br />
                

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
                                    rowData={this.state.clientdetails.clients}
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

        );
    }
}

export default clientList;
