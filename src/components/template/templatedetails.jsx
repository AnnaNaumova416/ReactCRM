import React from 'react';
import { Link } from 'react-router';
import CKEditor from "react-ckeditor-component";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class TemplateDetails extends React.Component {
    activeEditor;
    constructor(props) {
        super(props);
        this.state = {
           name: '',
           title: '',
           id: '',
           orgname: '-1',
           formname: '-1',
           modulefield: '-1',
           content: " ",
           orgId: '',
           formId: '',
           html: '',
           editorState: EditorState.createEmpty(),
           formlist: {
            forms: []
           },
           organizationlist: {
            organizations: []
           },
           templatelist: {},
           userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
           singleform: {
            form: {
              fields: []
            }
           },

        };
    this.handleTemplateNameChange = this.handleTemplateNameChange.bind(this);
    this.handleTemplateTitleChange = this.handleTemplateTitleChange.bind(this);
    this.handleorgnameChange = this.handleorgnameChange.bind(this);
    this.handleModulenameChange = this.handleModulenameChange.bind(this);
    this.handleModulefieldChange = this.handleModulefieldChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.insertIntoTemplate = this.insertIntoTemplate.bind(this);
    this._createTemplateDetails = this._createTemplateDetails.bind(this);
    this._templateStoreChange = this._templateStoreChange.bind(this);
    this._userStoreChange = this._userStoreChange.bind(this);
    }

     componentWillMount() {
      const details = TemplateStore._getSingleTemplate();      
      if(Object.keys(details).length) {
        this.setState({...details.template, old: true});
      }
      TemplateStore.on('change', this._templateStoreChange);
      UserStore.on('change', this._userStoreChange);
     }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
        UserStore.removeListener('change', this._userStoreChange);

     }

    componentDidMount() {
       TemplateAction._getOrganizationList();
       TemplateAction._getFormList();
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
    if(type == 'SingleForm'){
        let singleform = TemplateStore._getSingleForm() || {};
        this.setState({singleform});
        console.log("singleform", singleform.form.fields);
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


   insertIntoTemplate() {
        this.activeEditor.insertText("$$" + this.state.modulefield + "$$");
    }

    onFocus(evt) {
       console.log(evt);
        console.log("htmltag <p> ", evt.editor._.data);
        this.activeEditor = evt.editor;
       
    }

    onChange(evt){
      
      var newContent = evt.editor.getData();
      this.setState({content: newContent});
      console.log("CKEditor content",newContent);
      
    }

    handleTemplateTitleChange(e){
        this.setState({title: e.target.value});
        console.log(e.target.value);
    }

    handleTemplateNameChange(e){
        this.setState({name: e.target.value});
        console.log(e.target.value);
    }
    
    handleorgnameChange(e){
        this.setState({orgname: e.target.value});
        console.log(e.target.value);
    }
    
   handleModulenameChange(e){
        this.setState({formname: e.target.value});
        let data = {
            id: e.target.value,
        };

        TemplateAction._getSingleForm(data);
     }

    handleModulefieldChange(e){
        this.setState({modulefield: e.target.value});
        console.log(e.target.value);
    }

    _createTemplateDetails(e){
      
        e.preventDefault();
        
        let data = {
          name : this.state.name,
          title : this.state.title,
          orgId : "5a6824bf9e2f8e3e664984ca",
          formId: this.state.old ? this.state.formId : this.state.formname,
          html:   this.state.old ? this.state.content : this.state.content,
          id: this.state.id,
         };

         

         if(this.state.old) {
            TemplateAction._updateTemplateDetails(data);
          }else{
          TemplateAction._createTemplateDetails(data);
          }
        
        
        
     } 
    


render() {
    const { editorState } = this.state;
    let roleslist = this.state.userroleslist.user.role.permission || {};
     
     console.log("content",this.state.content);
     console.log("html",this.state.html);
        return (
            <div> 
                   <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
                    <div className="content_block">
                    <div className="title-block">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center">
                                <h5 className="title mr-auto"> Create/Edit Template </h5>
                                
                                <div>
                                {
                                  roleslist.map((roles)=>{
                                    if(roles.moduleName == "Templates" && roles.permissionName == "Create"){
                                      return(
                                      <button type="submit" className=" ml-2 mr-0 btn btn-primary" onClick={this._createTemplateDetails}> &nbsp; {this.state.old ? 'Update' : 'Submit'} </button>
                                      )
                                        }   
                                    })
                                 }  
                                      
                                <Link to="/templatelist" type="close" className=" ml-2 mr-0 btn btn-primary"> Close </Link>
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row d-flex align-items-center">
                        <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Template Title:</label>
                        <div className="col-sm-3">
                            <input  className="form-control box_ip" id=" " placeholder="Template Title" type="text"
                                onChange={this.handleTemplateTitleChange} name='Client Title' value={this.state.title} />
                        </div>
                    
                        <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Template Name:</label>
                        <div className="col-sm-3">
                            <input className="form-control box_ip" id=" " placeholder="Template Name" type="text"
                                onChange={this.handleTemplateNameChange} name='Client Name' value={this.state.name} />
                        </div>

                          {/*<label className="col-sm-2 form-control-label text-xs-right"> Organization Name: </label>
                            <div className="col-sm-2">
                                <select className="c-select form-control box_ip" onChange={this.handleorgnameChange} value={this.state.old ? this.state.orgId : this.state.orgname}>
                                      <option value='-1' disabled>Select Organization</option>
                                     {this.state.organizationlist.organizations.map((el,i) => <option key={i} value={el.id}>{el.name}</option>)} 
                                  
                                 </select>
                            </div>*/}
                    </div>


                  <div className="form-group row d-flex align-items-center">
                            <label className="col-sm-2 form-control-label text-xs-right"> Module Name: </label>
                            <div className="col-sm-3">
                                <select className="c-select form-control box_ip" onChange={this.handleModulenameChange} value={this.state.old ? this.state.formId: this.state.formname}>
                                    <option value='-1' disabled>Select Form</option>
                                    {this.state.formlist.forms.map((el,i) => <option key={i} id={el.id} value={el.id}>{el.name}</option>)}
                                     
                                </select>
                            </div>

                            <label className="col-sm-2 form-control-label text-xs-right"> Module Field Name: </label>
                            <div className="col-sm-3">
                                <select className="c-select form-control box_ip" onChange={this.handleModulefieldChange} value={this.state.modulefield}>
                                    <option value='-1' disabled>Select Field</option>

                                    <option >Subscription Amount</option>
                                    <option >Created Date</option>
                                    <option >Contract Start Date</option>
                                    <option >Contract End Date</option>
                                    
                                    <option >Agent Name</option>
                                    <option >Agent NRIC/Passport Number</option>
                                    <option >No of Preference Shares</option>
                                    <option >Monthly Profit pay by Company</option>
                                    <option>First Pay out Date</option>
                                    <option >Last Pay out Date </option>
                                    <option >Subscription Amount Payback Date</option>
                                    <option >Contract Value </option>
                                    <option >Client Name </option>
                                    <option >Client NRIC number </option>
                                    <option >Client address </option>
                                    <option >Client email </option>
                                    <option >Client attn </option>
                                    <option >Monthly Subscription amount Payback </option>
                                    <option >Total Profit percentage </option>
                                    <option >Profit amount </option>
                                    <option >Monthly profit percentage </option>
                                    <option >Additional profit percentage </option>
                                    <option >Extension amount </option>
                                    <option >Additional profit amount </option>
                                    <option >Contract Id </option>
                                    <option >Agent Id </option>
                                    <option >Client Id </option>
                                    <option >Template Id </option>
                                    <option >Contract Months </option>
                                    <option >Organization Name </option>

                                    
                                    <option >Company email </option>
                                    <option >Company attn </option>
                                    <option >Witness 1 NRIC number </option>
                                    <option >Witness 2 NRIC number </option>
                                    <option >Witness-1 Name</option>

                                    <option >Witness-2 Name</option>
                                    <option >Agent Signature</option>
                                    <option >Client Signature</option>
                                    <option >Witness-1 Signature</option>
                                    <option >Witness-2 Signature</option>
                                    
                              </select>
                            </div>
                            {
                                  roleslist.map((roles)=>{
                                    if(roles.moduleName == "Templates" && roles.permissionName == "Create"){
                                      return(
                                      <button type="Insert" className=" ml-2 mr-0 btn btn-primary" onClick={this.insertIntoTemplate}> Insert Into Template </button>
                                      )
                                        }   
                                    })
                                 }  
                            
                        </div>



                
                <form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Body </button>
                      <div className="form-group">
                           <CKEditor activeClass="editor" content={this.state.old ? this.state.html : this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/> 
                     </div>
                     
                </form>
                </div>

                {/*<form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Body </button>
                    <div className="form-group">
                       <CKEditor activeClass="editor" content={this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/>
                    </div>
                   
                </form>  

                <form name="item">
                    <button type="Insert" className=" ml-2 mr-0 btn btn-primary"> Footer </button>
                      <div className="form-group">
                       <CKEditor activeClass="p10" content={this.state.content}  events={{"change": this.onChange, "focus": this.onFocus}}/>
                    </div>
                    
                </form>*/}

             </div>

        )
    }
}

export default TemplateDetails;





 