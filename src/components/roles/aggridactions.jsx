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
            userdetails:  [],
            roleslist: [],
            
        };

        this._userStoreChange = this._userStoreChange.bind(this);
        this._getSingleUser = this._getSingleUser.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
        this.clicked = this.clicked.bind(this);
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
        if(type == 'RolesList'){
        let roleslist = UserStore._getRolesList() || {};
        this.setState({roleslist});
    }
    if(type == 'SingleRole'){
        let singlerole = UserStore._getSingleRole() || {};
        this.setState({singlerole});
    }
    }

    
    

    _handleFormSelection(name){
      let data = {
          id : this.state.cell.row,
        };
        
      UserAction._deleteRole(data);
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _getSingleUser(name){

      let data = {
          id : this.state.cell.row,
        };
        
        UserAction._getSingleRole(data);
    }


    render() {
        
          return (
            <div>
           {/* <button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <Link to="/previewrole" className=" mr-2">
                        <i className="fa fa-eye" onClick={this._getSingleUser}></i> 
                    </Link>


                    <a  className=" mr-2" onClick={this._handleFormSelection}>
                        <i className="fa fa-trash-o"></i>
                    </a>

                </div>
          );
    }
}