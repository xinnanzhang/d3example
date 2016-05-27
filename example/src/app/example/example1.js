import React from 'react';

var Example1 = React.createClass({
  componentDidMount(){
    //d3.select() d3.selectAll()
    var t1 = d3.select("p");//选择所有指定元素的第一个  返回数组的第一个值
    var t2 = d3.selectAll("p");
    console.log(t1,t2);

    //datum() 绑定一个数据到选择集上
    var str = "YOYO";
    var p = d3.selectAll("p");
    p.datum(str);
    p.text(function(d,i){
      return "第 "+ i + " 个元素绑定的数据是 " + d;
    });

    //data() 绑定一个数组到选择集上，数组的各项值分别与选择集的各元素绑定
    var strData = ["1","2","3"];
    var pData = d3.selectAll("p");
    pData.data(strData).text(function(d,i){
      return "第 "+ i + " 个元素绑定的数据是 " + d;
    });

    // 选择第一个 p 元素
    d3.select("p").style("color","red");
    // 选择第二个 p 元素
    d3.select("#myid").style("color","red");
    d3.selectAll("p:nth-child(2)").style("color","blue")//拓展  css3

    //append()：在选择集末尾插入元素

    //insert()：在选择集前面插入元素
    d3.select("#myid").insert("p").text("hehe");

    //删除元素
    d3.select("#myid").select("p").remove();

    //绘制矩形 demo
    var dataset = [ 250 , 210 , 170 , 130 , 90 ];
    var svg = d3.select(".example2").append("svg").attr("width",300).attr("height",150);
    svg.selectAll("rect").data(dataset)
    .enter()//指定选择集的enter部分
    .append("rect").attr("x",20).attr("y",function(d,i){
      return i * 25;
    }).attr("width",function(d){
      console.log("d",d);
      return d;
    }).attr("height",23)
    .attr("fill","red");
    //线性比例尺
    var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
    var min = d3.min(dataset);
    var max = d3.max(dataset);

    var linear = d3.scale.linear()
            .domain([min, max])
            .range([0, 300]);

    linear(0.9);    //返回 0
    linear(2.3);    //返回 175
    linear(3.3);    //返回 300

    //序数比例尺
    var index = [0, 1, 2, 3, 4];
    var color = ["red", "blue", "green", "yellow", "black"];
    var ordinal = d3.scale.ordinal()
            .domain(index)
            .range(color);

    ordinal(0); //返回 red
    ordinal(2); //返回 green
    ordinal(4); //返回 black

    //比例尺 svg
    var datasvg = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
    var linear = d3.scale.linear()
            .domain([0, d3.max(datasvg)])
            .range([0, 300]);
    var svg = d3.select(".example3").append("svg").attr("width",300).attr("height",150);
    svg.selectAll("rect").data(dataset)
    .enter()//指定选择集的enter部分
    .append("rect").attr("x",20).attr("y",function(d,i){
      return i * 25;
    }).attr("width",function(d){
      return linear(d);//在这个地方使用比例尺
    }).attr("height",23)
    .attr("fill","red");

    //定义坐标轴
    var dataset = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
    var linear = d3.scale.linear()//定义比例尺
          .domain([0, d3.max(dataset)])
          .range([0, 250]);

    var axis = d3.svg.axis()
         .scale(linear)      //指定比例尺
         .orient("bottom")   //指定刻度的方向
         .ticks(7);          //指定刻度的数量

    var datasvg = [ 2.5 , 2.1 , 1.7 , 1.3 , 0.9 ];
    var linear = d3.scale.linear()
           .domain([0, d3.max(datasvg)])
           .range([0, 300]);
           // var oridnal = d3.scale.ordinal()   //文字坐标轴 使用序数比例尺 详见http://www.ourd3js.com/wordpress/?p=111
           //     .domain(xTexts)
           //     .rangeBands([0, 250]);
    var e4 = d3.select(".example4").append("svg").attr("width",300).attr("height",150);
    e4.selectAll("rect").data(dataset)
    .enter()//指定选择集的enter部分
    .append("rect").attr("x",20).attr("y",function(d,i){
     return i * 25;
    }).attr("width",function(d){
     return linear(d);//在这个地方使用比例尺
    }).attr("height",23)
    .attr("fill","red");
    e4.append("g").attr("class","axis").attr("transform","translate(20,130)").call(axis);

    //完整的柱形图==================================================
    var width = 400;
    var height = 400;
    var e5 = d3.select(".example5").append("svg").attr("width",width).attr("height",height);
    var padding = {left:30, right:30, top:20, bottom:20};  //画布周边的空白
    var dataset = [10, 20, 30, 40, 33, 24, 12, 5,1];
    var xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0,width - padding.left - padding.right]);//x轴的比例尺
    //d3.range(dataset.length) 用于把数组生成一组长度数组  如[0,1,2,3,4,5,6,7]
    var yScale = d3.scale.linear().domain([0,d3.max(dataset)]).range([height - padding.top - padding.bottom,0]);//y轴的比例尺
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");//定义x轴
    var yAxis = d3.svg.axis().scale(yScale).orient("left");//定义y轴
    //矩形之间的空白
    var rectPadding = 4;
    //添加矩形元素
    var rects = e5.selectAll(".MyRect").data(dataset).enter().append("rect")
    // .attr("class","MyRect")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")//矩形向右移动 padding.left 大小  向下移动padding.top
    .attr("x",function(d,i){
      return xScale(i) + rectPadding/2;
    })
    .attr("y",function(d){
      return yScale(d);
    })
    .attr("width",xScale.rangeBand() - rectPadding) //这句什么意思
    .attr("height",function(d){
      return height - padding.top - padding.bottom - yScale(d);
    })
    .attr("fill","red")
    .transition().duration(2000).delay(function(d,i){
        return 200*i;
    }).attr("fill","steelblue")
    //transition() 过渡效果  duration(2000)持续时间 delay(500)延迟
    ;
    //添加文字元素
    var texts = e5.selectAll(".MyText").data(dataset).enter()
    .append("text")
    .attr("class","MyText")
    .attr("transform","translate(" + padding.left + "," + padding.top + ")")
    .attr("x", function(d,i){
        return xScale(i) + rectPadding/2;
    } )
    // .attr("y",function(d){
    //     return yScale(d);
    // })
    //添加动态效果
    .attr("y",function(d){
        var min = yScale.domain()[0];//文字从坐标0开始
        return yScale(min);
    })
    .transition()
    .delay(function(d,i){
        return i * 200;
    })
    .duration(2000)
    .ease("bounce") //到达终点弹跳几下
    .attr("y",function(d){
        return yScale(d);//最终生成的位置
    })

    .attr("dx",function(){
        return (xScale.rangeBand() - rectPadding)/2;
    })
    .attr("dy",function(d){
        return 20;
    })
    .text(function(d){
        return d;
    });
    //添加x轴
    e5.append("g")
      .attr("class","axis")
      .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
      .call(xAxis);

    //添加y轴
    e5.append("g")
      .attr("class","axis")
      .attr("transform","translate(" + padding.left + "," + padding.top + ")")
      .call(yAxis);

  },
  render(){
    return(
      <div>
        <div className="example1">
          <p>Apple</p>
          <p id="myid">Pear</p>
          <p>Banana</p>
        </div>
        基本
        <div className="example2"></div>
        比例尺
        <div className="example3"></div>
        坐标轴
        <div className="example4"></div>
        完整的柱形图
        <div className="example5"></div>
      </div>
    )
  }
});

export default Example1;
