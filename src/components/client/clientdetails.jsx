import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import * as ClientAction from '../../actions/clientAction.jsx';
import ClientStore from '../../store/clientStore.jsx';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import './imageupload.css';
const CLOUDINARY_UPLOAD_PRESET = 'bmzjbxoq';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/react-cloudinary/upload';

class ClientDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            dob: new Date().getTime(),
            nircNumber: '',
            nationality: '',
            residentialStatus: '-1',
            maritalStatus: '-1',
            spouseName: '',
            numberOfChild: '',
            handphoneNumber: '',
            address: '',
            email: '',
            occupation: '',
            workplace: '',
            qualification: '',
            salaryRange: '',
            uploadedFile: null,
            picture: '',
            attention: '',
            userroleslist:{
                user: {
                role: {
                    permission: [],
                },
            }
            },
            

        };
        this.handleClientNameChange = this.handleClientNameChange.bind(this);
        this.handleICnoChange = this.handleICnoChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNationalityChange = this.handleNationalityChange.bind(this);
        this.handleResidentialStatusChange = this.handleResidentialStatusChange.bind(this);
        this.handleMartialStatusChange = this.handleMartialStatusChange.bind(this);
        this.handleSpouseNameChange = this.handleSpouseNameChange.bind(this);
        this.handleChildrenChange = this.handleChildrenChange.bind(this);
        this.handleHandphoneNumberChange = this.handleHandphoneNumberChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleEmailIDChange = this.handleEmailIDChange.bind(this);
        this.handleOccupationChange = this.handleOccupationChange.bind(this);
        this.handleWorkplaceChange = this.handleWorkplaceChange.bind(this);
        this.handleQualificationChange = this.handleQualificationChange.bind(this);
        this.handleSalaryRanceChange = this.handleSalaryRanceChange.bind(this);
        this._clientStoreChange = this._clientStoreChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleClientAttnChange = this.handleClientAttnChange.bind(this);
        this._userStoreChange = this._userStoreChange.bind(this);
     }


    componentWillMount() {
      const details = ClientStore._getSingleClientDetails();      
      if(Object.keys(details).length) {
        this.setState({...details.client, old: true});
      }
      
      ClientStore.on('change', this._clientStoreChange);
      UserStore.on('change', this._userStoreChange);
     }

    componentWillUnmount() {
        ClientStore.removeListener('change', this._clientStoreChange);
        UserStore.removeListener('change', this._userStoreChange);
     }

    componentDidMount() {
       UserAction._getUserRolesList();
    }

    _clientStoreChange(type){
        if(type == 'ClientList'){
        let clientdetails = ClientStore._getClientDeatilsList() || {};
        this.setState({clientdetails});
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

    handleSaveClient(e) {
    e.preventDefault();

    let data = Object.assign({}, this.state);
    console.log("request for createClientDetails", data);
    if(this.state.old) {
      ClientAction._updateClientDetails(data);
    }else{
    ClientAction._createClientDetails(data);
    }
    
    
  }

    handleClientNameChange(e) {
        this.setState({name: e.target.value });
        console.log(e.target.value);
    }

    handleChange(date) {
        this.setState({ dob: date });
        console.log(date);
    }

    handleICnoChange(e) {
        this.setState({ nircNumber: e.target.value });
        console.log(e.target.value);
    }

    handleNationalityChange(e) {
        this.setState({ nationality: e.target.value });
        console.log(e.target.value);
    }

    handleResidentialStatusChange(e) {
        this.setState({ residentialStatus: e.target.value });
        console.log(e.target.value);
    }

    handleMartialStatusChange(e) {
        this.setState({ maritalStatus: e.target.value });
        console.log(e.target.value);
    }

    handleSpouseNameChange(e) {
        this.setState({ spouseName: e.target.value });
        console.log(e.target.value);
    }

    handleChildrenChange(e) {
        this.setState({ numberOfChild: e.target.value });
        console.log(e.target.value);
    }

    handleHandphoneNumberChange(e) {
        this.setState({ handphoneNumber: e.target.value });
        console.log(e.target.value);
    }

    handleAddressChange(e) {
        this.setState({ address: e.target.value });
        console.log(e.target.value);
    }


    handleEmailIDChange(e) {
        this.setState({ email: e.target.value });
        console.log(e.target.value);
    }

    handleOccupationChange(e) {
        this.setState({ occupation: e.target.value });
        console.log(e.target.value);
    }


    handleWorkplaceChange(e) {
        this.setState({ workplace: e.target.value });
        console.log(e.target.value);
    }

    
    handleClientAttnChange(e) {
        this.setState({ attention: e.target.value });
        console.log(e.target.value);
    }

    handleQualificationChange(e) {
        this.setState({ qualification: e.target.value });
        console.log(e.target.value);
    }


    handleSalaryRanceChange(e) {
        this.setState({ salaryRange: e.target.value });
        console.log(e.target.value);
    }

    onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

    handleImageUpload(file) {
   
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
       this.setState({
          picture: response.body.secure_url
        });
       
      }
    });

  }

    

    render() {
        let roleslist = this.state.userroleslist.user.role.permission || {};
        console.log('roleslist',roleslist);
        let clientdetails = ClientStore._getClientDeatilsList() || [];
        return (
            <div>
                <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
                <aside className="content_block">
                <div className="title-block">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center">
                            <h5 className="title mr-auto"> Create/Edit Client </h5>

                            <div>
                               {
                                    roleslist.map((roles)=>{
                                        if(roles.moduleName == "Clients" && roles.permissionName == "Create"){
                                            return(
                                             <a className="btn btn-primary ml-0 mr-2" onClick={this.handleSaveClient.bind(this)} > &nbsp; {this.state.old ? 'Update' : 'Submit'} </a>
                                            )
                                          }     
                                        })
                                 }  
                                
                                <Link to="/clients" className="btn btn-primary" href="/clients"> &nbsp; Close </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <form name="item">
                     <div className="card">
                       <div className="card-body">

                       


                        <div className="form-group row">
                            <label  className="col-sm-2 form-control-label text-xs-right">Client Name:</label>
                                <div className="col-sm-3">
                                    <input className="form-control box_ip" id=" " placeholder="Client Name" type="text"
                                        onChange={this.handleClientNameChange} name='Client Name' value={this.state.name} />
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           <label className="col-sm-2 form-control-label text-xs-right">Date of Birth:</label>
                                <div className="col-sm-3">
                                    <DatePicker

                                        className="form-control box_ip"
                                        selected={moment(new Date(this.state.dob || new Date().getTime).toLocaleString())}
                                        onChange={this.handleChange}
                      
                                    />
                                </div>
                         </div>        
                         <div className="form-group row">
                           <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">IC No:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="IC No" type="text"

                                            onChange={this.handleICnoChange} name='Client Name' value={this.state.nircNumber} />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Nationality:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Nationality" type="text"

                                            onChange={this.handleNationalityChange} name='Client Name' value={this.state.nationality} />
                                    </div>
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Residential Status:</label>
                                    <div className="col-sm-3">
                                        <select className="form-control box_ip" onChange={this.handleResidentialStatusChange} value={this.state.residentialStatus}>
                                            <option value='-1' disabled>Residential Status</option>
                                            <option value="Resident"> Resident </option>
                                            <option value="Non- Resident"> Non- Resident </option>

                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Martial Status:</label>
                                    <div className="col-sm-3">
                                        <select className="form-control box_ip" onChange={this.handleMartialStatusChange} value={this.state.maritalStatus}>
                                            <option value='-1' disabled>Select Martial Status</option>
                                            <option value="Married"> Married </option>
                                            <option value="Unmarried"> Unmarried </option>
                                            <option value="Divorced"> Divorced </option>
                                        </select>
                                    </div>
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Spouse Name:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Spouse Name" type="text"

                                            onChange={this.handleSpouseNameChange} name='Client Name' value={this.state.spouseName} />
                                    </div>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">No of Children:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="No of Children" type="text"

                                            onChange={this.handleChildrenChange} name='Client Name' value={this.state.numberOfChild} />
                                    </div>
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Handphone Number:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Handphone Number" type="text"

                                            onChange={this.handleHandphoneNumberChange} name='Client Name' value={this.state.handphoneNumber} />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Address:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Address" type="text"

                                            onChange={this.handleAddressChange} name='Client Name' value={this.state.address} />
                                    </div>
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Email ID:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Email ID" type="text"

                                            onChange={this.handleEmailIDChange} name='Client Name' value={this.state.email} />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Occupation:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Occupation" type="text"

                                            onChange={this.handleOccupationChange} name='Client Name' value={this.state.occupation} />
                                    </div>
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Place of Work(Company):</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Company work Location" type="text"

                                            onChange={this.handleWorkplaceChange} name='Client Name' value={this.state.workplace} />
                                    </div>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Accademic Qualification:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Accademic Qualification" type="text"

                                            onChange={this.handleQualificationChange} name='Client Name' value={this.state.qualification} />
                                    </div>
                         </div>
                         <div className="form-group row">
                           <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Salary Range:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Salary Rance" type="text"

                                            onChange={this.handleSalaryRanceChange} name='Client Name' value={this.state.salaryRange} />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <label className="col-sm-4 form-control-label text-xs-right"> Profile Pic: </label>
                                    {/*<div className="col-sm-3 d-flex justify-content-end">
                                        <div className="images-container" style={{paddingRight: '100px'}}>
                                            <div className="FileUpload" >
                                              <Dropzone
                                                onDrop={this.onImageDrop.bind(this)}
                                                multiple={false}
                                                accept="image/*">
                                                <div>Drop an image or click to select a file to upload.
                                                    <a className="btn btn-primary ml-0 mr-2" href="">Upload Docs</a>
                                                </div>
                                              </Dropzone>
                                            </div>

                                            <div>
                                              {this.state.picture === '' ? null :
                                              <div>
                                                <p>{this.state.uploadedFile.name}</p>
                                                <img src={this.state.picture} />
                                              </div>}
                                            </div>
                                        </div>
                                    </div>*/}
                         </div>
                         <div className="form-group row">
                            <label htmlFor=" " className="col-sm-2 form-control-label text-xs-right">Client Attn:</label>
                                    <div className="col-sm-3">
                                        <input className="form-control box_ip" id=" " placeholder="Client attn" type="text"

                                            onChange={this.handleClientAttnChange} name='Client Name' value={this.state.attention} />
                                    </div>
                                   
                         </div>

                        
                     </div>
                    </div> 
                </form>
               </aside> 

                <div className="modal fade" id="modal-media">
                    <div className="modal-dialog modal-lg">


                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Media Library</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                            </div>
                            <div className="modal-body modal-tab-container">
                                <ul className="nav nav-tabs modal-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#gallery" data-toggle="tab" role="tab">Gallery</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#upload" data-toggle="tab" role="tab">Upload</a>
                                    </li>
                                </ul>
                                <div className="tab-content modal-tab-content">
                                    <div className="tab-pane fade" id="gallery" role="tabpanel">
                                        <div className="images-container">
                                            <div className="row">
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/brad_frost/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/_everaldo/128.jpg')` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-6 col-sm-4 col-md-4 col-lg-3">
                                                    <div className="image-container">
                                                        <div className="image" style={{ backgroundImage: `url('https://s3.amazonaws.com/uifaces/faces/twitter/eduardo_olv/128.jpg')` }}></div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade active in" id="upload" role="tabpanel">
                                        <div className="upload-container">
                                            <div id="dropzone">
                                                <form action="/" method="POST" enctype="multipart/form-data" className="dropzone needsclick dz-clickable" id="demo-upload">
                                                    <div className="dz-message-block">
                                                        <div className="dz-message needsclick"> Drop files here or click to upload. </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Insert Selected</button>
                            </div>
                        </div>
                        
                    </div>
                  
                </div>

                <div className="modal fade" id="confirm-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    <i className="fa fa-warning"></i> Alert</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure want to do this?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Yes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default ClientDetails;





