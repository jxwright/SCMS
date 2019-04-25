import React, { Component } from 'react';
import { Tab, DatePicker } from '@alifd/next';
import IceContainer from '@icedesign/container';
import Track from './Track';
import Scheme from './Scheme';
import MapContainer from '../../../../components/MapContainer';
const TabPane = Tab.Item;

const tabs = [
  { tab: '摄像头分布', key: 'track', content: <MapContainer /> },
  { tab: '摄像头列表', key: 'scheme', content: <Scheme /> },
];

function handleChange(key) {
  console.log('change', key);
}

function handleClick(key) {
  console.log('click', key);
}

export default class TabFilterTable extends Component {
  static displayName = 'TabFilterTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IceContainer style={styles.container}>
        <Tab
          onChange={handleChange}
        >
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} title={item.tab} onClick={handleClick}>
                {item.content}
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '0px',
    padding: '10px 0',
  },
};
