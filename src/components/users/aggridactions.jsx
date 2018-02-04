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
            
        };

        this._userStoreChange = this._userStoreChange.bind(this);
        this._getSingleUser = this._getSingleUser.bind(this);
        this._handleFormSelection = this._handleFormSelection.bind(this);
        this._editUser = this._editUser.bind(this);
    }

     componentWillMount() {
      UserStore.on('change', this._userStoreChange);

     }

    componentWillUnmount() {
       UserStore.removeListener('change', this._userStoreChange);
    }

    componentDidMount() {
        UserAction._getUsersList();
    }    

    _userStoreChange(type){
        if(type == 'UserList'){
        let userdetails = UserStore._getUserDetailsList() || {};
        this.setState({userdetails});
    }
    }

    
    

    _handleFormSelection(name){
      let data = {
          id : this.state.cell.row,
        };
        
      UserAction._deleteUser(data);
    }

    clicked() {
        console.log("Child Cell Clicked: " + JSON.stringify(this.state.cell));
    }

    _getSingleUser(name){

      let data = {
          id : this.state.cell.row,
        };
        
        UserAction._getSingleUser(data);
    }

    _editUser(){
        
        let data = {
          id : this.state.cell.row,
        };
        localStorage.setItem("edit_user_id", this.state.cell.row);
        UserAction._getSingleUser(data);
    }


    render() {
        
          return (
            <div>
            {/*<button  onClick={this.clicked} className="btn btn-info">Edit</button>*/}
                <Link to="/previewuserdetails" className=" mr-2">
                        <i className="fa fa-eye" onClick={this._getSingleUser}></i> 
                    </Link>

                    <a  className=" mr-2" data-toggle="modal" data-target="#usersetting" data-target="#usersetting" onClick={this._editUser}> <i className="fa fa-edit"></i> </a>


                    <a  className=" mr-2" onClick={this._handleFormSelection}>
                        <i className="fa fa-trash-o"></i>
                    </a>

                </div>
          );
    }
}