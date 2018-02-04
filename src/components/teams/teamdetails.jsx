import React from 'react';
import { Link } from 'react-router';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class TeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgunitlist: {
            organizationUnits: [],
           },
           userlist:{
             users: [],
           } ,
           userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
        },
           name: '',
           managerNames: '',
           agentNames: '',
           teamNames: '',
           tab: 'first'
        };
        this.tabListMenu = ["first","second","third"];  
       this._userStoreChange = this._userStoreChange.bind(this);
       this.updateEditorData = this.updateEditorData.bind(this);
        this.moveToPrevious = this.moveToPrevious.bind(this); 
    }
    componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
        UserAction._getUsersList();
       UserAction._getOrgUnitList();
       UserAction._getUserRolesList();
    }    

    _userStoreChange(type){
         if(type == 'UserList'){
        let userlist = UserStore._getUserDetailsList() || {};
        this.setState({userlist});
    }

        if(type == 'OrgUnitList'){
        let orgunitlist = UserStore._getOrgUnitList() || {};
        this.setState({orgunitlist});
    }
    if(type == 'UserRolesList'){
        let userroleslist = UserStore._getUserRolesList() || {};
        this.setState({userroleslist});
    }
   }

    handleTeamNameChange(e){
     this.setState({name: e.target.value})
     console.log(e.target.value);
    }
    handleManagerNameChange(e){
     this.setState({managerNames: e.target.value})
     console.log("managerNames",e.target.value);
    }
    handleParentNameChange(e){
        this.setState({teamNames: e.target.value})
     console.log("teamNames",e.target.value);
    }
    handleAgentNameChange(e){
     this.setState({agentNames: e.target.value})
     console.log("agentNames", e.target.value);
    }

    _createTeam(e){
      e.preventDefault();
      let data = {
        name: this.state.name,
        parentId: this.state.teamNames,
      } 
      UserAction._createOrgUnitDetails(data);
    }
    user_info(){
    this.setState({tab : "first"}) 
    console.log(this.state.tab);   
  }
  user_roles(){
    this.setState({tab : "second"})  
    console.log(this.state.tab);   
  }
  org_units(){
    this.setState({tab : "third"})  
    console.log(this.state.tab);   
  }
  updateEditorData() {
        var tabIndex = this.tabListMenu.indexOf(this.state.tab);
        if(tabIndex < this.tabListMenu.length){
            this.setState({"tab":this.tabListMenu[tabIndex +1]});
        } 
    }

    moveToPrevious(){
        var tabIndex = this.tabListMenu.indexOf(this.state.tab);
        if(tabIndex > -1){
            this.setState({"tab":this.tabListMenu[tabIndex - 1]});
        }
    }

    _assignManagerToTeam(){
        let orgUnitId = localStorage.getItem('TeamId');
      let data = {
         id : this.state.managerNames,
         orgUnitId:  orgUnitId,

      }
      UserAction._assignUsersToTeams(data);
    }

    _assignAgentToTeam(){
        let orgUnitId = localStorage.getItem('TeamId');
        let data = {
          id : this.state.agentNames,
         orgUnitId:  orgUnitId,
      }
      let data1 = {
            id : this.state.agentNames,
            managerId : this.state.managerNames,
        }
     UserAction._assignUsersToTeams(data);
     UserAction._assignManagerToUser(data1);
    }

    /*_assignManagerToUser(){
        let data = {
            id : this.state.agentNames,
            managerId : this.state.managerNames,
        }
       UserAction._assignManagerToUser(data);
    }*/

    /*_createFilterUI(){
        
          return (
              <div style={{marginTop: '5px'}}>
                    
                    <select value={this.state.managerNames} className=" ml-2 mr-0 c-select form-control box_ip " placeholder="select Manager" onChange={this.handleManagerNameChange.bind(this)} >
                      <option value='-1' disabled>Select Manager</option>
                      {this.state.userlist.users.map((el, i) => <option key={i} value={el.managerId}>{el.managerId}</option>)}

                     </select>
                    
                    <i style={{cursor: 'pointer'}}> &nbsp; &nbsp; &nbsp;<button className="btn btn-icon btn-danger" > <i className="fa fa-trash"></i> </button></i>
                  
              </div>
          )
        
    }
*/
render() {
   let userlistdata = this.state.userlist.users;
   let orgunitlist = this.state.orgunitlist.organizationUnits;
   
        return (
            <div> 
              <div className="content_block">
              <div className="title-block pb-3">
                <div className="row">
                    <div className="col-md-12 d-flex align-items-center">
                        <h5 className="title mr-auto"> Add/Edit Team </h5>
                        <div>
                             
                             {
                                this.state.tab == "first" ?
                                    <button type="button" className="btn btn-primary" onClick={this._createTeam.bind(this)}>Submit</button>
                                :
                                        this.state.tab == "second" ? 
                                            <button type="button" className="btn btn-primary" onClick={this._assignManagerToTeam.bind(this)}>Assign Manager</button>
                                        :
                                            <button type="button" className="btn btn-primary" onClick={this._assignAgentToTeam.bind(this)}>Assign Agent</button>
                             }
                             <Link to="/teamlist"  className=" ml-2 mr-0 btn btn-default top_close_btn"> Close </Link>
                         </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body p-0">

                        <ul className="nav nav-tabs contract_tabs" role="tablist">
                        <li className="nav-item"> <a className={this.state.tab =="first" ?"nav-link active":"nav-link"} data-toggle="tab" href="#user_info" role="tab" onClick={this.user_info.bind(this)}> <span>1</span> Create Team</a> </li>
                        <li className="nav-item"> <a className={this.state.tab =="second" ?"nav-link active":"nav-link"} data-toggle="tab" href="#user_roles" role="tab" onClick={this.user_roles.bind(this)}> <span>2</span> Assign Manager</a> </li>
                        <li className="nav-item"> <a className={this.state.tab =="third" ?"nav-link active":"nav-link"} data-toggle="tab" href="#org_units" role="tab" onClick={this.org_units.bind(this)}> <span>3</span> Assign Agent</a> </li>
                        
                        <li className="ml-auto"> 
                            <button type="submit" className={this.state.tab =="first" ? "mr-0 btn btn-default tab_back_btn disabled" :"mr-0 btn btn-default tab_back_btn"} onClick={this.state.tab !="first" ?this.moveToPrevious:null}> 
                                <i className="fa fa-long-arrow-left"></i> &nbsp; Back
                            </button>
                            <button type="submit" className={this.state.tab =="third" ? "ml-1 mr-0 btn btn-default tab_back_btn disabled" :"ml-1 mr-0 btn btn-default tab_back_btn"} onClick={this.state.tab !="third" ? this.updateEditorData:null}> Next &nbsp; 
                                <i className="fa fa-long-arrow-right"></i>  
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-4 pl-3 pr-3 pb-3">
                        <div className={this.state.tab =="first" ?"tab-pane active":"tab-pane"} id="user_info" role="tabpanel">
                         <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    
                                    <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label"> Team Name </label>
                                                        <div className="col-sm-8">
                                                            <input type="text" className="form-control" onChange={this.handleTeamNameChange.bind(this)} placeholder="Team Name" value={this.state.name}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label"> Select parent Team </label>
                                                        <div className="col-sm-8">
                                                            <select value={this.state.teamNames} className="c-select form-control box_ip" placeholder="select Parent" onChange={this.handleParentNameChange.bind(this)} >
                                                              <option value='-1' disabled>Select Parent Team</option>
                                                              {orgunitlist && orgunitlist.map((el, i) => <option key={i} value={el.id}>{el.name}</option>)}

                                                             </select>

                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                    </div>      
                                </div>
                            </div>
                            
                            
                        </div>
                        </div>
                        <div className={this.state.tab =="second" ? "tab-pane active" : "tab-pane"} id="user_roles" role="tabpanel">
                          <div className="row">
                              <div className="col-md-12">
                                <div className="card">
                                    
                                    <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label"> Managers </label>
                                                        <div className="col-sm-8">
                                                           

                                                         <select value={this.state.managerNames} className=" ml-2 mr-0 c-select form-control box_ip " placeholder="select Manager" onChange={this.handleManagerNameChange.bind(this)} >
                                                              <option value='-1' disabled>Select Manager</option>
                                                              {userlistdata.map((assignedrole, i)=>{
                                                                if(assignedrole.role.name == "Manager"){
                                                                        return(
                                                                          <option key={i} value={assignedrole.id}>{assignedrole.name}</option> 
                                                                             )
                                                                         }    
                                                                    })    

                                                               }
                                                          </select>
                                                            

                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="col-md-4" ><a className=""><i className="fa fa-plus-circle icon mr-1"></i>Add more Managers</a> </span>
                                                
                                            </div>
                                            
                                    </div>      
                                </div>
                            </div>
                            
                            
                        </div>
                        </div>
                        <div className={this.state.tab =="third" ?"tab-pane active":"tab-pane"} id="org_units" role="tabpanel">
                        
                           <div className="row">
                            
                              <div className="col-md-12">
                                <div className="card">
                                <div>
                                    <button type="button" className="btn btn-primary col-sm-2 pull-right d-flex align-items-center" onClick={this._assignAgentToTeam.bind(this)}>Assign Manager to user</button>
                                   </div> 
                                    <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        
                                                        <label className="col-sm-4 col-form-label"> Agents </label>
                                                        <div className="col-sm-8">
                                                           <select value={this.state.agentNames} className=" ml-2 mr-0 c-select form-control box_ip " placeholder="select Manager" onChange={this.handleAgentNameChange.bind(this)} >
                                                              <option value='-1' disabled>Select Agent</option>
                                                              {userlistdata.map((assignedrole, i)=>{
                                                                if(assignedrole.role.name == "Agent"){
                                                                        return(
                                                                          <option key={i} value={assignedrole.id}>{assignedrole.name}</option> 
                                                                             )
                                                                         }    
                                                                    })    

                                                               }
                                                          </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-4 col-form-label"> Managers </label>
                                                        <div className="col-sm-8">
                                                            <select value={this.state.managerNames} className=" ml-2 mr-0 c-select form-control box_ip " placeholder="select Manager" onChange={this.handleManagerNameChange.bind(this)} >
                                                              <option value='-1' disabled>Select Manager</option>
                                                              {userlistdata.map((assignedrole, i)=>{
                                                                if(assignedrole.role.name == "Manager"){
                                                                        return(
                                                                          <option key={i} value={assignedrole.id}>{assignedrole.name}</option> 
                                                                             )
                                                                         }    
                                                                    })    

                                                               }
                                                          </select>

                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="col-md-4" ><a className=""><i className="fa fa-plus-circle icon mr-1"></i>Add more Agents</a> </span>
                                                {/*this._createFilterUI.bind(this)*/}
                                            </div>
                                            
                                    </div>      
                                </div>
                            </div>
                            
                            
                        </div>
                        </div>
                    </div>

                    </div>
                </div>    
               </div> 
             </div>
        )
    }
}

export default TeamDetails;





 