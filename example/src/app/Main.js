/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import Example1 from './example/example1';
import ExampleB from './example/exampleB';
import StudyManage from './StudyManage';
var disX = 0;
var disY = 0;


var Main = React.createClass({
  dragmove(d){
    console.log(d);
    d3.select(this)
      .attr("x", d.cx = d3.event.x )
      .attr("y", d.cy = d3.event.y );
  },
  componentDidMount(){
    var data = [4, 8, 15, 16, 23, 42];
		var chart = d3.select(".demo1").append("div")
						.attr("class", "chart"); //在body下添加一个div  "chart"并设置其样式为chart
		chart.selectAll("div") //在已添加的div "chart"下选择所有的div
			.data(data) //绑定数据
			.enter().append("div") //根据数据增加div
			.style("width", function(d) { return d * 10 + "px"; }) //设置div的宽度为 data[i]*10个像素
			.text(function(d) { return d; }); //设置div的内容 相当于.text(String);


    // var demoSvg =  d3.select(".svgdemo").append("svg").attr("width",500).attr("height",500);
    //
    //   demoSvg.append("svg:rect")
    //               .attr("class","demoStyle")
    //               .attr("width",250)
    //               .attr("height",100)
    //               // .attr("x",20)
    //               // .attr("y",20)
    //               .attr("rx",20).attr("ry",20);


      // var drag = d3.behavior.drag()
      //             .on("drag", this.dragmove);
      //
      // var demoRec = [ { cx: 150, cy:200, r:30 },
      //       { cx: 250, cy:200, r:30 },];
      //
      // d3.select('.demoStyle')
      // .style("cursor","hand")
      // .data(demoRec)
      // .attr("x",function(d){
      //   return d.cx;
      // })
      // .attr("y",function(d){
      //   return d.cy;
      // })
      // .call(drag);

      //demo2
      var rects = [
              { x: 150, y:200, rx:0, ry:0 ,width:40,height:40},
              { x: 250, y:200, rx:30, ry:30 ,width:40,height:40}
            ];
      var drag = d3.behavior.drag().on("drag", function(d){
        console.log("mouse="+d3.mouse(this)[0],d3.mouse(this)[1]);
        var scrollX = d3.event.x-20;
        var scrollY = d3.event.y-20;
        console.log(scrollX,scrollY);
        d3.select(this).attr("x",scrollX ).attr("y", scrollY );
      });
  		var demo2 = d3.select(".demo2").append("svg").attr("width","100%").attr("height",500);
  		demo2.selectAll("rect")
  			.data(rects)
  			.enter()
  			.append("rect")
  			.attr("x",function(d){ return d.x; })
  			.attr("y",function(d){ return d.y; })
        .attr("rx",function(d){ return d.rx; })
        .attr("ry",function(d){ return d.ry; })
        .attr("width",function(d){ return d.width; })
        .attr("height",function(d){ return d.height; })
  			.attr("fill","black")
        .on("mousedown",function(){
          console.log("鼠标点击=",d3.event.x+"----"+d3.event.y);
        })
  			.call(drag);
      //demo3
      var demo3 = d3.select(".demo3").append("svg").attr("width",500).attr("height",100);
      demo3.append("defs").append("marker").attr("id","markerArrow").attr("markerWidth",18).attr("markerHeight",13).attr("refx",2).attr("refy",6).attr("orient","auto")
      .append("path").attr("d","M2,2 L2,11 L10,6 L2,2").attr("style","fill: #000000;");
      demo3.append("line").attr("x1",0).attr("y1",0).attr("x2",100).attr("y2",50).attr("stroke","red").attr("stroke-widt",1).attr("marker-end","url(#markerArrow)");
      //jquery demo
      $(".jquerydemo").mousedown(function(ev){
        //记录当前组件坐标点
        disX = ev.pageX-$(this).offset().left;
        disY = ev.pageY - $(this).offset().top;
    		$(document).mousemove(function(ev){
    			$('.jquerydemo').css('left',ev.pageX - disX);
    			$('.jquerydemo').css('top',ev.pageY - disY);
    		});
    		$(document).mouseup(function(){
    			$(document).off();
    		});
    		return false;
      });

  },
  render(){

    return(
      <div>
        <ExampleB />
        <StudyManage />
        {/**
        <div className="demo1"></div>
        <div className="demo2"></div>
        <div className="demo3"></div>
        <div className="jquerydemo">
          456
        </div>*/}
      </div>
    )
  }
});

export default Main;
