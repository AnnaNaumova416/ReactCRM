import React , {Component} from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class FormField extends Component{
  constructor(props){
    super(props);
  }

  setInputField(){
    let inputField = <input type="text" className="form-control box_ip col-sm-3" placeholder={this.props.configs.fieldName} id="Subscription Amount" onChange={this.props.onChange} name='Subscription Amount' value={this.props.value} />;

    switch (this.props.configs.fieldDataType){
      case "integer":{
        inputField = <input type="number" className="form-control box_ip col-sm-3" placeholder={this.props.configs.fieldName} id={this.props.configs.fieldName} onChange={this.props.onChange} name='Subscription Amount' value={this.props.value} />;
        return inputField;
      }
      case "string":{
        inputField = <input type="text" className="form-control box_ip col-sm-3" placeholder={this.props.configs.fieldName} id={this.props.configs.fieldName} onChange={this.props.onChange} name='Subscription Amount' value={this.props.value} />;
        return inputField;
      }
      case "date": {
        inputField = <DatePicker
            className="form-control box_ip col-sm-3"
            selected={this.props.value}
            onChange={(input) => this.props.onChange(input, this.props.configs.fieldName, true )}
            id={this.props.configs.fieldName}
          />;
        return inputField;
      }
      default:{
        return inputField;
      }
    }
  }

  render(){

    return (
      <div>
        <label className="form-control-label col-sm-3 text-xs-right"> {this.props.configs.fieldName} </label>
        
          {this.setInputField()}
       
      </div>
    );
  }
}
