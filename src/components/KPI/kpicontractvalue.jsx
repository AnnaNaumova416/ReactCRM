import React, { PropTypes, Component } from 'react';
import { render,  ReactDOM } from 'react-dom';
import { Link } from 'react-router';
import {IndexLink} from 'react-router';
import { DoubleArcKpi, ArcKpi, HalfArcKpi } from '../src/index.jsx';

const halfArcValue = {
  value: 50,
  range: [0, 0],
  outer: 0.95,
  inner: 0.7,
  fill: '#994',
};


class KPIContractValue extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      value: halfArcValue,
    };
  }

  

  render() {
    return (
      <div
        style={{ width: '20%', height: '200px' }}
        
      >
        <HalfArcKpi
          responsive
          decimal
          animationTime={1500}
          animationEase="easeCubicInOut"
          background={{
            inner: 0.70,
            outer: 0.95,
            fill: '#bbb',
            stroke: '#999',
          }}
          value={this.state.value}
          postfix=""
          legend="Contract Value"
          legendText={{
            fontSize: 0.1,
          }}
          valueText={{
            fontSize: 0.55,
          }}
          postfixText={{
            fontSize: 0.25,
          }}
        />
     </div>
    );
  }
}

export default KPIContractValue;


