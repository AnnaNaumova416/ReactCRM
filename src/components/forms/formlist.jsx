import React from 'react';
import { Link } from 'react-router';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';
import * as TemplateAction from '../../actions/templateAction.jsx';
import TemplateStore from '../../store/templateStore.jsx';
import action from './aggridactions.jsx';
class FormList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formlist: [],
            organizationlist: {},
            templatelist: {
                templates: []
            },
            columnDefs: FormList.createColumnDefs()

        };


        this._templateStoreChange = this._templateStoreChange.bind(this);
        this.createRowData = this.createRowData.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
        
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;

        this.gridApi.sizeColumnsToFit();
    }
    componentWillMount() {
        TemplateStore.on('change', this._templateStoreChange);
    }

    componentWillUnmount() {
        TemplateStore.removeListener('change', this._templateStoreChange);
    }

    componentDidMount() {
        TemplateAction._getFormList();
    }

    _templateStoreChange(type) {
        if (type == 'FormList') {
            let formlist = TemplateStore._getFormDetailsList() || {};
            console.log("form list response", formlist);
            this.setState({ formlist });
        }
        if (type == 'OrganizationList') {
            let organizationlist = TemplateStore._getOrganizionDetailsList() || {};
            this.setState({ organizationlist });
        }
        if (type == 'TemplateList') {
            let templatelist = TemplateStore._getTemplateDetailsList() || {};
            this.setState({ templatelist });
        }
    }

    _handleFormSelection(name) {
        let data = {
            name: name,
        };
        console.log("data", data);
        TemplateAction._deleteForm(data);
    }

    createRowData() {
        return this.state.formlist.forms;
    }
    static createColumnDefs() {             
        return [
            /*{
                headerName: "Form ID",
                field: "id",
                width: 250
            },*/
            {
                headerName: "Form Name",
                field: "name",
                width: 250
            },
            {
                headerName: "Created By",
                field: "createdBy",
                width: 200
            },
            {
                headerName: "Created By Name",
                field: "createdBy",
                width: 250
            },
            {
                headerName: "Status",
                field: "status",
                width: 200
            },
            {
                headerName: "Created Date",
                field: "createdAt",
                width: 250
            },
            /*{
                headerName: "Last Modified",
                field: "updatedAt",
                width: 200
            },*/
            {
                headerName: "Actions",
                field: "id",
                cellRendererFramework: action,
                width: 250
            }
        ];

    }



    render() {
        let containerStyle = {
            height: 400
        };
        return (
            <div>
                <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
                <aside className="content_block">
                <div className="title-block">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center">
                            <h5 className="title mr-auto"> Form List </h5>

                        </div>
                    </div>
                </div>
                <br />
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
                                    rowData={this.state.formlist.forms}
                                    columnDefs={this.state.columnDefs}
                                    // events
                                    //paginationAutoPageSize={true}
                                    pagination = {true}
                                    onGridReady={this.onGridReady}
                                    enableSorting
                                    enableFilter>

                                </AgGridReact>
                            </div>
                            
                            
                            
                            
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
                                <button type="button" className="btn btn-primary" data-dismiss="modal" >Yes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            </div>
                        </div>

                    </div>

                </div>
               </aside> 
            </div>
        )
    }
}

export default FormList;