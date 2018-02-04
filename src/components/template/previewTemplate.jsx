import React from 'react';
import { Link } from 'react-router';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';


class PreviewTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          singletemplate: {
            template: {},
          },
          userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
        };
        this._templateStoreChange = this._templateStoreChange.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
 }

 componentWillMount() {
      TemplateStore.on('change', this._templateStoreChange);
      UserStore.on('change', this._userStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
        UserStore.removeListener('change', this._userStoreChange);
     }

    componentDidMount() {
       UserAction._getUserRolesList();
    }

    _templateStoreChange(type){
        if(type == 'FormList'){
        let formlist = TemplateStore._getFormDetailsList() || {};
       
        this.setState({formlist});
    }
    if(type == 'OrganizationList'){
        let organizationlist = TemplateStore._getOrganizionDetailsList() || {};
        
        this.setState({organizationlist});
    }
    if(type == 'TemplateList'){
        let templatelist = TemplateStore._getTemplateDetailsList() || {};
        
        this.setState({templatelist});
    }
    if(type == 'SingleTemplate'){
        let singletemplate = TemplateStore._getSingleTemplate() || {};
        console.log("single template response", singletemplate);
        this.setState({singletemplate});
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


render() {
       
        let singletemplate = this.state.singletemplate;
        let roleslist = this.state.userroleslist.user.role.permission || {};
        
        return (
            <div>
          <div className="content_block">
            <div className="title_block">
                <div className="row">
                        <div className="col-md-12 d-flex align-items-center">
                            <h5 className="title mr-auto"> Preview Template </h5>
                            {
                                roleslist.map((roles)=>{
                                    if(roles.moduleName == "Templates" && roles.permissionName == "Update"){
                                        return(
                                          <Link to="/templatedetails" className="btn btn-primary btn-lg rounded-s mb-0">  Edit </Link>
                                        )
                                      }     
                                    })
                             }
                            
                            
                        </div>
                        
                </div>

            </div>

            <div className="row">
                <div className="col-md-12">

                    <div className="tab-content">
                        <div className="tab-pane active" id="cont_preview" role="tabpanel"> 
                            <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                           
                                            <div className="col-xl-12">
                                                <div className="card sameheight-item">
                                                    <div className="card-block">
                                                        <ul className="nav nav-tabs nav-tabs-bordered">
                                                            <li className="nav-item">
                                                                <a href="#contractPrev" className="nav-link active" data-target="#contractPrev" data-toggle="tab" aria-controls="contractPrev" role="tab">Template Preview</a>
                                                            </li>
                                                            
                                                        </ul>
                                                        
                                                        <div className="tab-content tabs-bordered">
                                                            <div className="tab-pane active p-4" id="contractPrev">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                         <div className="form-group d-flex">
                                                                            <label className="form-control-label text-xs-right"> Template Title: </label>
                                                                            <div className="ml-2">{singletemplate.template.title}</div>
                                                                        </div>

                                                                        <div className="form-group d-flex">
                                                                            <label className="form-control-label text-xs-right"> Module Name: </label>
                                                                            <div className="ml-2">{singletemplate.template.formName}</div>
                                                                        </div>

                                                                        

                                                                        <div className="form-group d-flex">
                                                                            <label className="form-control-label text-xs-right"> Template Name: </label>
                                                                            <div className="ml-2">{singletemplate.template.name}</div>
                                                                        </div>

                                                                        <div className="form-group d-flex">
                                                                            <label className=" form-control-label text-xs-right"> Organization name:  </label>
                                                                            <div className="ml-2">{singletemplate.template.orgName}</div>
                                                                        </div>
                                                                        <div className="form-group d-flex">
                                                                            <label className=" form-control-label text-xs-right"> Template Version: </label>
                                                                            <div className="ml-2"></div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-10 m-auto pt-5 pb-5">
                                                                        <h4>Template Preview</h4>
                                                                        <div  dangerouslySetInnerHTML={{__html: singletemplate.template.html}} ></div>
                                                                        <p></p>
                                                                        <p></p>
                                                                        
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
                        
                    </div>



                    
                            


                        
                </div>
            </div>

        </div>

                
            </div>
        )
    }
}

export default PreviewTemplate;





 