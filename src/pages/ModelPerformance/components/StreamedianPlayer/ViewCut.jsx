import React from "react";
import { Button } from '@alifd/next';
import { Point } from './Point';


export default class ViewCut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playbackRate: 1.0,
      playbackRateText: 'live',
    }
    this.video = null;
    this.canvas = null;
    this.vertices = [];

  }
  componentDidMount() {
    this.video = document.getElementById(this.props.video);
    this.canvas = document.getElementById('myCanvas');
    this.setState({playbackRate: this.video.playbackRate});
    this.setState({playbackRateText: this.video.playbackRate});
    let height = this.canvas.height
    this.canvas.addEventListener('click', e => {
      this.vertices.push(new Point(e.pageX - this.canvas.getBoundingClientRect().left,e.pageY - this.canvas.getBoundingClientRect().top));
      this.draw(this.vertices);
    });

  }

  cutView = () => {
    let context = this.canvas.getContext("2d");
     context.drawImage(this.video, 0, 0, this.video.clientWidth, this.video.clientHeight);
  }

   draw(points){
     let context  = this.canvas.getContext('2d');
   // context.fillStyle = 'gray';
    //context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    if (!points.length) {
      return;
    }
    context.fillStyle = 'black';
    points.forEach((p, i) => {
      context.beginPath();
      context.arc(p.x, p.y, 1, Math.PI * 2, 0);
      context.stroke();
    });
    points.forEach((p, i) => {
      context.fillText('P' + (i+1), p.x, p.y);
    });
    context.moveTo( points[0].x, this.canvas.height - points[0].y);
    context.beginPath();
    points.forEach((p, i) => {
      context.lineTo(p.x, p.y, 1);
    });
    context.closePath();
    context.stroke();
  }


  render() {
    return (
      <div className="controls form">
        <Button  onClick={this.cutView}
            >截图</Button>
        <canvas id="myCanvas" width="300" height="180">
  
        </canvas>
    </div>
    );
  }
}