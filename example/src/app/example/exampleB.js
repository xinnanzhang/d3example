import React from 'react';

var ExampleTopo = React.createClass({
  componentDidMount(){
    var _this = this;
    var eB1 = d3.select(".exampleTopo").append("svg").attr("width",500).attr("height",500);
    //中心点
    var centerX = eB1.attr("width")/2;
    var centerY = eB1.attr("height")/2;
    var circleNum = 9;//圆弧9等分
    var centerR = 150;//圆半径
    var otherData = [];
    for(var i = 0;i < circleNum;i++){
      var y = Math.sin( i*40*Math.PI/180 )*centerR + centerY;//对边 + 中心点宽
      var x = Math.cos( i*40*Math.PI/180)*centerR + centerX;//临边 + 中心点高
      otherData.push({x:x,y:y,text:i});
    }
    var myData = {
  		centerNode : { text : '中心点' },
  		otherNode : otherData
  	};

    //先添加线 节点可以覆盖多余的线条 ==================================================
    var oLine1 = eB1.append("g").attr("style","cursor:pointer");
    oLine1.selectAll("line").data(otherData).enter().append("line").attr("stroke","#ccc")
    .attr("x1",function(d,i){
      return d.x;
    })
    .attr("y1",function(d,i){
      return d.y;
    })
    .attr("x2",centerX)
    .attr("y2",centerY)
    //线中小方块
    oLine1.selectAll("rect").data(otherData).enter().append("rect").attr("fill","#999").attr("width",20).attr("height",20).attr("rx",5)
    .attr("x",function(d,i){
      return (d.x + centerX)/2 -10;
    })
    .attr("y",function(d,i){
      return (d.y + centerY)/2 - 10;
    })
    //线中文字
    oLine1.selectAll("text").data(otherData).enter().append("text").attr("fill","white").attr("font-size",20).attr("height",20).attr("text-anchor","middle")
    .attr("x",function(d,i){
      return (d.x + centerX)/2;
    })
    .attr("y",function(d,i){
      return (d.y + centerY)/2 +8;
    }).text("?")

    //添加其他点=================================================================
    var oG = eB1.append("g").attr("style","cursor:pointer");
    oG.selectAll("circle").data(otherData).enter()
    .append("circle")
    .attr("fill","white").attr("stroke","red").attr("stroke-width","1")
    .attr("cx",function(d,i){
      return d.x;
    })
    .attr("cy",function(d,i){
      return d.y;
    })
    .attr("r",25)
    .on("mouseover",function(d,i){
      // alert();
      _this.startMove( this , 30 , 40 );
    })
    .on("mouseout",function(d,i){
      _this.startMove( this, 40 , 30 );
    });

    oG.selectAll("text").data(otherData).enter()
    .append("text")
    .attr("font-size",20).attr("text-anchor","middle")
    .attr("x",function(d,i){
      return d.x;
    })
    .attr("y",function(d,i){
      return d.y+8;
    })
    .text(function(d,i){
      return d.text;
    })

    //添加中心点
    var cG = eB1
    .append("g").attr("style","cursor:pointer");
    cG.append("circle").attr("cx",centerX).attr("cy",centerY).attr("r",40).attr("fill","white").attr("stroke","red").attr("stroke-width","1");
    cG.append("text").attr("x",centerX).attr("y",centerY+8).attr("font-size",20).attr("text-anchor","middle").text("中心点");



  },
  //动画效果  可以学习javascript中的运动
  startMove(obj,r1,r2){
    var nowR = r1;
    var overR = r2;
    obj.speed = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

      obj.speed += (overR - nowR)/6;
      obj.speed *= 0.9;

      if( Math.abs(overR - nowR)<=1 && Math.abs(obj.speed)<=1 ){
        clearInterval(obj.timer);
        obj.setAttribute( 'r' , overR );
      }
      else{
        nowR += obj.speed;
        obj.setAttribute( 'r' , nowR );
      }

    },30);
  },
  render(){
    return(
      <div>
        <div className="exampleTopo">
        </div>
      </div>
    )
  }
});
var ExampleB = React.createClass({
  componentDidMount(){
    //实现简单的动态效果
    var eB1 = d3.select(".exampleB1").append("svg").attr("width",500).attr("height",500);
    var circle1 =   eB1.append("circle").attr("cx",100).attr("cy",100).attr("r",45).style("fill","green");
        circle1.transition().duration(2000).attr("cx",300);
    var circle2 =   eB1.append("circle").attr("cx",100).attr("cy",100).attr("r",45).style("fill","green");
        circle2.transition().duration(2000).attr("cy",300).style("fill","red").ease("bounce");
        //ease("bounce") 在最终状态处弹跳几次   还有 linear：普通的线性变化 / circle：慢慢地到达变换的最终状态 / elastic：带有弹跳的到达最终状态 详见文档


  //什么是 Update、Enter、Exit
  //update 表示数据存在的部分  enter 表示数组 比元素多的部分   exit表示 元素比数组多的部分  详见 http://www.ourd3js.com/wordpress/?p=149
    // var dataset = [3,6,9,12,15];
    var dataset = [3];
    //update部分
    var whoUEE = d3.selectAll("p").data(dataset);
    whoUEE.text(function(d,i){
      return "元素 "+i+" 添加了 "+d;
    });
    //测试enter 需要用到[3,6,9,12,15] 数据
    whoUEE.enter().append("p").text(function(d,i){
      return "enter部分 "+ i +"添加了"+d;
    });
    //测试exit 修改属性值   exit 部分的处理办法一般是：删除元素（remove）
    whoUEE.exit().text(function(d,i){
      return i+"  hehe  "+d;
    });
    // whoUEE.exit().remove();

    //鼠标常用事件======================================
    //  click  mouseover mouseout mousemove mousedown mouseup dblclick
  },
  render(){
    return(
      <div>
        <div className="exampleB1" style={{float:"left"}}></div>
        <ExampleTopo />
        <div className="exampleB2">
          <p>Hello</p>
          <p>World</p>
          <p>!</p>
        </div>
      </div>
    )
  }
});
export default ExampleB;
