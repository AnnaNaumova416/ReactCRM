import React from 'react';
import { Link } from 'react-router';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import action from './aggridactions.jsx';

class TeamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           orgunitlist: {
            organizationUnits: [],
           },
           userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            columnDefs: [
            {
                headerName: "Team Name",
                field: "name",
                width: 250
            },
            {
                headerName: "Team Id",
                field: "id",
                width: 250
            },
            {
                headerName: "Parent Id",
                field: "parentId",
                width: 250
            },
            
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 250
            },
        ],
        };
     this._userStoreChange = this._userStoreChange.bind(this);
     this._createCardsUI = this._createCardsUI.bind(this);
    }
    componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
       UserAction._getOrgUnitList();
       UserAction._getUsersList();
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
     if(type == 'UserList'){
        let userlist = UserStore._getUserDetailsList() || {};
        this.setState({userlist});
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

 _handleFormSelection(el){
      let data = {
          id : el,
        };
       
      UserAction._deleteOrgUnit(data);
    }

 _handleeditSelection(el){
    let data = {
          id : el,
        };
    localStorage.setItem('TeamId', el);    
 }   


   _createCardsUI(){
     
     
     return this.state.orgunitlist && this.state.orgunitlist.organizationUnits && this.state.orgunitlist.organizationUnits.map(el => (
          <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-header d-flex">
                            <h5 className="card-title mr-auto"> {el.name}</h5>
                            <ul className="list-unstyled d-flex card_actions ">
                                <li><Link to="/teamdetails" onClick={this._handleeditSelection.bind(this, el.id)}> <i className=" fa fa-edit"></i> </Link></li>
                                <li><a onClick={this._handleFormSelection.bind(this, el.id)}> <i className=" fa fa-trash"></i> </a></li>
                            </ul>
                        </div>                      
                        <div className="card-body">
                            <div className="form-group row ">
                                <label className="col-md-4"> Manager : </label>
                                {/*<span className="col-md-4">AAA </span>*/}
                                {/*<span className="col-md-4"><a href="" className="">Change</a> </span>*/}
                            </div>
                            <div className="form-group row">
                                <label className="col-md-4"> Agents : </label>
                                {/*<span className="col-md-4">Agent 1  </span>*/}
                            </div>

                            {/*<div className="form-group row">
                                <div className="col-md-12">
                                    <a href="" className=""> Add Agent  </a>
                                </div>
                            </div>*/}
                        </div>      
                    </div>
                </div>
        )
     );
   }

render() {
    let roleslist = this.state.userroleslist.user.role.permission || {};
         
         let containerStyle = {
            height: 400
        };
        return (
            <div > 
               <aside className="content_block">
            <div className="title_block">
                <div className="row">
                        <div className="col-md-6"> <h4> Teams </h4>   </div>
                        {
                            roleslist.map((roles)=>{
                                if(roles.moduleName == " OrganizationUnits" && roles.permissionName == "Create"){
                                    return(
                                      <div className="col-md-6"> <Link to="/teamdetails" className="btn btn-primary pull-right"> <i className="fa fa-plus-circle icon mr-1"></i> Add New Team</Link> </div>
                                    )
                                  }     
                                })
                         }   
                        
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
             </div>
        )
    }
}

export default TeamList;





 