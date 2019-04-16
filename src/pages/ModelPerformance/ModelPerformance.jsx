import React, { Component } from 'react';
import { Grid } from '@alifd/next';
import Overview from './components/Overview';
import ModelList from './components/ModelList';
import ModelService from './components/ModelService';
import UseQuantity from './components/UseQuantity';
import Performance from './components/Performance';
import MapPerform from './components/MapPerform';
import { Message, Button, Dialog } from '@alifd/next';
const { Row, Col } = Grid;
const videoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
    type: 'application/x-mpegURL'
  }]
}

export default class ModelPerformance extends Component {
  static displayName = 'ModelPerformance';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.token = parseInt(Math.random() * 10000000000);
        this.websocket = new WebSocket("ws://192.0.0.66:9199/mds/websocket/admin/" + this.token);
        this.websocket.onerror = function () {
            Message.error('webSocket连接失败');
        };

        //连接成功建立的回调方法
        this.websocket.onopen = function (event) {
            Message.success('webSocket连接成功');
        }
        //接收到消息的回调方法
        this.websocket.onmessage = evt => {
            self.overlay.setPosition(undefined);
            let result = JSON.parse(evt.data);
            Message.success('获得案件报警消息');
            //[115.91571807861324,28.671310915880824]
            let coordinates = fromLonLat([Math.random() * (116 - 115 + 1) + 115, Math.random() * (29 - 28 + 1) + 28]);
            let pFeature = new Feature();
            pFeature.setStyle(new Style({
                image: new Circle({
                    //半径
                    radius: 6,
                    //填充
                    fill: new Fill({
                        color: '#3399CC'
                    }),
                    //边界线
                    stroke: new Stroke({
                        color: '#fff',
                        width: 2
                    })
                })
            }));

            pFeature.setGeometry(coordinates ?
                new Point(coordinates) : null);
            this.layer.getSource().addFeature(pFeature);
            this.map.getView().animate({
                zoom: 7,
                center: coordinates,
                duration: 2000
            }, function () {
                //设置弹出框内容，可以HTML自定义 
                // 	content.innerHTML = "<p>你点击的坐标为：" + coodinate + "</p>";
                //设置overlay的显示位置 
                self.overlay.setPosition(coordinates);
                //显示overlay 
                self.map.addOverlay(self.overlay);
                self.showImg('1903220815497955');
            });


        }

        //连接关闭的回调方法
        this.websocket.onclose = function () {
            Message.notice('webSocket连接关闭');
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            websocket.close();
        }
  }
  cutView = () => {
    this.setState({caseMsg: '{"topic":"ssss"}'})
  }
  render() {
    const {caseMsg,test} = this.state
    return (
      <Row gutter="20" wrap>
        <Col l="24" xxs="24">
          <Overview />
        </Col>
        <Col l="18">
        <Button  onClick={this.cutView}
            >截图</Button>
          <MapPerform caseData={caseMsg}/>
          <ModelService/>
          <Performance  />
        </Col>
        <Col l="6">
          <ModelList  caseData={caseMsg}/>
        </Col>
        
      </Row>
    );
  }
}
