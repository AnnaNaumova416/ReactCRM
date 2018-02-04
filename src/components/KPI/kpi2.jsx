import React, { PropTypes, Component } from 'react';
import { render,  ReactDOM } from 'react-dom';
import { Link } from 'react-router';
import {IndexLink} from 'react-router';
import { DoubleArcKpi, ArcKpi, HalfArcKpi } from '../src/index.jsx';

const singleValue = {
  value: 50,
  range: [0, 0],
  outer: 0.95,
  inner: 0.93,
  fill: '#eee',
  startAngle: -Math.PI / 2,
  endAngle: (Math.PI * 2) - (Math.PI / 2),
};

class KPI2 extends React.Component {
  constructor() {
    super();
   
    this.state = {
      value: singleValue,
    };
  }

  

  render() {
    return (
      <div
        style={{ width: '20%', height: '200px', background: '#333' }}
        
      >
        <ArcKpi
          responsive
          startAngle={0}
          endAngle={Math.PI * 2}
          animationEase="easeCubicInOut"
          animationTime={1500}
          background={{
            inner: 0,
            outer: 0.95,
            fill: '#000',
          }}
          backgroundValue={{
            inner: 0.93,
            outer: 0.95,
            fill: '#555',
          }}
          value={this.state.value}
          postfix=""
          legend="Contract Value"
          legendText={{
            fill: '#ff615e',
            fontSize: 0.15,
          }}
          valueText={{
            fill: '#ff615e',
            fontSize: 0.65,
          }}
          postfixText={{
            fill: '#ff615e',
            fontSize: 0.15,
          }}
        />
      </div>
    );
  }
}

export default KPI2;


