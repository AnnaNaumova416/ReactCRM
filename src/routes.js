import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import loginPage from './components/login/login.component.jsx';  //eslint-disable-line import/no-named-as-default
import dashboard from './components/dashboard';

import clientList from './components/client/clientlist.component.jsx';
import ClientDetails from './components/client/clientdetails.jsx';
import TemplateList from './components/template/templatelist.jsx';
import TemplateDetails from './components/template/templatedetails.jsx';
import ContractList from './components/contract/contractlist.jsx';
import ContractDetails from './components/contract/contractdetails.jsx';
import FormList from './components/forms/formlist.jsx';
import FormDetails from './components/forms/formdetails.jsx';
import Home from './components/Home/home.jsx';
import Report from './components/report/report.jsx';
import PreviewClientDetails from './components/client/previewclientdetails.jsx';
import PreviewUserDetails from './components/users/previewuserdetails.jsx';
import PreviewTeamDetails from './components/teams/previewteamdetails.jsx';

import PreviewContract from './components/contract/previewContract.jsx';
import PreviewTemplate from './components/template/previewTemplate.jsx';
import TeamList from './components/teams/teamlist.jsx';
import TeamDetails from './components/teams/teamdetails.jsx';
import User from './components/users/users.jsx';
import Roles from './components/roles/roles.jsx';
import PreviewRoles from './components/roles/previewrole.jsx';
/*import KPIContractValue from './components/KPI/kpicontractvalue.jsx';
import KPI2 from './components/KPI/kpi2.jsx';*/
import OrganizationsUnit from './components/organizationUnit/organizationlist.jsx';
import PreviewOrgDetails from './components/organizationUnit/previeworgdetails.jsx';
import TabContract from './components/contract/tabcontract.jsx';
// import Panda from './panda.jsx';

export default (
        <Route component={App}>
            <Route path="/" >
                <IndexRoute component={loginPage} />
            </Route>
            
            <Route path="/dashboard" component={dashboard} >
            
                <Route path="/home" component={Home} />
                 <Route path="/report" component={Report} />
                <Route path="/clients" component={clientList} />
                <Route path="/clientdetails" component={ClientDetails} />
                <Route path="/templatelist" component={TemplateList} />
                <Route path="/templatedetails" component={TemplateDetails} />
                <Route path="/contractlist" component={ContractList} />
                <Route path="/contractdetails" component={ContractDetails} />
                <Route path="/formlist" component={FormList} />
                <Route path="/formdetails" component={FormDetails} />
                <Route path= "/previewclientdetails" component={PreviewClientDetails}/>
                <Route path= "/previewContract" component={PreviewContract}/>
                <Route path= "/previewTemplate" component={PreviewTemplate}/>
                 
                 <Route path= "/users" component={User}/>
                 <Route path= "/roles" component={Roles}/>
                 <Route path= "/previewrole" component={PreviewRoles}/>
                 <Route path= "/organizationlist" component={OrganizationsUnit}/>
                 <Route path= "/previeworgdetails" component={PreviewOrgDetails}/>
                 
                 <Route path= "/previewteamdetails" component={PreviewTeamDetails}/>
                 <Route path= "/teamlist" component={TeamList}/>
                 <Route path= "/teamdetails" component={TeamDetails}/>
                 <Route path= "/tabcontract" component={TabContract}/>
                 <Route path= "/previewuserdetails" component={PreviewUserDetails}/>
            </Route>
        </Route>
    );
