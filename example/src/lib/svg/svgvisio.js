/*******************************************
 *date: 2016/2/25
 *auther: bin.liu
 *svgvisio visio视图控件
 ********************************************/

var React = require('react');

var SvgVisio = React.createClass({
  /**
   ** update device menu
   **/
  updatemenu : function () {
    var that = this;
    var radio2 = d3.select("#radio2");
    var radio1 = d3.select("#radio1");
    var vmoitorinfo = d3.select('.vmoitorinfo');
    var vmenu = d3.select('.vmenu');
    var mddname = this.Mddname;
    var bodyNode = d3.select("."+mddname).node();
    var data = this.props.IPData;
    var devdata = this.props.DevData;
    //
    d3.selectAll(".svip").on("click", function (d, i) {
      that._m =true;
      var ipdevice = d3.select(this);
      var svip = ipdevice.attr("svip");//获取当前svip值
      var strMenuHTML = "";
      var strAssertHTML = "";
      var state = 1;
      var mid = "";
      var strDesc = "";
      var ipdata = data.filter(function (value) {
          return value.ip == svip;
        });
      var devicedata = devdata.filter(function (value) {
          return value.ip == svip;
        });
       if(devicedata==null || devicedata==''){
         radio2.style('visibility','hidden');
       }else{
         radio2.style('visibility','visible');
       }
      //device state 100 ok 101 warning 102 error
      ipdata.map(function (obj, index) {
        state = obj.state;
        mid = obj.mid;
        //device state manage
        if (state >= 100) {
          state = 100;
        }
        strDesc = obj.desc;
        var index = strDesc.indexOf('::');
        var temp = "<b>"+strDesc.substr(0,index)+"</b>";
        strDesc = strDesc.replace(strDesc.substr(0,index),temp);


        switch (state) {
        case 100:
          strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" + strDesc
            break;
        case 1:
          strDesc = "<img src='img/visio/state_green.gif' width=15 height=15 style='position: relative;top: 4px;'>" + strDesc
            break;
        case 2:
          strDesc = "<img src='img/visio/state_yellow.gif' width=15 height=15 style='position: relative;top: 3px;'>" + strDesc
            break;
        case 3:
          strDesc = "<img src='img/visio/state_red.gif' width=15 height=15 style='position: relative;top: 3px;'>" + strDesc
            break;
        case 4:
          strDesc = "<img src='img/visio/state_stop.gif' width=15 height=15 style='position: relative;top: 3px;'>" + strDesc;
          break;
        case 5:
          strDesc = "<img src='img/visio/state_red.gif' width=15 height=15 style='position: relative;top: 3px;'>" + strDesc
            break;
        }
        strMenuHTML += "<div class='menuItem'  doAction=" + mid + " style='padding: 2px 2px 2px 2px;cursor:hand;font-size:9pt;background: #eeeeee;font-family:宋体, sans-serif;font-size:80%;ine-height: 1.5em;background-color:white;color:black;overflow:hidden;word-wrap:break-word;word-break:break-all;TABLE-LAYOUT: fixed;'>";
        strMenuHTML += strDesc + "</div>";
      });
      devicedata.map(function (obj, index) {

        mid = obj.mid;
        strDesc = obj.desc;

        var index = strDesc.indexOf(':');
        var temp = "<b>"+strDesc.substr(0,index)+"</b>";
        strDesc = strDesc.replace(strDesc.substr(0,index),temp);

        switch (state) {
        case 100:
          strDesc = "<span style='position:relative;width:13;height:10;COLOR:Blue'>::</span>&nbsp;" + strDesc
            break;
        }
        strAssertHTML += "<div class='menuItem'  doAction=" + mid + " style='padding: 2px 2px 2px 2px;cursor:hand;font-size:9pt;background: #eeeeee;'>";
        strAssertHTML += strDesc + "</div>";
      });
      vmoitorinfo.style('visibility','visible')
      .html(strMenuHTML);
      var len = ipdata.length;
      if (len>12) vmenu.style('height','304px');
      else {
        var height;
        switch (len){
          case 1:height='25px';break;
          case 2:height='80px';break;
          case 3:height='100px';break;
          case 4:height='130px';break;
          case 5:height='150px';break;
          case 6:height='180px';break;
          case 7:height='210px';break;
          case 8:height='240px';break;
          case 9:height='270px';break;
          case 10:height='304px';break;
          case 11:height='304px';break;
          case 12:height='304px';break;
        }
        vmenu.style('height',height);
      }
       var position = d3.mouse(bodyNode);
       var xx = position[0];
       var yy = position[1];
       vmenu
      .style('position', 'absolute')
      .style('left', xx + "px")
      .style('top', yy + "px")
      .style('display', 'inline-block')
      .on('mouseleave', function () {
        //d3.select('.vmenu').style('display', 'none');
      });
      d3.selectAll(".menuItem").on("click", function (d, i) {
        var mitem = d3.select(this);
        var svid = mitem.attr("doAction");
        that.handleClick("action", svid);
      });
      radio1.on("click", function (d, i) {
        that._m = true;
        vmoitorinfo.style('visibility','visible').html(strMenuHTML);
        d3.selectAll(".menuItem").on("click", function (d, i) {
         var mitem = d3.select(this);
         var svid = mitem.attr("doAction");
         that.handleClick("action", svid);
       });
      });
      radio2.on("click", function (d, i) {
        that._m = true;
         vmoitorinfo.style('visibility','visible').html(strAssertHTML);
      });
      d3.event.preventDefault();
    });

  },
  /**
   ** 100 ok 101 warning 102 error
   **/
  updatedevicestate : function () {
    var that = this;
    var data = this.props.IPData;
    if(data==null) return;
    d3.selectAll(".svip").attr("filter", function (d, i) {
      var ipdevice = d3.select(this);
      var svip = ipdevice.attr("svip");
      var ipdata = data.filter(function (value) {
          return value.ip == svip;
        });
      var sfilter = "";

      ipdata.map(function (obj, index) {
        var state = obj.state;
        if (state == 102) {
          sfilter = "url(#svgerror)";
        } else if (state == 101) {
          sfilter = "url(#svgwarn)";
        } else if (state == 100) {
          sfilter = "url(#svgok)";
        }
      });
      return sfilter;
    });

  },
  /**
   ** 100 ok 101 warning 102 error
   **/
  updatelinkstate :function(){
   var that = this;
   var linkdata = this.props.LinkData;
   if (linkdata==null) return;
   d3.selectAll(".svlink").attr("filter", function (d, i) {
      var svlinkdevice = d3.select(this);
      var svlink = svlinkdevice.attr("svlink");
      var ipdata = linkdata.filter(function (value) {
          return value.link == svlink;
        });
      var sfilter = "";

      ipdata.map(function (obj, index) {
        var state = obj.state;
        if (state == 102) {
          sfilter = "url(#svgerror)";
        } else if (state == 101) {
          sfilter = "url(#svgwarn)";
        } else if (state == 100) {
          sfilter = "url(#svgok)";
        }
      });
      return sfilter;
    });
  },
  updatelinestate:function(){

  var that = this;
  var linedata = this.props.LineData;
   if (linedata==null) return;
   d3.selectAll(".svline").attr("style", function (d, i) {
      var svlinedevice = d3.select(this);
      var svline = svlinedevice.attr("svline");
      var ipdata = linedata.filter(function (value) {
          return value.line == svline;
        });
      var sfilter = "fill:none";

      ipdata.map(function (obj, index) {
        var state = obj.state;
        var value = obj.interf;
        svlinedevice.select("text").text(value);
        if (state == 102) {

          svlinedevice.select("path").attr("style","stroke:red");
          svlinedevice.select("text").attr("style","fill:red");
        } else if (state == 101) {
          svlinedevice.select("path").attr("style","stroke:#ffc20e");
          svlinedevice.select("text").attr("style","fill:#ffc20e");
        } else if (state == 100) {
          svlinedevice.select("path").attr("style","stroke:green");
          svlinedevice.select("text").attr("style","fill:green");
        }
      });
      return sfilter;
    });
  },
  /**
  ** go to web
  **/
  onlinkclick : function () {
    var that = this;
    d3.selectAll(".svlink").on("click", function (d, i) {
      var ipdevice = d3.select(this);
      var svip = ipdevice.attr("svlink");
      that.handleClick("link", svip);
    });
  },
  setNewSize : function (newSize) {
//		alert(newSize);
//		alert(this._element.innerHTML);
    if(!d3.select('svg')){
      return;
    }
    if(!d3.select('svg').attr("width")){
      return;
    }
    if(!d3.select('svg').attr("height")){
      return;
    }
    var temp = d3.select('svg').attr("width");
    var unit = d3.select('svg').attr("width").substring(temp.length-2);
//		alert(unit);
    var newW = parseFloat(this._width)*newSize
//		alert(newW);
    d3.select('svg').attr("width",newW+unit);
    var newH = parseFloat(this._height)*newSize;
//		alert(newH);
    d3.select('svg').attr("height",newH+unit);
  },
  handleClick: function(tag,data) {
    this.props.selectitem(tag,data);
  },
  updateEvent:function(){
    var mddname = this.Mddname;
    //  var svgcontent=this.props.SvgContent;
    //d3.select('.'+mddname).html(svgcontent);
    d3.select('.svip').style("cursor","pointer");
    d3.select('.svip').style("cursor","hand");
    d3.select('.svline').style("cursor","pointer");
    d3.select('.svline').style("cursor","hand");
    d3.select('.svlink').style("cursor","pointer");
    d3.select('.svlink').style("cursor","hand");
    try {
        this.onlinkclick();
    } catch (e) {

    } finally {

    }

    try {
      this.updatedevicestate();
    } catch (e) {

    } finally {

    }
    try {
      this.updatelinestate();
    } catch (e) {

    } finally {

    }
    try {
      this.updatelinkstate();
    } catch (e) {

    } finally {

    }
    try {
        this.updatemenu();
    } catch (e) {

    } finally {

    }
    var that=this;
    d3.select("body")
    .on("mouseup", function () {
    if(that._m)
        {
     that._m=false;
     }
     else
    {
           //alert("dddddd1");
    d3.select('.vmenu').style('display', 'none');
    }
    });
  },
  componentDidUpdate:function(){
    this.updateEvent();
  },
  componentDidMount: function() {
    this.updateEvent();
  },
  render: function() {
    var timestamp = new Date().getTime();
    var mddname = "svg" + timestamp;
     var svgcontent=this.props.SvgContent;
    this.Mddname = mddname;
    var menustyle = {
      height:304,
      width:460,
      zIndex:10,
      position:"absolute",
      backgroundColor:"white",
      overflowY:"auto",
      overflowX:"hidden",
      border: "black 2px outset",
      display: "none"
    };
    var vmoitorinfo="vmoitorinfo";
    var htmlString={ __html:svgcontent};
    var vmenu= "vmenu";

    return <div>
              <div style={{textAlign:"center"}} className = {mddname}  dangerouslySetInnerHTML={htmlString}>< /div>
              {this.props.oneView ?
                <div className={vmenu} style = {menustyle}>
                 <input type='button' id='radio1'  value='监测信息'/>
                 <input type='button' id='radio2' value='资产信息'/>
                 <div className={vmoitorinfo} ></div>
                </div>:
                ""
              }

          </div>;
  }
});
module.exports = SvgVisio;
