import React from 'react';
import { Link } from 'react-router';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class PreviewTeamDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
             singleuserdetails: {
                user: {},
             },
             teamdetails: {
                users: {

                }
             },
           
        };
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
       UserAction._previewTeamDetails();
    }    

    _userStoreChange(type){
        if(type == 'UserList'){
        let userdetails = UserStore._getUserDetailsList() || {};
        this.setState({userdetails});
    }
    if(type == 'SingleUser'){
        let singleuserdetails = UserStore._getSingleUser() || {};
        
        this.setState({singleuserdetails});
    }
    if(type == 'TeamDetails'){
          let teamdetails = UserStore._getTeamDetailsList() || {};
        
        this.setState({teamdetails});
        console.log("teamdetails",this.state.teamdetails);
    }
    
 }

render() {
    let teamlist = this.state.teamdetails.users || {};
    console.log("teamlist", teamlist);

   
        return (
            <div > 
            <div className="content_block">
            	<div className="title-block">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center">
                                <h5 className="title mr-auto"> Preview Team </h5>
                                <Link to="/teamlist"  className=" ml-2 mr-0 btn btn-default top_close_btn"> Close </Link>
                             </div>
                        </div>
                    </div>
                    <br />
                    <form name="item">
                        <div className="card">
                                    <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"><b>  List of Managers: </b></label>
                                        <div className="col-sm-8">
                                          {
                                                teamlist && teamlist.map && teamlist.map((assignedrole, i)=>{
                                                                if(assignedrole.role.name == "Manager"){
                                                                    return(
                                                                     <div style={{fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: '18px'}}>  {assignedrole.name} </div>
                                                                    )
                                                                  }    
                                                                })
                                           }  


                                        </div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"><b> List of Agents: </b></label>
                                        <div className="col-sm-8">

                                                {
                                                  teamlist && teamlist.map && teamlist.map((assignedrole, i)=>{
                                                            if(assignedrole.role.name == "Agent"){
                                                                return(
                                                                 <div style={{fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: '18px'}}> {assignedrole.name} </div>
                                                                )
                                                              }    
                                                            })
                                                     }  

                                        </div>
                                    </div>
                                   
                                    
                                   </div>
                                
                              </div>
                        </div>
                       </div> 
                    </form>
                  </div>  
                </div>
        )
    }
}

export default PreviewTeamDetails;





 