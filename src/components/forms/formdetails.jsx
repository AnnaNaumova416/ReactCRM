import React from 'react';
import { Link} from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class FormDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contractstartDate: '',
            contractendDate: '',
            firstpayoutDate: '',
            lastpayoutDate: '',
            subscriptionamountpayDate: '',
            agentname: '',
            subscriptionamount: '',
            passportnumber: '',
            sharescount: '',
            monthlyprofitpay: '',
            currency: '',
            TemplateId: '',
            contractMonths: '',
            clientShareholderName: '',
            ClientNRICNumber: '',
            ClientAddress: '',
            clientemail: '',
            ClientAttn: '',
            Quarterpercentage: '',
            TotalProfitPercentage: '',
            Profitamount: '',
            MonthlyProfitPercentage: '',
            AdditionalProfitPercentage: '',
            ExtensionAmount: '',
            AdditionalProfitAmount: '',
            Companyemail: '',
            Companyattn: '',
            FirstWitnessNRICnumber: '',
            SecondWitnessNRICnumber: '',
            Witness1Name: '',
            Witness2Name: '',
            formId: '',
           

        };
       this.handleContractStartDateChange = this.handleContractStartDateChange.bind(this);
       this.handleContractEndDateChange = this.handleContractEndDateChange.bind(this);
       this.handleFirstPayoutDateChange = this.handleFirstPayoutDateChange.bind(this);
       this.handleLastPayoutDateChange = this.handleLastPayoutDateChange.bind(this);
       this.handleSubscriptionamountPayDateChange = this.handleSubscriptionamountPayDateChange.bind(this);
       this.handleAgentNameChange = this.handleAgentNameChange.bind(this);
       this.handleSubscrtiptionAmountChange = this.handleSubscrtiptionAmountChange.bind(this);
       this.handlePassportNumberChange = this.handlePassportNumberChange.bind(this);
       this.handleSharesCountChange = this.handleSharesCountChange.bind(this);
       this.handleMonthlyProfitPayChange = this.handleMonthlyProfitPayChange.bind(this);
       this.handleContractValueChange = this.handleContractValueChange.bind(this);
       this.handleTemplateIdChange = this.handleTemplateIdChange.bind(this);
        this.handleContractMonthsChange = this.handleContractMonthsChange.bind(this);
        this.handleWitness1NameChange = this.handleWitness1NameChange.bind(this);
        this.handleWitness2NameChange=this.handleWitness2NameChange.bind(this);
        this.handleClientShareHolderNameChange=this.handleClientShareHolderNameChange.bind(this);
        this.handleClientNRICNumberChange=this.handleClientNRICNumberChange.bind(this);
        this.handleClientAddressChange=this.handleClientAddressChange.bind(this);
        this.handleClientEmailChange=this.handleClientEmailChange.bind(this);
        this.handleClientAttnChange=this.handleClientAttnChange.bind(this);
        this.handleQuarterPercentageChange=this.handleQuarterPercentageChange.bind(this);
        this.handleTotalProfitPercentageChange=this.handleTotalProfitPercentageChange.bind(this);
        this.handleProfitamountChange=this.handleProfitamountChange.bind(this);
        this.handleMonthlyProfitPercentageChange=this.handleMonthlyProfitPercentageChange.bind(this);
        this.handleAdditionalProfitPercentageChange=this.handleAdditionalProfitPercentageChange.bind(this);
        this.handleExtensionAmountChange=this.handleExtensionAmountChange.bind(this);
        this.handleAdditionalProfitAmountChange=this.handleAdditionalProfitAmountChange.bind(this);
        this.handleCompanyemailChange=this.handleCompanyemailChange.bind(this);
        this.handleCompanyattnChange=this.handleCompanyattnChange.bind(this);
        this.handleFirstWitnessNRICnumberChange=this.handleFirstWitnessNRICnumberChange.bind(this);
        this.handleSecondWitnessNRICnumberChange=this.handleSecondWitnessNRICnumberChange.bind(this);
        this.handleFormIdChange = this.handleFormIdChange.bind(this);
     }


    handleContractStartDateChange(date) {
     this.setState({contractstartDate: date});
     console.log(date);
      }

     handleContractEndDateChange(date) {
     this.setState({contractendDate: date});
     console.log(date);
      }
      
     handleFirstPayoutDateChange(date) {
     this.setState({firstpayoutDate: date});
     console.log(date);
      }
      
       handleLastPayoutDateChange(date) {
     this.setState({lastpayoutDate: date});
     console.log(date);
      }

       handleSubscriptionamountPayDateChange(date) {
     this.setState({subscriptionamountpayDate: date});
     console.log(date);
      }    

      handleAgentNameChange(e){
       this.setState({agentname: e.target.value});
       console.log(e.target.value);
      }

      handleSubscrtiptionAmountChange(e){
        this.setState({subscriptionamount: e.target.value});
       console.log(e.target.value);

      }
      
      handlePassportNumberChange(e){
        this.setState({passportnumber: e.target.value});
       console.log(e.target.value);

      }
      handleSharesCountChange(e){
        this.setState({sharescount: e.target.value});
       console.log(e.target.value);

      }
      handleMonthlyProfitPayChange(e){
        this.setState({monthlyprofitpay: e.target.value});
       console.log(e.target.value);

      }
      handleContractValueChange(e){
        this.setState({currency: e.target.value});
       console.log(e.target.value);

      }

      handleTemplateIdChange(e) {
        this.setState({ TemplateId: e.target.value });
        console.log(e.target.value);
    }
    handleContractMonthsChange(e) {
        this.setState({ contractMonths: e.target.value });
        console.log(e.target.value);
    }
    handleWitness1NameChange(e) {
        this.setState({ Witness1Name: e.target.value });
        console.log(e.target.value);
    }
      handleWitness2NameChange(e) {
        this.setState({ Witness2Name: e.target.value });
        console.log(e.target.value);
      }
      handleClientShareHolderNameChange(e){
        this.setState({clientShareholderName: e.target.value});
       console.log(e.target.value);

      }
      handleClientNRICNumberChange(e){
        this.setState({ClientNRICNumber: e.target.value});
       console.log(e.target.value);

      }
      handleClientAddressChange(e){
        this.setState({ClientAddress: e.target.value});
       console.log(e.target.value);

      }
      handleClientEmailChange(e){
        this.setState({clientemail: e.target.value});
       console.log(e.target.value);

      }
      handleClientAttnChange(e){
        this.setState({ClientAttn: e.target.value});
       console.log(e.target.value);

      }
      handleQuarterPercentageChange(e){
        this.setState({Quarterpercentage: e.target.value});
       console.log(e.target.value);

      }
      handleTotalProfitPercentageChange(e){
        this.setState({TotalProfitPercentage: e.target.value});
       console.log(e.target.value);

      }
      handleProfitamountChange(e){
        this.setState({Profitamount: e.target.value});
       console.log(e.target.value);

      }
       handleMonthlyProfitPercentageChange(e){
        this.setState({MonthlyProfitPercentage: e.target.value});
       console.log(e.target.value);

      }

      handleAdditionalProfitPercentageChange(e){
        this.setState({AdditionalProfitPercentage: e.target.value});
       console.log(e.target.value);

      }
      handleExtensionAmountChange(e){
        this.setState({ExtensionAmount: e.target.value});
       console.log(e.target.value);

      }
      handleAdditionalProfitAmountChange(e){
        this.setState({AdditionalProfitAmount: e.target.value});
       console.log(e.target.value);

      }
      handleCompanyemailChange(e){
        this.setState({Companyemail: e.target.value});
       console.log(e.target.value);

      }
      handleCompanyattnChange(e){
        this.setState({Companyattn: e.target.value});
       console.log(e.target.value);

      }
      handleFirstWitnessNRICnumberChange(e){
        this.setState({FirstWitnessNRICnumber: e.target.value});
       console.log(e.target.value);

      }
      handleSecondWitnessNRICnumberChange(e){
        this.setState({SecondWitnessNRICnumber: e.target.value});
       console.log(e.target.value);

      }

      handleFormIdChange(e){
         this.setState({formId: e.target.value});
       console.log(e.target.value);

      }

   

      
    render() {
        return (
            <div> 
            <div class="sidebar-overlay" id="sidebar-overlay"></div>
                <div class="sidebar-mobile-menu-handle" id="sidebar-mobile-menu-handle"></div>
                <div class="mobile-menu-handle"></div>
             <div className="content_block">   
            	<div className="title-block">
                        <h5 className="title"> Create Form 
                            <span className="sparkline bar" data-type="bar"></span>
                        </h5>
                    </div>
                    <form name="item">
                        <div className="card">
                          <div className="card-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className=" form-control-label text-xs-right"> Form ID: </label>
                                        <div className="col-sm-8 ml-2">
                                        <input type="text" className="form-control box_ip" placeholder="Form ID" onChange={this.handleFormIdChange} name='' value={this.state.formId}/>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Created Date: </label>
                                        <div className="col-sm-8 ml-2">
                                           <input type="text" className="form-control box_ip" placeholder="Created Date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group d-flex">
                                        <label className="form-control-label text-xs-right"> Last Editor Date: </label>
                                        <div className=" col-sm-8 ml-2">
                                             <input type="text" className="form-control box_ip" placeholder="Last Edited Date" />
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Subscription Amount: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Currency" onChange={this.handleSubscrtiptionAmountChange} name='Subscription Amount' value={this.state.subscriptionamount}/></div>
                                       
                                    </div>

                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Agent Name: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Agent Name"
                                    id="Agent Name" onChange={this.handleAgentNameChange} name='Agent Name' value={this.state.agentname} />
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> NRIC/Passport Number: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="NRIC/Passport Number" id="NRIC/Passport Number" onChange={this.handlePassportNumberChange} value={this.state.passportnumber} /> </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> No of Preference Shares: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="No of Shares" id="No of Preference Shares" onChange={this.handleSharesCountChange} value={this.state.sharescount} /> </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Monthly Profit pay by Company: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Monthly Profit pay" id="Monthly Profit pay by Company" onChange={this.handleMonthlyProfitPayChange} value={this.state.monthlyprofitpay} /> </div>
                        </div>


                        <div className="form-group row">

                            <label className="col-sm-2 form-control-label text-xs-right" > Template Id: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder=" Template Id" id="Template Id" onChange={this.handleTemplateIdChange} name='' value={this.state.TemplateId} />
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Contract Months: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Contract Months" id="Contract Months" onChange={this.handleContractMonthsChange} name='' value={this.state.contractMonths} />
                            </div>
                        </div>



                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Client (shareholder) Name: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Client (shareholder) Name" id="Client Name" onChange={this.handleClientShareHolderNameChange} value={this.state.clientShareholderName} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Client NRIC number: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="NRIC number" id="Client NRIC number" onChange={this.handleClientNRICNumberChange} value={this.state.ClientNRICNumber} /> </div>
                                        </div> 


                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Client address: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Client address" id="Client address" onChange={this.handleClientAddressChange} value={this.state.ClientAddress} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Client email: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Client email" id="Client email" onChange={this.handleClientEmailChange} value={this.state.clientemail} /> </div>
                                        </div>

                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Client attn: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Client attn" id="Client attn" onChange={this.handleClientAttnChange} value={this.state.ClientAttn} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Quarter percentage: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Quarter percentage" id="Quarter percentage" onChange={this.handleQuarterPercentageChange} value={this.state.Quarterpercentage} /> </div>
                                        </div>

                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Total Profit percentage: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Profit percentage" id="Total Profit percentage" onChange={this.handleTotalProfitPercentageChange} value={this.state.TotalProfitPercentage} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Profit amount: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Profit amount" id="Profit amount" onChange={this.handleProfitamountChange} value={this.state.Profitamount} /> </div>
                                        </div>

                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Monthly profit percentage: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Profit percentage" id="Monthly profit percentage" onChange={this.handleMonthlyProfitPercentageChange} value={this.state.MonthlyProfitPercentage} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Additional profit percentage: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Additional profit percentage" id="Additional profit percentage" onChange={this.handleAdditionalProfitPercentageChange} value={this.state.AdditionalProfitPercentage} /> </div>
                                        </div>


                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Extension amount: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Extension amount" id="Extension amount" onChange={this.handleExtensionAmountChange} value={this.state.ExtensionAmount} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Additional profit amount: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Additional profit amount" id="Additional profit Amount" onChange={this.handleAdditionalProfitAmountChange} value={this.state.AdditionalProfitAmount} /> </div>
                                        </div>


                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Company email: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Company email" id="Company email" onChange={this.handleCompanyemailChange} value={this.state.Companyemail} /> </div>
                                       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Company attn: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Company attn" id="Company attn" onChange={this.handleCompanyattnChange} value={this.state.Companyattn} /> </div>
                                        </div>


                                        
                                        <div className="form-group row">
                                        <label className="col-sm-2 form-control-label text-xs-right"> Witness 1 NRIC number: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Witness 1 NRIC number" id="Witness 1 NRIC number" onChange={this.handleFirstWitnessNRICnumberChange} value={this.state.FirstWitnessNRICnumber} /> </div>
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Witness 2 NRIC number: </label>
                                        <div className="col-sm-3">
                                            <input type="text" className="form-control box_ip" placeholder="Witness 2 NRIC number" id="Witness 2 NRIC number" onChange={this.handleSecondWitnessNRICnumberChange} value={this.state.SecondWitnessNRICnumber} /> </div>
                                        </div>

                          <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Witness-1 Name: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Witness Name"
                                    id="Witness-1 Name" onChange={this.handleWitness1NameChange} name='Witness-1 Name' value={this.state.Witness1Name} />
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Witness-2 Name: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Witness Name" id="Witness-2 Name" onChange={this.handleWitness2NameChange} value={this.state.Witness2Name} /> </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Contract Value: </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control box_ip" placeholder="Contract Amount" id="Contract Value" onChange={this.handleContractValueChange} value={this.state.currency} />
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                         <label className="col-sm-2 form-control-label text-xs-right"> Contract Start Date: </label>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control box_ip"
                                    selected={this.state.contractstartDate}
                                    onChange={this.handleContractStartDateChange}
                                    id="Contract Start Date"
                                />
                            </div>

                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Contract End Date: </label>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control box_ip"
                                    selected={this.state.contractendDate}
                                    onChange={this.handleContractEndDateChange}
                                    id="Contract End Date"
                                />
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> First Pay out Date: </label>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control box_ip"
                                    selected={this.state.firstpayoutDate}
                                    onChange={this.handleFirstPayoutDateChange}
                                    id="First Pay out Date"
                                />
                            </div>


                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 form-control-label text-xs-right"> Last Pay out Date: </label>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control box_ip"
                                    selected={this.state.lastpayoutDate}
                                    onChange={this.handleLastPayoutDateChange}
                                    id="Last Pay out Date"
                                />
                            </div>

                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <label className="col-sm-2 form-control-label text-xs-right"> Subscription Amount Payback Date: </label>
                            <div className="col-sm-3">
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.subscriptionamountpayDate}
                                    onChange={this.handleSubscriptionamountPayDateChange}
                                    id="Subscription Amount Payback Date"
                                />
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

export default FormDetails;





 