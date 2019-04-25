import React, { Component, Suspense } from 'react';
import { Message, Button, Dialog } from '@alifd/next';
import { Menu } from '@alifd/next';
import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import View from 'ol/View.js';
import Geolocation from 'ol/Geolocation.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import { fromLonLat, get, transform } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { TileJSON, Vector as VectorSource } from 'ol/source.js';
import XYZ from 'ol/source/XYZ.js';
import { Fill, Icon, Stroke, Style, Circle } from 'ol/style.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Img from '@icedesign/img';
import 'ol/ol.css';
import './olbasemap.scss';
import StreamedianPlayer from '../../components/StreamedianPlayer';

import 'video.js/dist/video-js.css';

const { SubMenu, Item } = Menu;

export default class MapContainer extends Component {
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
        if(nextprops.caseData)
        {
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
                self.overlay.setPosition(coodinate);
                self.map.addOverlay(self.overlay);
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
 
    getJson = () => {
        alert((new GeoJSON({ featureProjection: 'EPSG:3857' })).writeFeatures(this.source.getFeatures()));
    };
 

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
