import React from 'react';
import { Link } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class Roles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : "",
            roleslist: [],
            columnDefs: [
                {
                    headerName: "Role name",
                    field: "name",
                    width: 150
                },
                {
                    headerName: "createdBy",
                    field: "createdBy",
                    width: 150
                },
                
                
                {
                    headerName: "Actions",
                    field: "id",
                    cellRendererFramework: action,
                    width: 150
                },
            ],
            permissions : []
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
       UserAction._getRolesList();
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
 }

onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createRowData() {
        return this.state.userdetails.users;
    }

    get_permission(event){
        console.log('event',event.target.name,event.target.checked,event.target.value)
        var permissions = this.state.permissions
        if(event.target.checked){
            permissions.push({
                "moduleName": event.target.name,
                "permissionName": event.target.value
            })
        }
        else{
            for(var i=0;i<permissions.length;i++){
                if(permissions[i].moduleName == event.target.name){
                    if(permissions[i].permissionName == event.target.value){
                        permissions.splice(i,1)
                        break
                    }
                }
            }
        }
        console.log('permissions',permissions)
        this.setState({permissions : permissions})
    }

    get_role_name(event){
        console.log('event',event.target.value)
        this.setState({name : event.target.value})
    }
     _createRole(){
      let data = {
        name: this.state.name,
        permission: this.state.permissions
      };  
      UserAction._createRoles(data);  
     }

render() {
    let containerStyle = {
            height: 400
        };
        return (
            <div>
              <aside className="content_block">
            <div className="title_block">
                <div className="row">
                        <div className="col-md-6"> <h4> Roles </h4>   </div>
                        <div className="col-md-6"> 
                            <span className="pull-right"> 
                            
                            <a  className="btn btn-primary mr-1 ml-auto" data-toggle="modal" data-target="#newrole"> <i className="fa fa-plus-circle icon mr-1"></i> Create a New Role</a> </span>
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
                                    rowData={this.state.roleslist.roles}
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
        






<div className="modal fade" id="newrole" tabindex="-1" role="dialog" aria-labelledby="newroleLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="newroleLabel">Create New Role</h5>
            {/*<button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <i className="fa fa-times" aria-hidden="true"></i>
            </button>*/}
            <button type="button" className="btn btn-outline" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={this._createRole.bind(this)}>Submit</button>

        </div>
        <div className="modal-body">
            
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#role_name" role="tab">Role Name</a> </li>
                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#permission" role="tab">Permissions</a> </li>         
            </ul>
      
            
            <div className="tab-content mt-4">
                <div className="tab-pane active" id="role_name" role="tabpanel">
                    <div className="row">                       
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="form-label"> Role Name </label>                               
                                <input type="text" className="form-control" placeholder="Enter Role Name" onChange={this.get_role_name.bind(this)}/>                              
                            </div>
                            
                            <div className="form-check mt-4">
                                <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"/>
                                Default
                                </label>
                            </div>
                            <p className="text-muted"> Assign to new users as default </p>
                            <p className="bg-light p-2"> If your changing your own permissions</p>
                        </div>                      
                    </div>  
                </div>
                <div className="tab-pane" id="permission" role="tabpanel"> 

                    
                    <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Modules
                                                </label>
                                            </div>
                                        </th>
                                        <th scope="col">
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Read
                                                </label>
                                            </div>

                                        </th>
                                        <th scope="col">
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Create
                                                </label>
                                            </div>

                                        </th>

                                        <th scope="col">
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Update
                                                </label>
                                            </div>

                                        </th>
                                        <th scope="col">
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Delete
                                                </label>
                                            </div>
                                        </th>

                                        <th scope="col">
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Approve
                                                </label>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Templates
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Templates" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Templates" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Templates" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Templates" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Contracts
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Contracts" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Contracts" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Contracts" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Contracts" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Contracts" value="Approve" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Clients
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Clients" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Clients" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Clients" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Clients" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>
                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Organization
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Organization" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Organization" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        
                                        
                                    </tr>

                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                OrganizationUnits
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="OrganizationUnits" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="OrganizationUnits" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="OrganizationUnits" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="OrganizationUnits" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>

                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Dashboard
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Dashboard" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Dashboard" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Dashboard" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Dashboard" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>

                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Forms
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Forms" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Forms" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Forms" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Forms" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>

                                    <tr>
                                        <th scope="row"> 
                                            <div className="form-check mt-3">
                                                <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"/>
                                                Admin
                                                </label>
                                            </div>
                                        </th>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Admin" value="Read" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Admin" value="Create" onChange={this.get_permission.bind(this)}/>
                                            </div>
                                        </td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Admin" value="Update" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        <td><div className="form-check mt-3">
                                                <label className="form-check-label"></label>
                                                <input type="checkbox" className="form-check-input" name="Admin" value="Delete" onChange={this.get_permission.bind(this)}/>
                                            </div></td>
                                        
                                    </tr>

                                </tbody>
                            </table>
                    </div>
                    

                </div>              
            </div>


        </div>
        <div className="modal-footer">
            {/*<button type="button" className="btn btn-outline" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary">Save Changes</button>*/}
        </div>
        </div>
    </div>
</div>
             </div>
        )
    }
}

export default Roles;





 