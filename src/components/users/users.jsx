import React from 'react';
import { Link } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            nircNumber: '',
            userdetails: [],
            roleslist: {
                roles: [],
            },
            columnDefs: [
            {
                headerName: "Username",
                field: "username",
                width: 150
            },
            {
                headerName: "Name",
                field: "name",
                width: 150
            },
            {
                headerName: "Surname",
                field: "surname",
                width: 150
            },
            {
                headerName: "Roles",
                field: "roleId",
                width: 150
            },
            {
                headerName: "Email Address",
                field: "email",
                width: 150
            },
            
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 150
            },
        ],
            tab : "",
            user_id : "",
            role_id : "",
            create_user : false
        };
        this.update_roles = this.update_roles.bind(this)
        this.handleSaveUser = this.handleSaveUser.bind(this);
        this._commonChangeFunction = this._commonChangeFunction.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
        this.createRowData = this.createRowData.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
    }

    componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
       UserAction._getUsersList();
       UserAction._getRolesList();
    }    

    _userStoreChange(type){
        console.log('type:',type)
        if(type == 'UserList'){
        let userdetails = UserStore._getUserDetailsList() || {};
        console.log('userdetails',userdetails)
        this.setState({userdetails});
    }
    if(type == 'RolesList'){
        let roleslist = UserStore._getRolesList() || {};
        this.setState({roleslist});
    }
    if(type == 'SingleUser'){
        let singleuserdetails = UserStore._getSingleUser() || {};
        console.log('singleuserdetails',singleuserdetails)
        this.setState({ 
            name : singleuserdetails.user.name,
            surname: singleuserdetails.user.surname,
            email: singleuserdetails.user.email,
            phone: singleuserdetails.user.phone,
            username: singleuserdetails.user.username,
            password: singleuserdetails.user.password,
            nircNumber: singleuserdetails.user.nircNumber
        });
    }
 }

    handleSaveUser(e) {
        e.preventDefault();
        let data = Object.assign({}, this.state);
        UserAction._createUserDetails(data);
        console.log("request for createuser", data);
    }

    handleUpdateUser(e) {
        e.preventDefault();
        let data = Object.assign({
            id: localStorage.getItem("edit_user_id"),
        }, this.state);
        UserAction._UpdateUserDetails(data);
        console.log("request for updateuser", data);
    }

    update_roles(e){
        e.preventDefault();
        var data = {
            roleId : this.state.role_id,
            id : localStorage.getItem("edit_user_id"),
        }
        UserAction._assignRoleToUser(data);
    }


    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }

    createRowData() {
        return this.state.userdetails.users;
    }


    _commonChangeFunction(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        console.log(e.target.value);
    }

  select_role(event){
    console.log('event',event.target.value)
    this.setState({role_id : event.target.value})
  }

  create_user(){
    this.setState({ 
        name : "",
        surname: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        nircNumber: "",
    });
    this.setState({create_user: true})
  }

  close_create_user(){
    this.setState({create_user: false})
  }

  roles_tab(){
    this.setState({tab : "second"})    
  }

  user_tab(){
    this.setState({tab : "first"})    
  }

  org_tab(){
    this.setState({tab : "third"})    
  }

render() {
    let roleslist = this.state.roleslist;
    
    
    let containerStyle = {
            height: 400
        };
        return (
            <div>
                <aside className="content_block">
            <div className="title_block">
                <div className="row">
                    <div className="col-md-6"> <h4> Users </h4> </div>
                    <div className="col-md-6"> 
                        <span className="pull-right"> 
                        {/*<a href="#" className="btn btn-default"> <i className="fa fa-file icon mr-1"></i> Export to Excel </a>*/}  
                        <a  className="btn btn-primary mr-1 ml-auto" data-toggle="modal" data-target="#usersetting" onClick={this.create_user.bind(this)}> <i className="fa fa-file icon mr-1"></i> Create New User</a> </span>
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
                                    rowData={this.state.userdetails.users}
                                    columnDefs={this.state.columnDefs}
                                    // events
                                    pagination = {true}
                                    onGridReady={this.onGridReady}
                                    parent={this}
                                    enableSorting
                                    enableFilter>

                                </AgGridReact>
                        </div>
                            
                            
                            
                        </div>      
                    </div>
                </div>
            </div>

        </aside>
        

<div className="modal fade" id="usersetting" tabindex="-1" role="dialog" aria-labelledby="usersettingLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="usersettingLabel">Create New User</h5>
             <button type="button" className="btn btn-outline" data-dismiss="modal" onClick={this.close_create_user.bind(this)}>Close</button>
             {
                this.state.create_user ?
                    <button type="button" className="btn btn-primary" onClick={this.handleSaveUser.bind(this)}>Save changes</button>
                :
                        this.state.tab == "second" ? 
                            <button type="button" className="btn btn-primary" onClick={this.update_roles.bind(this)}>Assign Role</button>
                        :
                            <button type="button" className="btn btn-primary" onClick={this.handleUpdateUser.bind(this)}>Update</button>
             }
            
           
        </div>
        <div className="modal-body">
            
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#user_info" role="tab" onClick={this.user_tab.bind(this)}>User Information</a> </li>
                {
                    !this.state.create_user ?
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#user_roles" role="tab" onClick={this.roles_tab.bind(this)}>Roles</a> </li>
                    :
                        ""
                }
                {
                    !this.state.create_user ?
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#org_units" role="tab" onClick={this.org_tab.bind(this)}>Organisation Units</a> </li>  
                    :
                        ""
                }             
            </ul>
      
            
            <div className="tab-content mt-4">
                <div className="tab-pane active" id="user_info" role="tabpanel">
                    <div className="row">                       
                        <div className="col-md-9">
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label"> Name </label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Enter Name" onChange={this._commonChangeFunction} name='name' value={this.state.name} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label"> Sur Name </label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Enter Surname" onChange={this._commonChangeFunction} name='surname' value={this.state.surname}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label"> Email ID </label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Enter Email" onChange={this._commonChangeFunction} name='email' value={this.state.email}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label"> NRIC/Number </label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" placeholder="Enter icno" onChange={this._commonChangeFunction} name='nircNumber' value={this.state.nircNumber}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <figure>
                                <img src={require('../../assets/5.jpg')} className="img-fluid" />
                                <a href="" className="btn"> Change Picture</a>
                            </figure>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label"> Phone Number </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="Enter phone number" onChange={this._commonChangeFunction} name='phone' value={this.state.phone}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label"> User Name </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="Enter username" onChange={this._commonChangeFunction} name='username' value={this.state.username}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label for="password" className="col-sm-3 col-form-label"> Password </label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" name="password" id="password" placeholder="Your password" onChange={this._commonChangeFunction} name='password' value={this.state.password}/>
                        </div>
                    </div>

                    
                </div>
                <div className="tab-pane" id="user_roles" role="tabpanel"> 
                    <div>
                    <div className="form-check mt-3">
                    <label className="form-check-label">
                    {
                    this.state.roleslist.roles.map(el => {
                        
                    return (
                        <div>
                        <input type="radio" className="form-check-input" name="role" value={el.id} onChange={this.select_role.bind(this)}/>
                        {el.name}
                        <br/>
                        </div>
                    )
                      })
                    }
                    </label>
                    </div>
                   </div> 
                    


                </div>
                <div className="tab-pane" id="org_units" role="tabpanel">                   
                    <div className="form-group">                        
                        <input type="text" className="form-control" placeholder="Search"/>  
                    </div>
                    Place a tree structure
                </div>
            </div>
        </div>
        <div className="modal-footer">
           
        </div>
        </div>
    </div>
</div>
            </div>
        )
    }
}

export default User;





 