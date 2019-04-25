import React, { Component } from 'react';
import TabFilterTable from './components/TabFilterTable';

export default class CameraManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="camera-management-page">
        {/* 适用于标签页和表格组合的展示 */}
        <TabFilterTable />
      </div>
    );
  }
}
