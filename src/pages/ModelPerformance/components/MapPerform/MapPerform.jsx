import React, { Component, Suspense } from 'react';
import { Message, Button, Dialog } from '@alifd/next';
import { Menu } from '@alifd/next';
import PageLoading from '../../../../components/PageLoading';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import Geolocation from 'ol/Geolocation.js';
import Feature from 'ol/Feature.js';
import Draw from 'ol/interaction/Draw.js';
import Point from 'ol/geom/Point.js';
import { easeIn, easeOut } from 'ol/easing.js';
import { fromLonLat, get, transform } from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { TileJSON, Vector as VectorSource } from 'ol/source.js';
import XYZ from 'ol/source/XYZ.js';
import { Fill, Icon, Stroke, Style, Circle } from 'ol/style.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import axios from 'axios';
import Img from '@icedesign/img';
import 'ol/ol.css';
import './olbasemap.scss';
import videojs from 'video.js'
import StreamedianPlayer from '../../components/StreamedianPlayer';

import 'video.js/dist/video-js.css';

const { SubMenu, Item } = Menu;

export default class MapPerform extends Component {
    // destroy player on unmount

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            videoSrc: '',
        };

    }
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    componentWillReceiveProps(nextprops) {

        let isFunction = false;
        alert(nextprops.caseData+'----1');
        let msg = JSON.parse(nextprops.caseData);
        try {
            isFunction = typeof (eval(msg.topic)) == "function"
        } catch (e) { }

        if (isFunction) {
            Message.warning(nextprops.caseData+' is a Function!');
        } else {
            Message.warning('showFace is not a Function!');
        }
    }

    componentDidMount() {
        let self = this;
        let pop_container = document.getElementById('popup');
        let pop_content = document.getElementById('popup-content');
        let pop_closer = document.getElementById('popup-closer');
        pop_closer.onclick = function () {
            self.overlay.setPosition(undefined);
            pop_closer.blur();
            return false;
        };
        this.overlay = new Overlay({					//弹出框
            element: pop_container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        this.layer = new VectorLayer({
            source: new VectorSource({
                wrapX: false
                // features: [this.positionFeature]//(new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(geojsonObject)
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new Circle({
                    radius: 6,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });

        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8'
                    }),
                    projection: get("EPSG:3857")
                }), this.layer
            ],
            view: new View({
                center: fromLonLat([115.91571807861324, 28.671310915880824]),
                zoom: 14,
            })
        });
        this.geolocation = new Geolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            projection: this.map.getView().getProjection()
        });
        this.map.on('click', function (e) {
            var coor = e.coordinate;
            var lonlat = transform(coor, 'EPSG:3857', "EPSG:4326");
            //    alert("lon:"+lonlat[0].toFixed(2)+",lat:"+lonlat[1].toFixed(2)); 
            //在点击时获取像素区域 
            var pixel = self.map.getEventPixel(e.originalEvent);
            self.map.forEachFeatureAtPixel(pixel, function (feature) {
                //coodinate存放了点击时的坐标信息
                let coodinate = e.coordinate;
                //设置弹出框内容，可以HTML自定义 
                // 	content.innerHTML = "<p>你点击的坐标为：" + coodinate + "</p>";
                //设置overlay的显示位置 
                self.overlay.setPosition(coodinate);
                //显示overlay 
                self.map.addOverlay(self.overlay);
                //      	 var v = map.getLayers().array_;
                //      	 alert(v);
                //      	 alert(v[1].getSource());
                //      	 v[1].getSource().removeFeature(feature);
                //          http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8
                //application/x-mpegURL
                /*  self.player = videojs('showVideo', {
                      autoplay: false,
                      controls: true,
                      height: 300,
                      width: 300,
                      sources: [{
                          src: 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov',
                          type: 'application/x-rtsp'
                      }]
                  }, function onPlayerReady() {
                      videojs.log('Your player is ready!');
  
                      // In this context, `this` is the player that was created by Video.js.
                      this.play();
  
                      // How about an event listener?
                      this.on('ended', function () {
                          videojs.log('Awww...over so soon?!');
                      });
                  });
              */


            });
        })
        this.map.on('change:target', function (e) {
            alert(1);

        });
        this.geolocation.on('change:position', function () {
            let coordinates = self.geolocation.getPosition();
            //设置当前位置坐标点格式    
            let locationFeature = new Feature();
            locationFeature.setStyle(new Style({
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

            locationFeature.setGeometry(coordinates ?
                new Point(coordinates) : null);
            self.layer.getSource().addFeature(locationFeature);
            self.map.getView().animate({
                zoom: 14,
                center: coordinates,
                duration: 2000
            });
            self.geolocation.setTracking(false);
        })



    }
    showImg = (caseNo) => {
        this.setState({
            caseNo: caseNo
        });
    };
    zoomout = () => {
        var view = this.map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom + 1);
    };
    zoomin = () => {
        var view = this.map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom - 1);
    };
    moveLocate = () => {
        this.geolocation.setTracking(true);
    };
    draw = (item) => {
        let drawM;
        let self = this;										//绘制动作
        this.map.removeInteraction(drawM);
        var value = item;
        if (value && value !== '') {
            drawM = new Draw({
                source: self.layer.getSource(),
                stopClick: true,
                type: value
            });
            drawM.on('drawend', function (event) {
                var feature = event.feature;
                console.log(event.feature.getGeometry().flatCoordinates);
                //        coordinatesArr.push(event.feature.getGeometry().flatCoordinates);
                //  console.log(coordinatesArr);
                //        feature.setStyle(style);
                self.overlay.setPosition(event.feature.getGeometry().flatCoordinates);
                self.map.removeInteraction(drawM);
                self.map.addOverlay(self.overlay);
            });
            this.map.addInteraction(drawM);
        }
    }
    subscribe = () => {
        const response = axios.post('http://192.0.0.66:9199/mds/subscribe',
            { "token": this.token, "topic": 'alarmInfo', "tag": 'area' }
        ).then(function (response) {

            let result = response.data;
            Message.success(result.msg);
        }).catch(function (error) {
            console.log(error);
        });

    }
    menuClick = (key, item, event) => {
        switch (key) {
            case "1": this.zoomout(); break;
            case "2": this.zoomin(); break;
            case "3": this.moveLocate(); break;
            case "Point": this.draw('Point'); break;
            case "Polygon": this.draw('Polygon'); break;
            case "Circle": this.draw('Circle'); break;
            case "4": this.getJson(); break;
            case "5": this.subscribe(); break;
            case "6": this.sendMessage('qqqq'); break;
            case "7": this.map.updateSize(); break;
            case "8": this.onOpen(); break;
        }
    };
    getJson = () => {
        alert((new GeoJSON({ featureProjection: 'EPSG:3857' })).writeFeatures(this.source.getFeatures()));
    };
    handleData(data) {
        alert(data)
        let result = JSON.parse(data);
        alert(result)
    }
    handleOpen() {
        alert("connected:)");
    }
    handleClose() {
        alert("disconnected:(");
    }

    onOpen = () => {
        this.setState({
            visible: true,
            videoSrc: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8' //rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov
        });
    };

    onClose = reason => {
        console.log(reason);
        this.setState({
            visible: false
        });
    };

    InitVideo = (url) => {
        this.setState({
            videoSrc: url
        });
    };
    onRef = (e) => {
        this.video = e
    };
    render() {
        const { title, summary, link } = this.props;
        return (
            <div className="dashboard-page">
                <Suspense fallback={<PageLoading />}>
                    <Menu header={this.props.loginInfo} onItemClick={this.menuClick} direction="hoz" mode="popup" className="my-hoz-menu" popupClassName="my-hoz-menu" popupAutoWidth>
                        <Item key="1">放大</Item>
                        <Item key="2">缩小</Item>
                        <Item key="3">定位</Item>
                        <Item key="4">获取JSON</Item>
                        <SubMenu label="绘制">
                            <Item key="Point">画点</Item>
                            <Item key="Polygon">画多边形</Item>
                            <Item key="Circle">画园</Item>
                        </SubMenu>
                        <Item key="7">重载</Item>
                        <Item key="5">订阅</Item>
                        <Item key="8">弹窗</Item>
                    </Menu>
                </Suspense>
                <Suspense fallback={null}>
                    <div id="map">
                    </div>
                    <div id="popup" className="ol-popup">
                        <div className="pophead">
                            <div id="popup-title" >测试点信息</div>
                            <a href="#" id="popup-closer" className="ol-popup-closer"></a>
                        </div>
                        <div id="popup-content" >
                            案件编号：{this.state.caseNo}


                        </div>
                    </div>
                </Suspense>
                <Suspense fallback={null}>
                    <img width='400' height='200' src={'http://117.169.11.130:9180/images/12/' + this.state.caseNo + '-1.jpg'} />
                    <Img
                        enableAliCDNSuffix={true}
                        width={400}
                        height={200}
                        src='https://img.alicdn.com/tfs/TB1vyxuwHrpK1RjSZTEXXcWAVXa-1350-900.jpg'
                        type="cover"
                        style={{ border: '1px solid #ccc', margin: '10px' }}
                    />

                </Suspense>
                <Dialog
                    title="Welcome to Alibaba.com"
                    visible={this.state.visible}
                    onOk={this.onClose.bind(this, 'okClick')}
                    onCancel={this.onClose.bind(this, 'cancelClick')}
                    onClose={this.onClose}>
                    <StreamedianPlayer id="test_video" videoSrc={this.state.videoSrc} onRef={this.onRef}>
                        {<source src="" type="application/x-rtsp" />}
                    </StreamedianPlayer>
                </Dialog>
            </div>

        );
    }
}
