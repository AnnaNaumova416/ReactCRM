import React from 'react';
import { Link } from 'react-router';
import * as UserAction from '../../actions/userAction.jsx';
import UserStore from '../../store/userStore.jsx';

class PreviewOrgDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
             singleuserdetails: {
                user: {},
             },
             singleorgunit: {
                organizationunit: {
                    name: '',
                    parentId: '',
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
       UserAction._getOrgUnitList();
    }    

    _userStoreChange(type){
         if(type == 'OrgUnitList'){
        let orgunitlist = UserStore._getOrgUnitList() || {};
        this.setState({orgunitlist});
    }
    if(type == 'SingleOrgUnit'){
        let singleorgunit = UserStore._getSingleOrgunit() || {};
        this.setState({singleorgunit});
    }
 }

render() {
    


        let singleorgunit = this.state.singleorgunit;
        console.log("single org unit  response", this.state.singleorgunit.organizationunit);
        return (
            <div > 
            <div className="content_block">
            	<div className="title-block">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center">
                                <h5 className="title mr-auto"> Preview organizationunit </h5>
                                {/*<Link to="/clientdetails" className="btn btn-primary btn-lg rounded-s mb-0">  Edit </Link>*/}
                                
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
                                        <label className="col-sm-4 form-control-label text-xs-right">  Name: </label>
                                        <div className="col-sm-8 text-right">{singleorgunit.organizationunit.name}</div>
                                    </div>
                                    <div className="form-group row d-flex">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Parent: </label>
                                        <div className="col-sm-8 text-right">{singleorgunit.organizationunit.parentId}</div>
                                    </div>
                                    
                                    
                                    
                                    
                                    
                                    
                                </div>
                                {/*<div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 form-control-label text-xs-right"> Profile Pic: </label>
                                        <div className="col-sm-8 d-flex justify-content-end">
                                            <div className="images-container">
                                                <div className="image-container">
                                                    <a href="#" title="" data-toggle="modal" data-target="#modal-media">
                                                    <div className="image" ></div></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>*/}
                                
                                
                            </div>
                        </div>
                       </div> 
                    </form>
                  </div>  

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

export default PreviewOrgDetails;





 