/**
  三角函数
*/
import React from 'react';

//苹果菜单
var AppleMenu = React.createClass({
  mouseoverMenu:function(){
    var aInput = document.getElementsByTagName("input");
    var oDiv  = document.getElementById("div1");
    var aImg = document.getElementsByTagName("img");
    document.onmousemove = function(ev){
        var ev = ev || window.event;
        for(var i = 0;i < aImg.length;i++){
          //求图片中心点
          var x = aImg[i].offsetLeft + aImg[i].offsetWidth/2;//图片距离屏幕左边距离 + 自身宽度的一半
          var y = aImg[i].offsetTop + aImg[i].offsetHeight/2 + oDiv.offsetTop;//图片距离屏幕上边距离 + 自身宽度的一半 + 父类高度
          var b = ev.clientX - x; //鼠标x轴  - 图片左边距  = 图片中心点到鼠标点点宽度
          var a = ev.clientY - y;
          var c = Math.sqrt( Math.pow(b,2) + Math.pow(a,2));
          var scale = (1-c/300);
          if(scale < 0.5){
            scale = 0.5;
          }
          aInput[i].value = "宽:"+b+" 高:"+a+" scale:"+scale;
          aImg[i].style.width = scale * 128+"px";
          aImg[i].style.height = scale * 128+"px";
        }
    }
  },
  componentDidMount(){
    this.mouseoverMenu();
  },
  render(){
    return(
      <div>
        <div id="div1">
        <div>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
          <img src="img/1.png" />
          <img src="img/2.png" />
          <img src="img/3.png" />
          <img src="img/4.png" />
          <img src="img/5.png" />
        </div>
      </div>
    )
  }
});

//sin30度  = 1/2 对边与斜边的比  cos30度 = 根号3/2  临边与斜边的比  tan30度 = 对边与临边的比
//圆周长 = 2π * r 
var Trigonometric = React.createClass({
  componentDidMount(){
    Math.sin()
    Math.cos()
    Math.tan()
  },
  render(){
    return(
      <div>

      </div>
    )
  }
});

var JsFunction = React.createClass({
  componentDidMount(){

    Math.pow(2,3)   //2的立方
    Math.pow(3,2)   //3的平方
    Math.sqrt( 9 )   //3 开平方
    console.log("勾股",Math.sqrt( Math.pow(3,2) + Math.pow(4,2) ));
  },
  render(){
    return(
      <div>
        <AppleMenu />
      </div>
    )
  }
});
export default JsFunction;
