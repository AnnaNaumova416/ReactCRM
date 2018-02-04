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
            orgunitlist: {
            organizationUnits: [],
           },
            userdetails:  [],
            
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
        UserAction._getOrgUnitList();
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

    
    

    _handleFormSelection(){
      let data = {
          id : this.state.cell.row,
        };
       
      UserAction._deleteOrgUnit(data);
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _getSingleUser(name){

      let data = {
          id : this.state.cell.row,
        };
       localStorage.setItem('TeamId', this.state.cell.row);
        
    }

    _handleeditSelection(){
      let data = {
          id : this.state.cell.row,
        };
      localStorage.setItem('TeamId', this.state.cell.row); 
     } 

     render() {
        
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <Link to="/previewteamdetails" className=" mr-2">
                        <i className="fa fa-eye" onClick={this._getSingleUser}></i> 
                    </Link>

                    <Link to="/teamdetails" className=" mr-2" onClick={this._handleeditSelection.bind(this)}> <i className=" fa fa-edit"></i> </Link>


                    <a  className=" mr-2" onClick={this._handleFormSelection}>
                        <i className="fa fa-trash-o"></i>
                    </a>

                </div>
          );
    }
}