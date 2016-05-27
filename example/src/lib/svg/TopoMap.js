topomap.TopoMap = function(parent) {
  this._items = new topomap.NodeList();
  this._lines = new topomap.NodeList();
  this._svgMap = new topomap.BaseMap(parent, this);
  this._maxX = 2700;
  this._maxY = 2200;
  this._compWidth = 1000;
  this._compHeight = 800;
  this._overviewWidth = 200;
  this._overviewHeight = 200;
  this._topy = 90;
  this._leftx = 230;
  this._nodeDisplayType = 1;
  this._linkDisplayType = 1;
  this._layer = null;
  this.svg = null;
  this._nodetooltipdesc = "";
  this._grouptooltipdesc = "";
  this._linktooltipdesc = "";
  this._menudesc = "";
  this._submenudesc = "";
  this._groupmenudesc = "";
  this._linkmenudesc = "";
  this._nodemenudesc = "";
  this._tooltipdata = [];
  this._refreshdata = [];
  this._layoutdata = [];
  this._alertdata = [];
  this._prealertdata = [];
  this._newlinedata = null;
  this._newgroup = null;
  this._newdevice = null;
  this._plinedata = null;
  this._pnodedata = null;
  this._showpc = 0;
  this._pcmenu = "";
  this._locatenode = null;
  this._subchartdata = [];
  this._Timer1 = null;
  this._UpdateCount = 0;
  this._UpdateNode = null;
  this._UpdateTag = 0;
  this._toposet = [];
  this._linkset = null;
  this._delnode = 0;
  this._deline = 0;
  this._lineshowhide = "";
  this._hidelines = [];
  this._isubtopo = 0;
};
topomap.TopoMap.prototype = {
  addItem: function(item) {
    this._items.add(item);
  },
  removeItem: function(item) {
    this._items.remove(item);
  },
  setCleardata: function(cleardata) {
    this._items = new topomap.NodeList();
    this._lines = new topomap.NodeList();
  },
  setRender: function(render) {
    this.render(this._BaseMap);
  },
  addLine: function(lline) {
    this._lines.add(lline);
  },
  removeLine: function(lline) {
    this._lines.remove(lline);
  },
  destroy: function() {
    this._BaseMap.destroy();
  },
  initialize: function(BaseMap) {
    this._BaseMap = BaseMap;
    this._layer = BaseMap.getLayer("layer");
    this.svg = BaseMap._svg;
  },
  setDelnode: function(delnode) {
    this._delnode = delnode;
    var that = this;
    if (delnode == 1) {
      that.updatenodesdata(0);
      that.updatelinksdata(1);
      that.deletelinks();
      that.deletenodes();
    } else if (delnode == 2) {
      that.updatelinksdata(2);
      that.updatenodesdata(1);
      that.deletelinks();
      that.deletenodes();
    }
  },
  getDelnode: function() {
    return this._delnode;
  },
  setDeline: function(deline) {
    var that = this;
    if (deline == 1) {
      that.updatelinksdata(0);
      that.deletelinks();
    }
  },
  getDeline: function() {
    return this._deline;
  },
  setHidelines: function(hidelines) {
    this._hidelines = hidelines;
  },
  getHidelines: function() {
    return this._hidelines;
  },
  setLineshowhide: function(lineshowhide) {
    this._lineshowhide = lineshowhide;
  },
  getLineshowhide: function() {
    return this._lineshowhide;
  },
  setTopy: function(topy) {
    this._topy = topy;
  },
  getTopy: function() {
    return this._topy;
  },
  setPcmenu: function(pcmenu) {
    this._pcmenu = pcmenu;
  },
  getPcmenu: function() {
    return this._pcmenu;
  },
  setLocatenode: function(locatenode) {
    this._locatenode = locatenode;
    this.LocateNode(locatenode);
  },
  getLocatenode: function() {
    return this._locatenode;
  },
  setLeftx: function(leftx) {
    this._leftx = leftx;
  },
  getLeftx: function() {
    return this._leftx;
  },
  setNodeDisplayType: function(nodeDisplayType) {
    this._nodeDisplayType = nodeDisplayType;
  },
  getNodeDisplayType: function() {
    return this._nodeDisplayType;
  },
  setShowpc: function(showpc) {
    this._showpc = showpc;
  },
  getShowpc: function() {
    return this._showpc;
  },
  setLinkDisplayType: function(linkDisplayType) {
    this._linkDisplayType = linkDisplayType;
  },
  getLinkDisplayType: function() {
    return this._linkDisplayType;
  },
  setMaxX: function(maxX) {
    if (maxX > this._maxX)
      this._maxX = maxX;
  },
  getMaxX: function() {
    return this._maxX;
  },
  setMaxY: function(maxY) {
    if (maxY > this._maxY)
      this._maxY = maxY;
  },
  getMaxY: function() {
    return this._maxY;
  },
  setCompWidth: function(compWidth) {
    this._compWidth = compWidth;
  },
  getCompWidth: function() {
    return this._compWidth;
  },
  setCompHeight: function(compHeight) {
    this._compHeight = compHeight;
  },
  getCompHeight: function() {
    return this._compHeight;
  },
  setOverviewWidth: function(overviewWidth) {
    this._overviewWidth = overviewWidth;
  },
  getOverviewWidth: function() {
    return this._overviewWidth;
  },
  setOverviewHeight: function(overviewHeight) {
    this._overviewHeight = overviewHeight;
  },
  getOverviewHeight: function() {
    return this._overviewHeight;
  },
  setNodetooltipdesc: function(nodetooltipdesc) {
    this._nodetooltipdesc = nodetooltipdesc;
  },
  getNodetooltipdesc: function() {
    return this._nodetooltipdesc;
  },
  setGrouptooltipdesc: function(grouptooltipdesc) {
    this._grouptooltipdesc = grouptooltipdesc;
  },
  getGrouptooltipdesc: function() {
    return this._grouptooltipdesc;
  },
  setLinktooltipdesc: function(linktooltipdesc) {
    this._linktooltipdesc = linktooltipdesc;
  },
  getLinktooltipdesc: function() {
    return this._linktooltipdesc;
  },
  setIsubtopo: function(isubtopo) {
    this._isubtopo = isubtopo;
  },
  getIsubtopo: function() {
    return this._isubtopo;
  },
  setMenudesc: function(menudesc) {
    this._menudesc = menudesc;
  },
  getSubmenudesc: function() {
    return this._submenudesc;
  },
  setSubmenudesc: function(submenudesc) {
    this._submenudesc = submenudesc;
  },
  getGroupmenudesc: function() {
    return this._groupmenudesc;
  },
  setGroupmenudesc: function(groupmenudesc) {
    this._groupmenudesc = groupmenudesc;
  },
  getMenudesc: function() {
    return this._menudesc;
  },
  setNodemenudesc: function(nodemenudesc) {
    this._nodemenudesc = nodemenudesc;
  },
  getNodemenudesc: function() {
    return this._nodemenudesc;
  },
  setLinkmenudesc: function(linkmenudesc) {
    this._linkmenudesc = linkmenudesc;
  },
  getLinkmenudesc: function() {
    return this._linkmenudesc;
  },
  setNewdevice: function(newdevice) {
    var that = this;
    this._newdevice = newdevice;
    var nodeobj = {};
    var nodeidid = newdevice.nid;
    nodeobj["sid"] = nodeidid;
    nodeobj["nx"] = newdevice.nx - 16;
    nodeobj["ny"] = newdevice.ny - 16;
    nodeobj["otype"] = newdevice.type;
    nodeobj["localip"] = newdevice.ip;
    nodeobj["mac"] = newdevice.mac;
    nodeobj["name"] = newdevice.name;
    nodeobj["customname"] = newdevice.customname;
    nodeobj["factory"] = newdevice.manufact;
    nodeobj["model"] = newdevice.model;
    nodelinedata[nodeidid] = nodeobj;
    nodedata.push(nodeobj);
    that.createnodes();
    that.updateoverviewnode();
  },
  getNewdevice: function() {
    return this._newdevice;
  },
  setNewlinedata: function(newlinedata) {
    this._newlinedata = newlinedata;
    this.refreshnewline();
  },
  getNewlinedata: function() {
    return this._newlinedata;
  },
  setPlinedata: function(plinedata) {
    this._plinedata = plinedata;
    this.refreshpline();
  },
  getPlinedata: function() {
    return this._plinedata;
  },
  setPnodedata: function(pnodedata) {
    this._pnodedata = pnodedata;
    this.refreshpnode();
  },
  getPnodedata: function() {
    return this._pnodedata;
  },
  setNewgroup: function(newgroup) {
    this._newgroup = newgroup;
    var nodeobj = {};
    var nodeidid = newgroup.gid;
    nodeobj["sid"] = newgroup.gid;
    nodeobj["nx"] = newgroup.nx - 16;
    nodeobj["ny"] = newgroup.ny - 16;
    nodeobj["otype"] = 100;
    nodeobj["localip"] = newgroup.name;
    nodeobj["mac"] = newgroup.createtime;
    nodeobj["name"] = newgroup.name;
    nodeobj["customname"] = newgroup.name;
    nodeobj["factory"] = newgroup.iplist;
    nodeobj["model"] = newgroup.name;
    nodeobj["state"] = 0;
    nodelinedata[nodeidid] = nodeobj;
    nodedata.push(nodeobj);
    newgroupnode = nodeobj;
    this.updatesubchart();
    var alertdata = this.getAlertdata();
    alertdata.map(function(obj, index) {
      if (nodelinedata[obj.nid] !== undefined) {
        nodelinedata[obj.nid].state = obj.state;
      }
      if (newgroup.iplist.indexOf(obj.ip) >= 0) {
        if (nodelinedata[newgroup.gid] !== undefined) {
          if (nodelinedata[newgroup.gid].state != 1)
            nodelinedata[newgroup.gid].state = obj.state;
        }
      }
    });
    nodealertimg.attr("xlink:href", function(d) {
      switch (d.state) {
        case 0:
          return "";
        case 1:
          return "rwt-resources/topomap/error.png";
        case 2:
          return "rwt-resources/topomap/warning.png";
        default:
          return "";
      }
    });
  },
  getNewgroup: function() {
    return this._newgroup;
  },
  setTooltipdata: function(tooltipdata) {
    this._tooltipdata = tooltipdata;
  },
  setRefreshdata: function(refreshdata) {
    this._refreshdata = refreshdata;
    this.refreshData(refreshdata);
  },
  setLayoutdata: function(layoutdata) {
    this._layoutdata = layoutdata;
    this.toporedrawlayout(layoutdata);
  },
  setAlertdata: function(alertdata) {
    var that = this;
    that._prealertdata = that.getAlertdata();
    this._alertdata = alertdata;
    this.refreshalertdata(alertdata, that._prealertdata);
  },
  getAlertdata: function() {
    return this._alertdata;
  },
  setToposet: function(toposet) {
    this._toposet = toposet;
    linetextdata.map(function(obj, index) {
      if (obj.selfalert != 1) {
        obj.error = toposet.error;
        obj.warn = toposet.warn;
        obj.pktserror = toposet.pktserror;
        obj.pktswarn = toposet.pktswarn;
        obj.broadcasterror = toposet.broadcasterror;
        obj.broadcastwarn = toposet.broadcastwarn;
        obj.bwusagerror = toposet.bwusagerror;
        obj.bwusagewarn = toposet.bwusagewarn;
      }
    });
  },
  setLinkset: function(linkset) {
    this._linkset = linkset;
    lineidata[linkset.lid].error = linkset.error;
    lineidata[linkset.lid].warn = linkset.warn;
    lineidata[linkset.lid].pktserror = linkset.pktserror;
    lineidata[linkset.lid].pktswarn = linkset.pktswarn;
    lineidata[linkset.lid].broadcasterror = linkset.broadcasterror;
    lineidata[linkset.lid].broadcastwarn = linkset.broadcastwarn;
    lineidata[linkset.lid].bwusagerror = linkset.bwusagerror;
    lineidata[linkset.lid].bwusagewarn = linkset.bwusagewarn;
    lineidata[linkset.lid].selfalert = 1;
  },
  setSubchartdata: function(subchartdata) {
    this._subchartdata = subchartdata;
    this.udatetopochart(subchartdata);
    var alertdata = this.getAlertdata();
    alertdata.map(function(obj, index) {
      if (nodelinedata[obj.nid] !== undefined) {
        nodelinedata[obj.nid].state = obj.state;
      }
    });
    nodealertimg.attr("xlink:href", function(d) {
      switch (d.state) {
        case 0:
          return "";
        case 1:
          return "rwt-resources/topomap/error.png";
        case 2:
          return "rwt-resources/topomap/warning.png";
        default:
          return "";
      }
    });
  },
  render: function(BaseMap) {
    var head = document.getElementsByTagName('HEAD').item(0);
    var style = document.createElement('link');
    style.href = 'rwt-resources/topo.css';
    style.rel = 'stylesheet';
    style.type = 'text/css';
    head.appendChild(style);
    that1 = this;
    overvieww = this.getOverviewWidth();
    overviewh = this.getOverviewHeight();
    maindiv = document.getElementById("maindiv");
    nodeshowtype = this.getNodeDisplayType();
    linkshowtype = this.getLinkDisplayType();
    nodetips = this.getNodetooltipdesc();
    grouptips = this.getGrouptooltipdesc();
    linktips = this.getLinktooltipdesc();
    nodeclick = false;
    shiftKey = null;
    ctlKey = null;
    mousedownnode = null, mouseupnode = null;
    dragup = false;
    d3.select("body").on("keydown.brush", keydown).on("keyup.brush", keyup).each(function() {
      this.focus();
    });

    function keydown() {
      shiftKey = d3.event.shiftKey;
      ctlKey = d3.event.ctrlKey;
    };

    function keyup() {
      shiftKey = null;
      ctlKey = null;
    };
    d3.select("#maindiv").on("contextmenu", this.contextmainmenu);

    function resetMouseVars() {
      mousedownnode = null;
      mouseupnode = null;
    };
    nodesselected = true;
    d3.select("#maindiv").on("mousedown", function() {
      d3.select('#Mainmenu').style('display', 'none');
      d3.select('#mymenu').style('display', 'none');
      d3.select('#linkmenu').style('display', 'none');
      d3.select('#submenu').style('display', 'none');
      d3.select('#groupmenu').style('display', 'none');
      nodesselected = false;
      var movex = maindiv.scrollLeft;
      var movey = maindiv.scrollTop;
      localx = d3.mouse(this)[0] + movex + 16;
      localy = d3.mouse(this)[1] + movey + 16;
      select_rect.data([{
        x: localx,
        y: localy,
        w: 0,
        h: 0
      }]);
      select_rect.attr("x", function(d) {
        return d.x;
      }).attr("y", function(d) {
        return d.y;
      }).attr("width", function(d) {
        return d.w;
      }).attr("height", function(d) {
        return d.h;
      });
    }).on("mouseup", function() {
      if (nodeclick) {
        nodeclick = false;
      } else {
        d3.selectAll(".selected").classed("selected", function(d) {
          d.selected = false;
          return false;
        });
      }
      if (mousedownnode) {
        drag_line.classed('hidden', true).style('marker-end', '');
      }
      if (!mousedownnode) {
        if (!nodesselected) {
          var movex = maindiv.scrollLeft;
          var movey = maindiv.scrollTop;
          extentx = d3.mouse(this)[0] + movex + 16;
          extenty = d3.mouse(this)[1] + movey + 16;
          var rstartx, rendx, rstarty, rendy;
          if (localx > extentx) {
            rstartx = extentx;
            rendx = localx;
          } else {
            rstartx = localx;
            rendx = extentx;
          }
          if (localy > extenty) {
            rstarty = extenty;
            rendy = localy;
          } else {
            rstarty = localy;
            rendy = extenty;
          }
          node.classed("selected", function(d) {
            if (d.nx > rstartx && d.nx < rendx && d.ny > rstarty && d.ny < rendy) {
              d.selected = true;
              return true;
            }
          });
          nodesselected = true;
        }
      }
      resetMouseVars();
      select_rect.attr("width", 0).attr("height", 0);
    }).on("mousemove", function() {
      var movex = maindiv.scrollLeft;
      var movey = maindiv.scrollTop;
      var mousex = d3.mouse(this)[0] + movex;
      var mousey = d3.mouse(this)[1] + movey;
      if (!mousedownnode) {
        if (!nodesselected) {
          var w1 = mousex - localx + 16;
          if (w1 < 0)
            w1 = 0;
          var h1 = mousey - localy + 16;
          if (h1 < 0)
            h1 = 0;
          select_rect.data([{
            x: 0,
            y: 0,
            w: w1,
            h: h1
          }]);
          select_rect.attr("width", function(d) {
            return d.w;
          }).attr("height", function(d) {
            return d.h;
          });
        }
        return;
      }
      drag_line.attr('d', 'M' + mousedownnode.nx + ',' + mousedownnode.ny + 'L' + mousex + ',' + mousey)
    });
    this._initMainMenu();
    this._initMenu();
    this._initSubMenu();
    this._initGroupMenu();
    this._initLinkMenu();
    drag_line = this._layer.append('svg:path').attr('class', 'link dragline hidden').attr('d', 'M0,0L0,0');
    var select_g = this._layer.append("g").attr("class", "brush").data([{
      x: 0.0,
      y: 0.0,
      w: 0.0,
      h: 0.0
    }]);
    select_rect = select_g.append("svg:rect").attr("class", "selectrect").attr("fill-opacity", 0).attr("stroke", "red").attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("width", function(d) {
      return d.w;
    }).attr("height", function(d) {
      return d.h;
    })
    link = this._layer.append("g").attr("class", "link").selectAll("line");
    link1 = this._layer.append("g").attr("class", "link1").selectAll("line");
    linktip = this._layer.append("g").attr("class", "linktip").selectAll("line");
    linktext = this._layer.append("g").attr("class", "text2link").selectAll("text");
    linkintext = this._layer.append("g").attr("class", "text2linkin").selectAll("text");
    linkouttext = this._layer.append("g").attr("class", "text2linkout").selectAll("text");
    var nodelist = this._layer.append("g").attr("class", "nodelist");
    nodedata = new Array();
    nodelinedata = new Array();
    var nodeobj = {};
    for (var i = 0; i < this._items.length; i++) {
      var item = this._items[i];
      var nodeidid = item.getSvid();
      nodeobj["sid"] = nodeidid;
      nodeobj["nx"] = item.getNx() - 16;
      nodeobj["ny"] = item.getNy() - 16;
      nodeobj["otype"] = item.getSvgtype();
      nodeobj["localip"] = item.getLocalip();
      nodeobj["mac"] = item.getMac();
      nodeobj["name"] = item.getName();
      nodeobj["customname"] = item.getCustomname();
      nodeobj["factory"] = item.getFactory();
      nodeobj["model"] = item.getModel();
      nodeobj["state"] = 0;
      nodelinedata[nodeidid] = nodeobj;
      nodedata.push(nodeobj);
      nodeobj = {};
    }
    linetextdata = new Array();
    lineidata = new Array();
    var lineobj = {};
    for (var i = 0; i < this._lines.length; i++) {
      var item = this._lines[i];
      var source1 = item.getLsource();
      var target1 = item.getLtarget();
      var liid = item.getLid();
      lineobj["source"] = nodelinedata[source1];
      lineobj["target"] = nodelinedata[target1];
      lineobj["lid"] = liid;
      lineobj["sinterface"] = item.getSinterface();
      lineobj["tinterface"] = item.getTinterface();
      lineobj["alias"] = item.getAlias();
      lineobj["sdesc"] = item.getSdesc();
      lineobj["tdesc"] = item.getTdesc();
      lineobj["flow"] = item.getFlow();
      lineobj["inflow"] = item.getInflow();
      lineobj["outflow"] = item.getOutflow();
      lineobj["speed"] = item.getSpeed();
      lineobj["pkts"] = item.getPkts();
      lineobj["broadcast"] = item.getBroadcast();
      lineobj["bwusage"] = item.getBwusage();
      lineobj["avgframeLen"] = item.getAvgframeLen();
      lineobj["error"] = item.getError();
      lineobj["warn"] = item.getWarn();
      lineobj["pktserror"] = item.getPktserror();
      lineobj["pktswarn"] = item.getPktswarn();
      lineobj["broadcasterror"] = item.getBroadcasterror();
      lineobj["broadcastwarn"] = item.getBroadcastwarn();
      lineobj["bwusagerror"] = item.getBwusagerror();
      lineobj["bwusagewarn"] = item.getBwusagewarn();
      lineobj["selfalert"] = item.getSelfalert();
      lineobj["portstate"] = item.getPortstate();
      lineidata[liid] = lineobj;
      linetextdata.push(lineobj);
      lineobj = {};
    }
    node = nodelist.selectAll(".node");
    this.createnodes();
    this.initlinks();
    this.inioverviewnode();
    this.inioverviewlink();
    this.initrect();
  },
  initlinks: function() {
    var that = this;
    var linkshowtype = this.getLinkDisplayType();
    var showpc = that.getShowpc();
    var hidelines = this.getHidelines();
    link = link.data(linetextdata);
    link.enter().append("path").attr("id", function(d) {
      return 'link' + d.lid;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6 || linkshowtype == 1) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style('marker-mid', function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return '';
      }
      if (linkshowtype == 1)
        return 'url(#end-arrow)';
      else
        return '';
    }).style('marker-end', function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return '';
      }
      if (linkshowtype == 5)
        return 'url(#end-arrow)';
      else
        return '';
    }).style('marker-start', function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return '';
      }
      if (linkshowtype == 6) {
        return 'url(#end-arrow)';
      } else
        return '';
    }).style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    link1 = link1.data(linetextdata);
    link1.enter().append("path").attr("id", function(d) {
      return 'link1' + d.lid;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style('marker-mid', function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return '';
      }
      if (linkshowtype == 1)
        return 'url(#end-arrow)';
      else
        return '';
    }).style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    linktip = linktip.data(linetextdata);
    linktip.enter().append("line").attr("id", function(d) {
      return d.lid;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    }).style("stroke-width", "16px").style("stroke", "blue").style("stroke-opacity", "0.0").on("contextmenu", this.contextlinkmenu);
    linktip.append("svg:title").text(function(d) {
      var vv1;
      var vv2;
      if (d.sdesc == '') {
        vv1 = d.source.localip + ':' + d.sinterface;
      } else {
        vv1 = d.source.localip + ':' + d.sinterface + '[' + d.sdesc + ']';
      }
      if (d.tdesc == '') {
        vv2 = d.target.localip + ':' + d.tinterface;
      } else {
        vv2 = d.target.localip + ':' + d.tinterface + '[' + d.tdesc + ']';
      }
      return linktips.replace('p1', vv1).replace('p2', vv2).replace('p3', d.flow + " Kbps").replace('p4', d.pkts + " Pkts/s").replace('p5', d.broadcast + " Pkts/s").replace('p6', d.bwusage + "% (100Mbps)").replace('p7', d.avgframeLen + " Byte/Pkt").replace('p8', d.outflow + ' Kbps').replace('p9', d.inflow + ' Kbps');
    });
    linktext = linktext.data(linetextdata);
    linktext.enter().append("text").attr("id", function(d) {
      return 'text2link' + d.lid;
    }).attr("x", function(d) {
      return (d.source.nx + d.target.nx) / 2;
    }).attr("y", function(d) {
      return (d.source.ny + d.target.ny) / 2;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      return "rotate(" + angle1 + " " + ((d.source.nx + d.target.nx) / 2.0) + "," + ((d.source.ny + d.target.ny) / 2.0) + ")";
    }).attr("dy", "-6").style("stroke-width", "2px").style("cursor", "default").style("stroke-linejoin", "round").style("font-size", "12px").style("font-weight", "bold").style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      switch (linkshowtype) {
        case 2:
          return d.pkts + "Pkts/s";
        case 3:
          return d.broadcast + "Pkts/s";
        case 4:
          return d.bwusage + "% (100Mbps)";
        case 5:
          return d.outflow + "Kbps";
        case 6:
          return d.inflow + "Kbps";
        default:
          return ""
      }
    });
    linkintext = linkintext.data(linetextdata);
    linkintext.enter().append("text").attr("id", function(d) {
      return 'text2linkin' + d.lid;
    }).attr("x", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      return (d.source.nx + endx) / 2;
    }).attr("y", function(d) {
      var endy = (d.source.ny + d.target.ny) / 2;
      return (d.source.ny + endy) / 2;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      return "rotate(" + angle1 + " " + midx + "," + midy + ")";
    }).attr("dy", "-6").style("stroke-width", "2px").style("cursor", "default").style("stroke-linejoin", "round").style("font-size", "12px").style("font-weight", "bold").style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      if (linkshowtype == 1) {
        return d.inflow + "Kbps";
      } else {
        return "";
      }
    });
    linkouttext = linkouttext.data(linetextdata);
    linkouttext.enter().append("text").attr("id", function(d) {
      return 'text2linkout' + d.lid;
    }).attr("x", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var midx = (startx + d.target.nx) / 2;
      return midx;
    }).attr("y", function(d) {
      var starty = (d.source.ny + d.target.ny) / 2;
      var midy = (starty + d.target.ny) / 2;
      return midy;
    }).attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      return "rotate(" + angle1 + " " + midx + "," + midy + ")";
    }).attr("dy", "-6").style("stroke-width", "2px").style("cursor", "default").style("stroke-linejoin", "round").style("font-size", "12px").style("font-weight", "bold").style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      if (linkshowtype == 1) {
        return d.outflow + "Kbps";
      } else {
        return "";
      }
    });
  },
  LocateNode: function(tempip) {
    var localnode = null;
    for (var i = 0; i < nodedata.length; i++) {
      if (nodedata[i].localip == tempip) {
        localnode = nodedata[i];
        break;
      }
    }
    this._UpdateNode = null;
    if (localnode != null) {
      var childnode = d3.select('#' + localnode.sid).node();
      this._UpdateNode = childnode;
      var pparentn = childnode.parentNode;
      d3.select(pparentn).classed("selected", true)
      this._UpdateCount = 0;
      this._Timer1 = new rwt.client.Timer(500);
      this._Timer1.addEventListener("interval", this.changeColor, this);
      this._Timer1.start();
      var scleft = localnode.nx;
      if (localnode.nx > 120)
        scleft = localnode.nx - 120;
      var sctop = localnode.ny;
      if (localnode.ny > 120)
        sctop = localnode.ny - 120;
      maindiv.scrollLeft = scleft;
      maindiv.scrollTop = sctop;
    } else {}
  },
  changeColor: function() {
    try {
      this._UpdateCount = this._UpdateCount + 1;
      if (this._UpdateCount > 10) {
        d3.select(this._UpdateNode).style("stroke", "#999");
        d3.select(this._UpdateNode).style("stroke-width", "2");
        d3.select(this._UpdateNode).style("stroke-dasharray", "2,2");
        this._Timer1.stop();
        this._UpdateCount = 0;
      } else {
        if (this._UpdateTag == 0) {
          this._UpdateTag = 1;
          d3.select(this._UpdateNode).style("stroke-dasharray", "none");
          d3.select(this._UpdateNode).style("stroke-width", "4");
          d3.select(this._UpdateNode).style("stroke", "#00FF00");
        } else {
          d3.select(this._UpdateNode).style("stroke", "#FF0000");
          d3.select(this._UpdateNode).style("stroke-width", "6");
          d3.select(this._UpdateNode).style("stroke-dasharray", "none");
          this._UpdateTag = 0;
        }
        this._Timer1.stop();
        this._Timer1.restart();
      }
    } catch (e) {}
  },
  DealLinks: function() {
    var Lcount = 30;
    var that = this;
    var linkshowtype = this.getLinkDisplayType();
    var hidelines = this.getHidelines();
    var LineState = false;
    var AllLines = new Array();
    var tempLines = new Array();
    var PartLines = new Array();
    linetextdata.map(function(obj, index) {
      AllLines.push(obj);
      tempLines.push(obj);
    });
    AllLines.map(function(obj, index) {
      var temp = new Array();
      for (var i = 0; i < tempLines.length; i++) {
        var tempobj = tempLines[i];
        if (tempobj != undefined)
          if (obj.source.sid == tempobj.source.sid && obj.target.sid == tempobj.target.sid) {
            temp.push(tempobj);
            delete tempLines[i];
          } else if (obj.source.sid == tempobj.target.sid && obj.target.sid == tempobj.source.sid) {
          temp.push(tempobj);
          delete tempLines[i];
        }
      }
      if (temp.length > 1)
        PartLines.push(temp);
    });
    if (PartLines.length < 1)
      return;
    var LineState = false;
    var XYMult = new Array();
    for (var j = 0; j < PartLines.length; j++) {
      var nstart = PartLines[j][0].source;
      var nend = PartLines[j][0].target;
      var len = Math.sqrt(Math.pow((nstart.ny - nend.ny), 2) + Math.pow((nstart.nx - nend.nx), 2));
      var v1 = Math.abs(nstart.ny - nend.ny) / len;
      var v2 = Math.abs(nstart.nx - nend.nx) / len;
      var Mult = new Array(2);
      if ((nstart.ny - nend.ny) * (nstart.nx - nend.nx) > 0) {
        LineState = true;
      }
      Mult[0] = v1;
      Mult[1] = v2;
      XYMult.push(Mult);
    }
    if (PartLines.length != XYMult.length)
      return;
    var result = new Array();
    for (var n = 0; n < PartLines.length; n++) {
      var partLine = PartLines[n];
      if (partLine.length < 1)
        continue;
      var xy = XYMult[n];
      if (LineState) {
        for (var j = 0; j < partLine.length; j++) {
          var lineobj = {};
          var inodelinedata = partLine[j];
          var newsourcex;
          var newsourcey;
          var newtargetx;
          var newtargety;
          if (j % 2 == 0) {
            newsourcex = inodelinedata.source.nx + (xy[0] * j / 2 * Lcount);
            newsourcey = inodelinedata.source.ny + (-xy[1] * j / 2 * Lcount);
            newtargetx = inodelinedata.target.nx + (xy[0] * j / 2 * Lcount);
            newtargety = inodelinedata.target.ny + (-xy[1] * j / 2 * Lcount);
          } else {
            newsourcex = inodelinedata.source.nx + (-xy[0] * j / 2 * Lcount);
            newsourcey = inodelinedata.source.ny + (xy[1] * j / 2 * Lcount);
            newtargetx = inodelinedata.target.nx + (-xy[0] * j / 2 * Lcount);
            newtargety = inodelinedata.target.ny + (xy[1] * j / 2 * Lcount);
          }
          lineobj['lid'] = inodelinedata.lid;
          lineobj['sourcex'] = newsourcex;
          lineobj['sourcey'] = newsourcey;
          lineobj['targetx'] = newtargetx;
          lineobj['targety'] = newtargety;
          result.push(lineobj);
        }
      } else {
        for (var j = 0; j < partLine.length; j++) {
          var lineobj = {};
          var inodelinedata = partLine[j];
          var newsourcex;
          var newsourcey;
          var newtargetx;
          var newtargety;
          if (j % 2 == 0) {
            newsourcex = inodelinedata.source.nx + (xy[0] * j / 2 * Lcount);
            newsourcey = inodelinedata.source.ny + (xy[1] * j / 2 * Lcount);
            newtargetx = inodelinedata.target.nx + (xy[0] * j / 2 * Lcount);
            var newtargety = inodelinedata.target.ny + (xy[1] * j / 2 * Lcount);
          } else {
            newsourcex = inodelinedata.source.nx + (-xy[0] * j / 2 * Lcount);
            newsourcey = inodelinedata.source.ny + (-xy[1] * j / 2 * Lcount);
            newtargetx = inodelinedata.target.nx + (-xy[0] * j / 2 * Lcount);
            newtargety = inodelinedata.target.ny + (-xy[1] * j / 2 * Lcount);
          }
          lineobj['lid'] = inodelinedata.lid;
          lineobj['sourcex'] = newsourcex;
          lineobj['sourcey'] = newsourcey;
          lineobj['targetx'] = newtargetx;
          lineobj['targety'] = newtargety;
          result.push(lineobj);
        }
      }
    }
    for (var i = 0; i < result.length; i++) {
      var data4 = result[i];
      d3.select('#' + data4.lid).attr('x1', data4.sourcex).attr('y1', data4.sourcey).attr('x2', data4.targetx).attr('y2', data4.targety);
      var endx = (data4.sourcex + data4.targetx) / 2.0;
      var endy = (data4.sourcey + data4.targety) / 2.0;
      var midx = (data4.sourcex + endx) / 2.0;
      var midy = (data4.sourcey + endy) / 2.0;
      var ldata = 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + data4.sourcex + ',' + data4.sourcey;
      d3.select('#link' + data4.lid).attr('d', ldata).style('marker-mid', function(d) {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "";
        }
        if (linkshowtype == 1)
          return 'url(#end-arrow)';
        else
          return '';
      }).style('marker-end', function(d) {
        if (linkshowtype == 5)
          return '';
        else
          return '';
      }).style('marker-start', function(d) {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "";
        }
        if (linkshowtype == 6) {
          return 'url(#end-arrow)';
        } else
          return '';
      });
      var startx = (data4.sourcex + data4.targetx) / 2.0;
      var starty = (data4.sourcey + data4.targety) / 2.0;
      var midx1 = (startx + data4.targetx) / 2.0;
      var midy1 = (starty + data4.targety) / 2.0;
      var ldata1 = 'M' + startx + ',' + starty + ' ' + midx1 + ',' + midy1 + ' ' + data4.targetx + ',' + data4.targety;
      d3.select('#link1' + data4.lid).attr('d', ldata1).style('marker-start', function(d) {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "";
        }
        if (linkshowtype == 5)
          return 'url(#end-arrow)';
        else
          return '';
      });
      if (linkshowtype == 1) {
        d3.select('#text2link' + data4.lid).style("visibility", "hidden");
        if (hidelines.indexOf(data4.lid) >= 0) {} else {
          d3.select('#text2linkin' + data4.lid).attr('x', midx).attr('y', midy).style("visibility", "visible").attr("transform", function(d) {
            angle = that.getAngle(data4.sourcex, data4.sourcey, data4.targetx, data4.targety);
            return "rotate(" + angle + " " +
              (midx) + "," +
              (midy) + ")";
          });
          d3.select('#text2linkout' + data4.lid).attr('x', midx1).attr('y', midy1).style("visibility", "visible").attr("transform", function(d) {
            angle = that.getAngle(data4.sourcex, data4.sourcey, data4.targetx, data4.targety);
            return "rotate(" + angle + " " +
              (midx1) + "," +
              (midy1) + ")";
          });
        }
      } else {
        d3.select('#text2linkin' + data4.lid).style("visibility", "hidden");
        d3.select('#text2linkout' + data4.lid).style("visibility", "hidden");
        if (hidelines.indexOf(data4.lid) >= 0) {} else {
          d3.select('#text2link' + data4.lid).style("visibility", "visible").attr('x', startx).attr('y', starty).attr("transform", function(d) {
            angle = that.getAngle(data4.sourcex, data4.sourcey, data4.targetx, data4.targety);
            return "rotate(" + angle + " " +
              (startx) + "," +
              (starty) + ")";
          });
        }
      }
    }
  },
  updatelinks: function() {
    var that = this;
    var linkshowtype = this.getLinkDisplayType();
    link.data(linetextdata).attr("id", function(d) {
      return 'link'+d.lid;
    }).attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    }).style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    link1.data(linetextdata).attr("id", function(d) {
      return 'link1'+d.lid;
    }).attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    }).style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    linktip.data(linetextdata).attr("id", function(d) {
      return d.lid;
    }).attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    });
    linktip.data(linetextdata).text(function(d) {
      ""
    });
    linktip.append("svg:title").text(function(d) {
      var tempflow = d.flow;
      var stringflow = " Kbps";
      if (tempflow > 1024) {
        tempflow = tempflow / 1024;
        stringflow = " Mbps";
        if (tempflow > 1024) {
          tempflow = tempflow / 1024;
          stringflow = " Gbps";
          if (tempflow > 1024) {
            tempflow = tempflow / 1024;
            stringflow = " Tbps";
          }
        }
      }
      var tempoutflow = d.outflow;
      var stringoutflow = " Kbps";
      if (tempoutflow > 1024) {
        tempoutflow = tempoutflow / 1024;
        stringoutflow = " Mbps";
        if (tempoutflow > 1024) {
          tempoutflow = tempoutflow / 1024;
          stringoutflow = " Gbps";
          if (tempoutflow > 1024) {
            tempoutflow = tempoutflow / 1024;
            stringoutflow = " Tbps";
          }
        }
      }
      var tempinflow = d.inflow;
      var stringinflow = " Kbps";
      if (tempinflow > 1024) {
        tempinflow = tempinflow / 1024;
        stringinflow = " Mbps";
        if (tempinflow > 1024) {
          tempinflow = tempinflow / 1024;
          stringinflow = " Gbps";
          if (tempinflow > 1024) {
            tempinflow = tempinflow / 1024;
            stringinflow = " Tbps";
          }
        }
      }
      var vv1;
      var vv2;
      if (d.sdesc == '' || d.sdesc == undefined) {
        vv1 = d.source.localip + ':' + d.sinterface;
      } else {
        vv1 = d.source.localip + ':' + d.sinterface + '[' + d.sdesc + ']';
      }
      if (d.tdesc == '' || d.tdesc == undefined) {
        vv2 = d.target.localip + ':' + d.tinterface;
      } else {
        vv2 = d.target.localip + ':' + d.tinterface + '[' + d.tdesc + ']';
      }
      return linktips.replace('p1', vv1).replace('p2', vv2).replace('p3', Math.round(tempflow * 10) / 10 + stringflow).replace('p4', d.pkts + " Pkts/s").replace('p5', d.broadcast + " Pkts/s").replace('p6', d.bwusage + "% (100Mbps)").replace('p7', d.avgframeLen + " Byte/Pkt").replace('p8', Math.round(tempoutflow * 10) / 10 + stringoutflow).replace('p9', Math.round(tempinflow * 10) / 10 + stringinflow);
    });
    linktext.data(linetextdata).attr("id", function(d) {
      return 'text2link' + d.lid;
    }).attr("x", function(d) {
      return (d.source.nx + d.target.nx) / 2;
    }).attr("y", function(d) {
      return (d.source.ny + d.target.ny) / 2;
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      return "rotate(" + angle1 + " " + ((d.source.nx + d.target.nx) / 2.0) + "," + ((d.source.ny + d.target.ny) / 2.0) + ")";
    }).style("fill", function(d) {
      return "#000000";
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      switch (linkshowtype) {
        case 2:
          return d.pkts + "Pkts/s";
        case 3:
          return d.broadcast + "Pkts/s";
        case 4:
          return d.bwusage + "";
        case 5:
          var tempoutflow = d.outflow;
          var stringoutflow = " Kbps";
          if (tempoutflow > 1024) {
            tempoutflow = tempoutflow / 1024;
            stringoutflow = " Mbps";
            if (tempoutflow > 1024) {
              tempoutflow = tempoutflow / 1024;
              stringoutflow = " Gbps";
              if (tempoutflow > 1024) {
                tempoutflow = tempoutflow / 1024;
                stringoutflow = " Tbps";
              }
            }
          }
          return Math.round(tempoutflow * 10) / 10 + stringoutflow;
        case 6:
          var tempinflow = d.inflow;
          var stringinflow = " Kbps";
          if (tempinflow > 1024) {
            tempinflow = tempinflow / 1024;
            stringinflow = " Mbps";
            if (tempinflow > 1024) {
              tempinflow = tempinflow / 1024;
              stringinflow = " Gbps";
              if (tempinflow > 1024) {
                tempinflow = tempinflow / 1024;
                stringinflow = " Tbps";
              }
            }
          }
          return Math.round(tempinflow * 10) / 10 + stringinflow;
        default:
          return ""
      }
    });
    linkintext.data(linetextdata).attr("id", function(d) {
      return 'text2linkin' + d.lid;
    }).attr("x", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      return (d.source.nx + endx) / 2;
    }).attr("y", function(d) {
      var endy = (d.source.ny + d.target.ny) / 2;
      return (d.source.ny + endy) / 2;
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      return "rotate(" + angle1 + " " + midx + "," + midy + ")";
    }).style("fill", function(d) {
      return "#000000";
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      var tempinflow = d.inflow;
      var stringinflow = " Kbps";
      if (tempinflow > 1024) {
        tempinflow = tempinflow / 1024;
        stringinflow = " Mbps";
        if (tempinflow > 1024) {
          tempinflow = tempinflow / 1024;
          stringinflow = " Gbps";
          if (tempinflow > 1024) {
            tempinflow = tempinflow / 1024;
            stringinflow = " Tbps";
          }
        }
      }
      return Math.round(tempinflow * 10) / 10 + stringinflow;
    });
    linkouttext.data(linetextdata).attr("id", function(d) {
      return 'text2linkout' + d.lid;
    }).attr("x", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var midx = (startx + d.target.nx) / 2;
      return midx;
    }).attr("y", function(d) {
      var starty = (d.source.ny + d.target.ny) / 2;
      var midy = (starty + d.target.ny) / 2;
      return midy;
    }).attr("transform", function(d) {
      angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      return "rotate(" + angle1 + " " + midx + "," + midy + ")";
    }).style("fill", function(d) {
      return "#000000";
    }).style("Stroke", "none").style("text-anchor", "middle").text(function(d) {
      var tempoutflow = d.outflow;
      var stringoutflow = " Kbps";
      if (tempoutflow > 1024) {
        tempoutflow = tempoutflow / 1024;
        stringoutflow = " Mbps";
        if (tempoutflow > 1024) {
          tempoutflow = tempoutflow / 1024;
          stringoutflow = " Gbps";
          if (tempoutflow > 1024) {
            tempoutflow = tempoutflow / 1024;
            stringoutflow = " Tbps";
          }
        }
      }
      return Math.round(tempoutflow * 10) / 10 + stringoutflow;
    });
    that.updateoverviewlink();
  },
  deletelinks: function() {
    var that = this;
    link = link.data(linetextdata, function(d) {
      return (d.lid);
    });
    link.exit().remove();
    link1 = link1.data(linetextdata, function(d) {
      return (d.lid);
    });
    link1.exit().remove();
    linktip = linktip.data(linetextdata, function(d) {
      return (d.lid);
    });
    linktip.exit().remove();
    linktext = linktext.data(linetextdata, function(d) {
      return (d.lid);
    });
    linktext.exit().remove();
    linkintext = linkintext.data(linetextdata, function(d) {
      return (d.lid);
    });
    linkintext.exit().remove();
    linkouttext = linkouttext.data(linetextdata, function(d) {
      return (d.lid);
    });
    linkouttext.exit().remove();
    that.updateoverviewlink();
  },
  refreshnewline: function() {
    var datanewline = this.getNewlinedata();
    var that = this;
    var newlineid = datanewline.lid;
    if (newlineid === "nil") {
      if (typeof(linetempobj) == "undefined")
        return;
      selectlink = linetempobj["lid"];
      that.updatelinksdata(0);
      that.deletelinks();
    } else {
      linetempobj["lid"] = datanewline.lid;
      linetempobj["sinterface"] = datanewline.port1;
      linetempobj["tinterface"] = datanewline.port2;
      lineidata[datanewline.lid] = linetempobj;
      this.updatelinks();
    }
  },
  refreshpline: function() {
    var linedata = this.getPlinedata();
    lineidata[linedata.lid].sinterface = linedata.port1;
    lineidata[linedata.lid].tinterface = linedata.port2;
    lineidata[linedata.lid].sdesc = linedata.desc1;
    lineidata[linedata.lid].tdesc = linedata.desc2;
  },
  updatelinksdata: function(tag) {
    if (tag == 0) {
      for (i = 0; i < linetextdata.length; i++) {
        if (linetextdata[i].lid === selectlink) {
          linetextdata.splice(i, 1);
          break;
        }
      }
    } else if (tag == 1) {
      var newlinedatas = [];
      for (i = 0; i < linetextdata.length; i++) {
        if (linetextdata[i].source.sid === selectnode || linetextdata[i].target.sid === selectnode) {} else {
          newlinedatas.push(linetextdata[i]);
        }
      }
      linetextdata = newlinedatas;
    } else if (tag == 2) {
      var newlinedatas = [];
      for (i = 0; i < linetextdata.length; i++) {
        var isnoexist = true;
        var nid = linetextdata[i].source.sid;
        var nid1 = linetextdata[i].target.sid;
        for (j = 0; j < selectnodes.length; j++) {
          if (nid === selectnodes[j] || nid1 === selectnodes[j])
            isnoexist = false;
        }
        if (isnoexist)
          newlinedatas.push(linetextdata[i]);
      }
      linetextdata = newlinedatas;
    } else if (tag == 3) {
      var newlinedatas = [];
      for (i = 0; i < linetextdata.length; i++) {
        var isnoexist = true;
        var isnoexist1 = true;
        var nid = linetextdata[i].source.sid;
        var nid1 = linetextdata[i].target.sid;
        for (j = 0; j < selectnodes.length; j++) {
          if (nid === selectnodes[j])
            isnoexist = false;
          if (nid1 === selectnodes[j])
            isnoexist1 = false;
        }
        if (isnoexist && isnoexist1) {
          newlinedatas.push(linetextdata[i]);
        } else {
          if (isnoexist && !isnoexist1) {
            linetextdata[i].target = newgroupnode;
            newlinedatas.push(linetextdata[i]);
          }
          if (isnoexist1 && !isnoexist) {
            linetextdata[i].source = newgroupnode;
            newlinedatas.push(linetextdata[i]);
          }
        }
      }
      linetextdata = newlinedatas;
    }
  },
  deletenodes: function() {
    var that = this;
    node = node.data(nodedata, function(d) {
      return (d.sid);
    });
    node.exit().remove();
    that.updateoverviewnode();
  },
  refreshpnode: function() {
    var pnodedata = this.getPnodedata();
    nodelinedata[pnodedata.nid].customname = pnodedata.cname;
    nodelinedata[pnodedata.nid].otype = pnodedata.ntype;
    nodelinedata[pnodedata.nid].localip = pnodedata.newip;
    var vvimage = "rwt-resources/topomap/Other_Blue.ico";
    switch (pnodedata.ntype) {
      case 0:
        vvimage = "rwt-resources/topomap/SwitchRouter_Blue.ico";
        break;
      case 1:
        vvimage = "rwt-resources/topomap/Switch_Blue.ico";
        break;
      case 2:
        vvimage = "rwt-resources/topomap/Router_Blue.ico";
        break;
      case 3:
        vvimage = "rwt-resources/topomap/Firewall_Blue.ico";
        break;
      case 4:
        vvimage = "rwt-resources/topomap/Server_Blue.ico";
        break;
      case 5:
        vvimage = "rwt-resources/topomap/PC_Blue.ico";
        break;
      case 7:
        vvimage = "rwt-resources/topomap/HUB_Blue.ico";
        break;
      case 8:
        vvimage = "rwt-resources/topomap/noSnmp.png";
        break;
      case 9:
        vvimage = "rwt-resources/topomap/database.png";
        break;
      case 23:
        vvimage = "rwt-resources/topomap/APwifi.bmp";
        break;
      case 100:
          vvimage = "rwt-resources/topomap/Group_Blue.bmp";
          break;
      default:
        vvimage = "rwt-resources/topomap/Other_Blue.ico";
    }
    d3.select("#image" + pnodedata.nid).attr("xlink:href", vvimage);
    var nodeshowtype1 = this.getNodeDisplayType();
      console.log(nodeshowtype1);
    if(nodeshowtype1==1)
    this.refreshNodeText(0);
  },
  refreshalertdata: function(alertdata, prealertdata) {
    prealertdata.map(function(obj, index) {
      if (nodelinedata[obj.nid] !== undefined) {
        nodelinedata[obj.nid].state = 0;
      }
    });
    var groupdata = nodedata.filter(function(value) {
      return value.otype == 100;
    });
    groupdata.map(function(obj, index) {
      if (nodelinedata[obj.sid] !== undefined) {
        nodelinedata[obj.sid].state = 0;
      }
    });
    alertdata.map(function(obj, index) {
      if (nodelinedata[obj.nid] !== undefined) {
        nodelinedata[obj.nid].state = obj.state;
      }
      groupdata.map(function(obj1, index1) {
        if (obj1.factory.indexOf(obj.ip) >= 0) {
          if (nodelinedata[obj1.sid] !== undefined) {
            if (nodelinedata[obj1.sid].state != 1)
              nodelinedata[obj1.sid].state = obj.state;
          }
        }
      });
    });
    nodealertimg.attr("xlink:href", function(d) {
      switch (d.state) {
        case 0:
          return "";
        case 1:
          return "rwt-resources/topomap/error.png";
        case 2:
          return "rwt-resources/topomap/warning.png";
        default:
          return "";
      }
    });
  },
  updatenodesdata: function(tag) {
    if (tag == 0) {
      for (i = 0; i < nodedata.length; i++) {
        if (nodedata[i].sid === selectnode) {
          nodedata.splice(i, 1);
          break;
        }
      }
    } else if (tag == 1) {
      var newnodedata = [];
      for (i = 0; i < nodedata.length; i++) {
        var isnoexist = true;
        var nid = nodedata[i].sid;
        for (j = 0; j < selectnodes.length; j++) {
          if (nid === selectnodes[j])
            isnoexist = false;
        }
        if (isnoexist)
          newnodedata.push(nodedata[i]);
      }
      nodedata = newnodedata;
    }
  },
  nudge: function(dx, dy) {
    var linkshowtype = this.getLinkDisplayType();
    node.filter(function(d) {
      return d.selected;
    }).attr("transform", function(d) {
      var max_x = that1.getMaxX() - 20;
      var max_y = that1.getMaxY() - 20;
      d.nx += dx;
      d.ny += dy;
      if (d.nx > max_x)
        d.nx = max_x;
      if (d.ny > max_y)
        d.ny = max_y;
      if (d.ny < 0)
        d.ny = 0;
      nodelinedata[d.sid].nx = d.nx;
      nodelinedata[d.sid].ny = d.ny;
      return "translate(" + d.nx + ", " + d.ny + ")"
    })
    link.filter(function(d) {
      return d.source.selected;
    }).attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6 || linkshowtype == 1) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    });
    link.filter(function(d) {
      return d.target.selected;
    }).attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6 || linkshowtype == 1) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    });
    link1.filter(function(d) {
      return d.source.selected;
    }).attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    });
    link1.filter(function(d) {
      return d.target.selected;
    }).attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    });
    linktip.filter(function(d) {
      return d.source.selected;
    }).attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    });
    linktip.filter(function(d) {
      return d.target.selected;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    });
    linktext.filter(function(d) {
      return (d.source.selected || d.target.selected);
    }).attr("x", function(d) {
      return (d.source.nx + d.target.nx) / 2.0;
    }).attr("y", function(d) {
      return (d.source.ny + d.target.ny) / 2.0;
    }).attr("transform", function(d) {
      angle = that1.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      return "rotate(" + angle + " " +
        ((d.source.nx + d.target.nx) / 2.0) + "," +
        ((d.source.ny + d.target.ny) / 2.0) + ")";
    });
    linkintext.filter(function(d) {
      return (d.source.selected || d.target.selected);
    }).attr("x", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      return (d.source.nx + endx) / 2;
    }).attr("y", function(d) {
      var endy = (d.source.ny + d.target.ny) / 2;
      return (d.source.ny + endy) / 2;
    }).attr("transform", function(d) {
      angle = that1.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      return "rotate(" + angle + " " +
        midx + "," +
        midy + ")";
    });
    linkouttext.filter(function(d) {
      return (d.source.selected || d.target.selected);
    }).attr("x", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var midx = (startx + d.target.nx) / 2;
      return midx;
    }).attr("y", function(d) {
      var starty = (d.source.ny + d.target.ny) / 2;
      var midy = (starty + d.target.ny) / 2;
      return midy;
    }).attr("transform", function(d) {
      angle = that1.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      return "rotate(" + angle + " " +
        midx + "," +
        midy + ")";
    });
    this.DealLinks();
    d3.event.preventDefault();
  },
  createnodes: function() {
    var that = this;

    function resetMouseVars() {
      mousedownnode = null;
      mouseupnode = null;
    }
    var drag = d3.behavior.drag().on("dragstart", function() {
      if (d3.select(this).classed("selected")) {
        drag_line.classed('hidden', true).style('marker-end', '');
        resetMouseVars();
      }
    }).on("drag", function(d) {
      if (d3.select(this).classed("selected") && !dragup) {
        that.nudge(d3.event.dx, d3.event.dy);
      } else {}
    }).on("dragend", function(d) {
      if (mousedownnode) {
        if (mousedownnode === d)
          dragup = true;
        if (!d3.select(this).classed("selected"))
          d3.event.defaultPrevented();
        drag_line.classed('hidden', true).style('marker-end', '');
      }
      resetMouseVars();
      that1.updateoverviewnode();
      that1.updateoverviewlink();
    });
    node = node.data(nodedata);
    nodeenter = node.enter().append("g");
    var showpc = that.getShowpc();
    nodeenter.attr("class1", function(d) {
      if (d.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("class", "node").attr("transform", function(d) {
      return "translate(" + d.nx + ", " + d.ny + ")"
    }).style("visibility", function(d) {
      if (d.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).on("mouseup", function(d) {
      nodeclick = true;
      if (!d.selected) {
        if (!shiftKey) {
          node.classed("selected", function(p) {
            return p.selected = d === p;
          });
        } else {
          d3.select(this).classed("selected", d.selected = true);
        }
      }
      if (!mousedownnode)
        return;
      mouseupnode = d;
      if (mouseupnode === mousedownnode) {
        drag_line.classed('hidden', true).style('marker-end', '');
        resetMouseVars();
        return;
      }
      var a = Math.floor((Math.random() * 100) + 1);
      var tempdata = new Array();
      tempdata.push(mousedownnode);
      tempdata.push(mouseupnode);
      that1._savedata("addline", tempdata);
      linetempobj = {};
      linetempobj["source"] = mousedownnode;
      linetempobj["target"] = mouseupnode;
      linetempobj["lid"] = "test" + a;
      linetempobj["sinterface"] = "6";
      linetempobj["tinterface"] = "0";
      linetempobj["flow"] = 20;
      linetempobj["inflow"] = 10;
      linetempobj["outflow"] = 10;
      linetempobj["pkts"] = 30;
      linetempobj["broadcast"] = 3;
      linetempobj["bwusage"] = 0;
      linetempobj["avgframeLen"] = 0;
      linetempobj["error"] = 100;
      linetempobj["warn"] = 80;
      linetextdata.push(linetempobj);
      that1.initlinks();
      drag_line.classed('hidden', true).style('marker-end', '');
      resetMouseVars();
    }).on("mousedown", function(d) {
      dragup = false;
      var that = this;
      var selectedd = d3.select(this).classed("selected")
      if (!selectedd) {
        d.selected = false;
      }
      if (!d.selected) {
        mousedownnode = d;
        drag_line.style('marker-end', 'url(#end-arrow)').classed('hidden', false).attr('d', 'M' + d.nx + ',' + d.ny + 'L' + d.nx + ',' + d.ny);
      }
    }).call(drag);
    nodeenter.append("text").attr("class", "node2text").attr("x", 0).attr("y", 26).style("fill", "#000000").style("stroke", "#none").style("font-size", "14px").style("cursor", "default").style("text-anchor", "middle").text(function(d) {
      switch (nodeshowtype) {
        case 2:
          return d.name;
        case 3:
          return d.model;
        case 4:
          return d.customname;
        default:
          return d.localip;
      }
    });
    nodetext = d3.selectAll(".node2text");
    nodeenter.append("svg:image").attr("x", -16).attr("y", -16).attr("width", 32).attr("height", 32).attr("id", function(d) {
      return 'image' + d.sid;
    }).attr("xlink:href", function(d) {
      switch (d.otype) {
        case 0:
          return "rwt-resources/topomap/SwitchRouter_Blue.ico";
        case 1:
          return "rwt-resources/topomap/Switch_Blue.ico";
        case 2:
          return "rwt-resources/topomap/Router_Blue.ico";
        case 3:
          return "rwt-resources/topomap/Firewall_Blue.ico";
        case 4:
          return "rwt-resources/topomap/Server_Blue.ico";
        case 5:
          return "rwt-resources/topomap/PC_Blue.ico";
        case 7:
          return "rwt-resources/topomap/HUB_Blue.ico";
        case 8:
          return "rwt-resources/topomap/noSnmp.png";
        case 9:
          return "rwt-resources/topomap/database.png";
        case 23:
          return "rwt-resources/topomap/APwifi.bmp";
        case 100:
          return "rwt-resources/topomap/Group_Blue.bmp";
        default:
          return "rwt-resources/topomap/Other_Blue.ico";
      }
    });
    var noderects = nodeenter.append("rect").attr("x", -16).attr("y", -16).attr("width", 32).attr("height", 32).attr("id", function(d) {
      return d.sid;
    }).style("stroke-width", "2").style("stroke-dasharray", "2,2").on("dblclick", function(d) {
      if (d.otype == 100) {
        that1._savedata("looksubchart", d.name);
      } else {}
    }).on("contextmenu", that.contextnodemenu);
    noderects.append("svg:title").text(function(d) {
      switch (d.otype) {
        case 100:
          return grouptips.replace('p1', d.localip).replace('p2', d.mac).replace('p3', d.factory);
        default:
          return nodetips.replace('p1', d.localip).replace('p2', d.mac).replace('p3', d.name).replace('p4', d.customname).replace('p5', d.factory).replace('p6', d.model);
      }
    });
    nodeenter.append("svg:image").attr("class", "node2alert").attr("x", 4).attr("y", 4).attr("width", 12).attr("height", 12).attr("xlink:href", "");
    nodealertimg = d3.selectAll(".node2alert");
  },
  contextnodemenu: function(data, index) {
    var selectnodes = d3.selectAll(".selected");
    var size = selectnodes[0].length;
    var bodyNode = d3.select(maindiv).node();
    var position = d3.mouse(bodyNode);
    var xx = position[0];
    var yy = position[1];
    nodeclick = true;
    if (size > 1) {
      selectnode = d3.select(this).attr("id");
      // var topy = that1.getTopy();
      // var leftx = that1.getLeftx();
      // var cheight = that1.getCompHeight();
      // var scrollLeft1 = maindiv.scrollLeft;
      // var scrollTop1 = maindiv.scrollTop;
      // var xx = d3.event.clientX - leftx;
      // var yy = d3.event.clientY - topy;
      //mousexx = xx + scrollLeft1;
      // mouseyy = yy + scrollTop1;
      mousexx=xx;
      mouseyy=yy;
      d3.select('#submenu').style('position', 'absolute').style('left', xx + "px").style('top', yy + "px").style('display', 'inline-block').on('mouseleave', function() {
        d3.select('#submenu').style('display', 'none');
      });
      d3.event.preventDefault();
    } else {
      if (data.otype == 100) {
        selectgroup = data.name;
        selectnode = data.sid;
        // var topy = that1.getTopy();
        // var leftx = that1.getLeftx();
        // var cheight = that1.getCompHeight();
        // var xx = d3.event.clientX - leftx;
        // var yy = d3.event.clientY - topy;
         mousexx = xx;
         mouseyy = yy;
        d3.select('#groupmenu').style('position', 'absolute').style('left', xx + "px").style('top', yy + "px").style('display', 'inline-block').on('mouseleave', function() {
          d3.select('#groupmenu').style('display', 'none');
        });
        d3.event.preventDefault();
      } else {
        selectnode = data.sid;
        var temppnode = this.parentNode;
        if (temppnode.style.visibility == 'hidden') {
          return;
        }
        // var topy = that1.getTopy();
        // var leftx = that1.getLeftx();
         var cheight = that1.getCompHeight();
        // var xx = d3.event.clientX - leftx;
        // var yy = d3.event.clientY - topy;
        var fialyy = yy + 30 * nodemenucount;
        if (fialyy > cheight) {
          var yyy = fialyy - cheight;
          yy = yy - yyy;
        }
        d3.select('#mymenu').style('position', 'absolute').style('left', xx + "px").style('top', yy + "px").style('display', 'inline-block').on('mouseleave', function() {
          d3.select('#mymenu').style('display', 'none');
        });
        d3.event.preventDefault();
      }
    }
  },
  updatesubchart: function() {
    var that = this;
    that.updatelinksdata(3);
    that.updatenodesdata(1);
    that.deletelinks();
    that.deletenodes();
    that.createnodes();
    that.updatelinks();
  },
  udatetopochart: function(data) {
    var that = this;
    var nodeobj = {};
    var lineobj = {};
    that.updatenodesdata(0);
    that.updatelinksdata(1);
    that.deletelinks();
    that.deletenodes();
    data.map(function(obj, index) {
      var jid = obj.jid;
      if (jid.indexOf("n") == 0) {
        nodeobj["sid"] = jid;
        nodeobj["nx"] = obj.nx - 16;
        nodeobj["ny"] = obj.ny - 16;
        nodeobj["otype"] = obj.type;
        nodeobj["localip"] = obj.ip;
        nodeobj["mac"] = obj.mac;
        nodeobj["name"] = obj.name;
        nodeobj["customname"] = obj.customname;
        nodeobj["factory"] = obj.manufact;
        nodeobj["model"] = obj.model;
        nodelinedata[jid] = nodeobj;
        nodedata.push(nodeobj);
        nodeobj = {};
      } else {
        var source1 = obj.source;
        var target1 = obj.target;
        lineobj["source"] = nodelinedata[source1];
        lineobj["target"] = nodelinedata[target1];
        lineobj["lid"] = jid;
        lineobj["sinterface"] = obj.sinterface;
        lineobj["tinterface"] = obj.tinterface;
        lineobj["flow"] = obj.flow;
        lineobj["outflow"] = 0;
        lineobj["inflow"] = 0;
        lineobj["pkts"] = 0;
        lineobj["broadcast"] = 0;
        lineobj["bwusage"] = 0;
        lineobj["avgframeLen"] = 0;
        lineobj["error"] = obj.error;
        lineobj["warn"] = obj.warn;
        linetextdata.push(lineobj);
        lineobj = {};
      }
    });
    that.createnodes();
    that.initlinks();
    that.updateoverviewnode();
    that.updateoverviewlink();
  },
  getlinkcolor: function(d) {
    var linkshowtype = this.getLinkDisplayType();
    switch (linkshowtype) {
      case 2:
        if (d.pkts > d.pktserror)
          return "red";
        if (d.pkts > d.pktswarn)
          return "#FFD306";
        if (d.pkts > 0)
          return "#00DB00";
        if (d.pkts === 0)
          return "#272727";
      case 3:
        if (d.broadcast > d.broadcasterror)
          return "red";
        if (d.broadcast > d.broadcastwarn)
          return "#FFD306";
        if (d.broadcast > 0)
          return "#00DB00";
        if (d.broadcast === 0)
          return "#272727";
      case 4:
        if (d.bwusage > d.bwusagerror)
          return "red";
        if (d.bwusage > d.bwusagewarn)
          return "#FFD306";
        if (d.bwusage > 0)
          return "#00DB00";
        if (d.bwusage === 0)
          return "#272727";
      case 5:
        if (d.outflow > d.error)
          return "red";
        if (d.outflow > d.warn)
          return "#FFD306";
        if (d.outflow > 0)
          return "#00DB00";
        if (d.outflow === 0)
          return "#272727";
      case 6:
        if (d.inflow > d.error)
          return "red";
        if (d.inflow > d.warn)
          return "#FFD306";
        if (d.inflow > 0)
          return "#00DB00";
        if (d.inflow === 0)
          return "#272727";
      default:
        if (d.flow > d.error)
          return "red";
        if (d.flow > d.warn)
          return "#FFD306";
        if (d.flow > 0)
          return "#00DB00";
        if (d.flow === 0)
          return "#272727";
    }
  },
  toporedrawlayout: function(layoutdata) {
    that = this;
    var minvalue = layoutdata.pop();
    var minx = Math.abs(minvalue.nx);
    var miny = Math.abs(minvalue.ny);
    var maxvalue = layoutdata.pop();
    var maxx = Math.abs(maxvalue.nx + 64 + minx);
    var maxy = Math.abs(maxvalue.ny + 64 + miny);
    if (maxx > 2700) {
      that.svg.attr("width", maxx + '');
    }
    if (maxy > 2200) {
      that.svg.attr("height", maxy + '');
    }
    this.setMaxX(maxx);
    this.setMaxY(maxy);
    layoutdata.map(function(obj, index) {
      nodelinedata[obj.nid].nx = obj.nx + 64 + minx;
      nodelinedata[obj.nid].ny = obj.ny + 64 + miny;
    });
    node.data(nodedata).attr("transform", function(d) {
      return "translate(" + d.nx + ", " + d.ny + ")"
    })
    link.attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6 || linkshowtype == 1) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    });
    link1.attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    });
    linktip.attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    });
    linktext.attr("x", function(d) {
      return (d.source.nx + d.target.nx) / 2.0;
    }).attr("y", function(d) {
      return (d.source.ny + d.target.ny) / 2.0;
    }).attr("transform", function(d) {
      angle = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      return "rotate(" + angle + " " +
        ((d.source.nx + d.target.nx) / 2.0) + "," +
        ((d.source.ny + d.target.ny) / 2.0) + ")";
    });
    linkintext.attr("x", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      return (d.source.nx + endx) / 2;
    }).attr("y", function(d) {
      var endy = (d.source.ny + d.target.ny) / 2;
      return (d.source.ny + endy) / 2;
    }).attr("transform", function(d) {
      angle = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      return "rotate(" + angle + " " +
        midx + "," +
        midy + ")";
    });
    linkouttext.attr("x", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var midx = (startx + d.target.nx) / 2;
      return midx;
    }).attr("y", function(d) {
      var starty = (d.source.ny + d.target.ny) / 2;
      var midy = (starty + d.target.ny) / 2;
      return midy;
    }).attr("transform", function(d) {
      angle = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      return "rotate(" + angle + " " +
        midx + "," +
        midy + ")";
    });
    w = this.getMaxX();
    h = this.getMaxY();
    scaleFactor = Math.min(overvieww / w, overviewh / h)
    var ovlayer = d3.select("#overview");
    ovlayer.attr("transform", "scale(" + scaleFactor + ")");
    this.updateoverviewnode();
    this.updateoverviewlink();
    this.DealLinks();
  },
  refreshData: function(refreshdata) {
    var linkshowtype = this.getLinkDisplayType();
    refreshdata.map(function(obj, index) {
      if (lineidata[obj.lid] !== undefined) {
        lineidata[obj.lid].flow = obj.flow;
        lineidata[obj.lid].outflow = obj.outflow;
        lineidata[obj.lid].inflow = obj.inflow;
        lineidata[obj.lid].speed = obj.speed;
        lineidata[obj.lid].pkts = obj.pkts;
        lineidata[obj.lid].alias = obj.alias;
        lineidata[obj.lid].broadcast = obj.broadcast;
        lineidata[obj.lid].bwusage = obj.bwusage;
        lineidata[obj.lid].avgframeLen = obj.avgframeLen;
        lineidata[obj.lid].portstate = obj.portstate;
      }
    });
    var hidelines = this.getHidelines();
    link = link.data(linetextdata).attr("d", function(d) {
      var endx = (d.source.nx + d.target.nx) / 2;
      var endy = (d.source.ny + d.target.ny) / 2;
      var midx = (d.source.nx + endx) / 2;
      var midy = (d.source.ny + endy) / 2;
      if (linkshowtype == 6 || linkshowtype == 1) {
        return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
      } else {
        return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
      }
    }).style("Stroke", function(d) {
      switch (linkshowtype) {
        case 2:
          if (d.pkts > d.pktserror)
            return "red";
          if (d.pkts > d.pktswarn)
            return "#FFD306";
          if (d.pkts > 0)
            return "#00DB00";
          if (d.pkts === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        case 3:
          if (d.broadcast > d.broadcasterror)
            return "red";
          if (d.broadcast > d.broadcastwarn)
            return "#FFD306";
          if (d.broadcast > 0)
            return "#00DB00";
          if (d.broadcast === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        case 4:
          if (d.bwusage > d.bwusagerror)
            return "red";
          if (d.bwusage > d.bwusagewarn)
            return "#FFD306";
          if (d.bwusage > 0)
            return "#00DB00";
          if (d.bwusage === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        default:
          if (d.flow > d.error)
            return "red";
          if (d.flow > d.warn)
            return "#FFD306";
          if (d.flow > 0)
            return "#00DB00";
          if (d.flow === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
      }
    }).style("stroke-width", function(d) {
      var tempflow = d.flow;
      var stringflow = "1px";
      if (tempflow > 1000) {
        tempflow = tempflow / 1000;
        stringflow = "2px";
        if (tempflow > 1000) {
          tempflow = tempflow / 1000;
          stringflow = "3px";
          if (tempflow > 1000) {
            tempflow = tempflow / 1000;
            stringflow = "4px";
          }
        }
      }
      return stringflow;
    });
    link1 = link1.data(linetextdata).attr("d", function(d) {
      var startx = (d.source.nx + d.target.nx) / 2;
      var starty = (d.source.ny + d.target.ny) / 2;
      var midx = (startx + d.target.nx) / 2;
      var midy = (starty + d.target.ny) / 2;
      if (linkshowtype == 6) {
        return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
      } else {
        return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
      }
    }).style("Stroke", function(d) {
      switch (linkshowtype) {
        case 2:
          if (d.pkts > d.pktserror)
            return "red";
          if (d.pkts > d.pktswarn)
            return "#FFD306";
          if (d.pkts > 0)
            return "#00DB00";
          if (d.pkts === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        case 3:
          if (d.broadcast > d.broadcasterror)
            return "red";
          if (d.broadcast > d.broadcastwarn)
            return "#FFD306";
          if (d.broadcast > 0)
            return "#00DB00";
          if (d.broadcast === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        case 4:
          if (d.bwusage > d.bwusagerror)
            return "red";
          if (d.bwusage > d.bwusagewarn)
            return "#FFD306";
          if (d.bwusage > 0)
            return "#00DB00";
          if (d.bwusage === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
        default:
          if (d.flow > d.error)
            return "red";
          if (d.flow > d.warn)
            return "#FFD306";
          if (d.flow > 0)
            return "#00DB00";
          if (d.flow === 0 && d.portstate === 0) {
            return "#272727";
          } else {
            return "#00DB00";
          }
      }
    }).style("stroke-width", function(d) {
      var tempflow = d.flow;
      var stringflow = "1px";
      if (tempflow > 1000) {
        tempflow = tempflow / 1000;
        stringflow = "2px";
        if (tempflow > 1000) {
          tempflow = tempflow / 1000;
          stringflow = "3px";
          if (tempflow > 1000) {
            tempflow = tempflow / 1000;
            stringflow = "4px";
          }
        }
      }
      return stringflow;
    });
    linktip.data(linetextdata).text(function(d) {
      ""
    });
    linktip.append("svg:title").text(function(d) {
      var tempflow = d.flow;
      var stringflow = " Kbps";
      if (tempflow > 1000) {
        tempflow = tempflow / 1000;
        stringflow = " Mbps";
        if (tempflow > 1000) {
          tempflow = tempflow / 1000;
          stringflow = " Gbps";
          if (tempflow > 1000) {
            tempflow = tempflow / 1000;
            stringflow = " Tbps";
          }
        }
      }
      var tempoutflow = d.outflow;
      var stringoutflow = " Kbps";
      if (tempoutflow > 1000) {
        tempoutflow = tempoutflow / 1000;
        stringoutflow = " Mbps";
        if (tempoutflow > 1000) {
          tempoutflow = tempoutflow / 1000;
          stringoutflow = " Gbps";
          if (tempoutflow > 1000) {
            tempoutflow = tempoutflow / 1000;
            stringoutflow = " Tbps";
          }
        }
      }
      var tempinflow = d.inflow;
      var stringinflow = " Kbps";
      if (tempinflow > 1000) {
        tempinflow = tempinflow / 1000;
        stringinflow = " Mbps";
        if (tempinflow > 1000) {
          tempinflow = tempinflow / 1000;
          stringinflow = " Gbps";
          if (tempinflow > 1000) {
            tempinflow = tempinflow / 1000;
            stringinflow = " Tbps";
          }
        }
      }
      var vv1;
      var vv2;
      if (d.sdesc == '' || d.sdesc == undefined) {
        vv1 = d.source.localip + ':' + d.sinterface;
      } else {
        vv1 = d.source.localip + ':' + d.sinterface + '[' + d.sdesc + ']';
      }
      if (d.tdesc == '' || d.tdesc == undefined) {
        vv2 = d.target.localip + ':' + d.tinterface;
      } else {
        vv2 = d.target.localip + ':' + d.tinterface + '[' + d.tdesc + ']';
      }
      var bwusagedw = "% (100Mbps)";
      if (d.speed > 100) {
        bwusagedw = "% (1000Mbps)";
      }
      if (d.speed > 1000) {
        bwusagedw = "% (10Gbps)";
      }
      var tempvv = linktips.replace('p1', vv1).replace('p2', vv2).replace('p3', Math.round(tempflow * 10) / 10 + stringflow).replace('p4', Math.round(d.pkts * 10) / 10 + " Pkts/s").replace('p5', Math.round(d.broadcast * 10) / 10 + " Pkts/s").replace('p6', Math.round(d.bwusage * 10) / 10 + bwusagedw).replace('p7', Math.round(d.avgframeLen * 10) / 10 + " Byte/Pkt").replace('p8', Math.round(tempoutflow * 10) / 10 + stringoutflow).replace('p9', Math.round(tempinflow * 10) / 10 + stringinflow);
      if (d.alias != "") {
        tempvv = d.alias + "\n" + tempvv;
      }
      return tempvv;
    });
    linktext.data(linetextdata).style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (linkshowtype == 1) {
        return "hidden";
      } else {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "hidden";
        }
      }
    }).text(function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return "";
      } else {
        switch (linkshowtype) {
          case 2:
            if (d.pkts == 0) {
              return "";
            } else {
              return Math.round(d.pkts * 10) / 10 + "Pkts/s";
            }
          case 3:
            if (d.broadcast == 0) {
              return "";
            } else {
              return Math.round(d.broadcast * 10) / 10 + "Pkts/s";
            }
          case 4:
            if (d.bwusage == 0) {
              return "";
            } else {
              var bwusagedw = "% (100Mbps)";
              if (d.speed > 100) {
                bwusagedw = "% (1000Mbps)";
              }
              if (d.speed > 1000) {
                bwusagedw = "% (10Gbps)";
              }
              return Math.round(d.bwusage * 10) / 10 + bwusagedw;
            }
          case 5:
            var tempflow = d.outflow;
            var stringflow = " Kbps";
            if (tempflow > 1000) {
              tempflow = tempflow / 1000;
              stringflow = " Mbps";
              if (tempflow > 1000) {
                tempflow = tempflow / 1000;
                stringflow = " Gbps";
                if (tempflow > 1000) {
                  tempflow = tempflow / 1000;
                  stringflow = " Tbps";
                }
              }
            }
            if (tempflow == 0) {
              return "";
            } else {
              return Math.round(tempflow * 10) / 10 + stringflow
            }
          case 6:
            var tempflow = d.inflow;
            var stringflow = " Kbps";
            if (tempflow > 1000) {
              tempflow = tempflow / 1000;
              stringflow = " Mbps";
              if (tempflow > 1000) {
                tempflow = tempflow / 1000;
                stringflow = " Gbps";
                if (tempflow > 1024) {
                  tempflow = tempflow / 1000;
                  stringflow = " Tbps";
                }
              }
            }
            if (tempflow == 0) {
              return "";
            } else {
              return Math.round(tempflow * 10) / 10 + stringflow
            }
          default:
            return "";
        }
      }
    });
    linkintext.data(linetextdata).style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (linkshowtype == 1) {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "hidden";
        }
      } else {
        return "hidden";
      }
    }).text(function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return "";
      } else {
        var tempflow = d.inflow;
        var stringflow = " Kbps";
        if (tempflow > 1000) {
          tempflow = tempflow / 1000;
          stringflow = " Mbps";
          if (tempflow > 1000) {
            tempflow = tempflow / 1000;
            stringflow = " Gbps";
            if (tempflow > 1000) {
              tempflow = tempflow / 1000;
              stringflow = " Tbps";
            }
          }
        }
        if (tempflow == 0) {
          return "";
        } else {
          return Math.round(tempflow * 10) / 10 + stringflow
        }
      }
    });
    linkouttext.data(linetextdata).style("fill", function(d) {
      return "#000000";
    }).style("visibility", function(d) {
      if (linkshowtype == 1) {
        if (hidelines.indexOf(d.lid) >= 0) {
          return "hidden";
        }
      } else {
        return "hidden";
      }
    }).text(function(d) {
      if (hidelines.indexOf(d.lid) >= 0) {
        return "";
      } else {
        var tempflow = d.outflow;
        var stringflow = " Kbps";
        if (tempflow > 1000) {
          tempflow = tempflow / 1000;
          stringflow = " Mbps";
          if (tempflow > 1000) {
            tempflow = tempflow / 1000;
            stringflow = " Gbps";
            if (tempflow > 1000) {
              tempflow = tempflow / 1000;
              stringflow = " Tbps";
            }
          }
        }
        if (tempflow == 0) {
          return "";
        } else {
          return Math.round(tempflow * 10) / 10 + stringflow
        }
      }
    });
   var b = this.getShowpc();
   if (b != 1) {
     d3.selectAll("[class1=pc]").style("visibility", "hidden")
   }
    this.DealLinks();
  },
  _initMainMenu: function() {
    var that = this;
    var ulul = d3.select("#Mainmenu").append("ul");
    var menudes = this.getMenudesc();
    var arraymenu = menudes.split(":");
    for (var i = 0; i < arraymenu.length; i++) {
      var subarraymenu = arraymenu[i].split("$");
      if (subarraymenu.length > 1) {
        var subli = ulul.append("li");
        subli.append("a").style("cursor", "pointer").text(subarraymenu[0]);
        var subul = subli.append("ul").attr("id", "main" + i + "");
        for (var j = 1; j < subarraymenu.length; j++) {
          subul.append("li").append("a").style("cursor", "pointer").text(subarraymenu[j]);
        }
      } else {
        var lia = ulul.append("li").append("a").attr("id", "main" + i + "").style("cursor", "pointer").text(arraymenu[i]);
      }
    }
    var showpc = that.getShowpc();
    var arrypcmenu = that.getPcmenu().split("$");
    if (showpc == 1) {
      ulul.append("li").append("a").attr("id", "showpcpc").style("cursor", "pointer").text(arrypcmenu[1]);
    } else {
      ulul.append("li").append("a").attr("id", "showpcpc").style("cursor", "pointer").text(arrypcmenu[0]);
    }
    ulul.select("#showpcpc").on("click", function(d, i) {
      if (that.getShowpc() == 1) {
        d3.selectAll("[class1=pc]").style("visibility", "hidden");
        ulul.select("#showpcpc").text(arrypcmenu[0]);
        that.setShowpc(0);
        that._savedata("showpc", 0);
      } else {
        d3.selectAll("[class1=pc]").style("visibility", "visible");
        that.setShowpc(1);
        ulul.select("#showpcpc").text(arrypcmenu[1]);
        that._savedata("showpc", 1);
      }
    });
    ulul.select("#main0").selectAll("a").on("click", function(d, index) {
      that.refreshNodeText(index);
    });
    ulul.select("#main1").selectAll("a").on("click", function(d, i) {
      that.refreshLinkText(i);
    });
    ulul.select("#main2").selectAll("a").on("click", function(d, i) {
      that.scalesize(i);
    });
    ulul.select("#main3").selectAll("a").on("click", function(d, i) {
      that.topolayout(i);
    });
    ulul.select("#main4").on("click", function(d, i) {
      that.savetopo();
    });
    ulul.select("#main5").on("click", function(d, i) {
      var ids = new Array();
      ids.push(mousexx);
      ids.push(mouseyy);
      that._savedata("adddevice", ids);
    });
    ulul.select("#main6").on("click", function(d, i) {
      that._savedata("locatenode", "");
    });
    ulul.select("#main7").on("click", function(d, i) {
      that._savedata("toposet", "");
    });
    ulul.select("#main8").on("click", function(d, i) {
      var oviewp = d3.select("#overviewparent").style('display');
      if (oviewp == 'none') {
        d3.select("#overviewparent").style('display', 'inline-block');
      } else {
        d3.select("#overviewparent").style('display', 'none');
      }
    });
  },
  _initMenu: function() {
    var that = this;
    var ulul = d3.select("#mymenu").append("ul");
    var menudes = this.getNodemenudesc();
    var arraymenu = menudes.split(":");
    nodemenucount = arraymenu.length;
    for (var i = 0; i < arraymenu.length; i++) {
      var subarraymenu = arraymenu[i].split("$");
      if (subarraymenu.length > 1) {
        var subli = ulul.append("li");
        subli.append("a").style("cursor", "pointer").text(subarraymenu[0]);
        var subul = subli.append("ul").attr("id", "node" + i + "");
        for (var j = 1; j < subarraymenu.length; j++) {
          subul.append("li").append("a").style("cursor", "pointer").text(subarraymenu[j]);
        }
      } else {
        var lia = ulul.append("li").append("a").attr("id", "node" + i + "").style("cursor", "pointer").text(arraymenu[i]);
      }
    }
    ulul.select("#node0").on("click", function(d, i) {
      that._savedata("devicepropery", selectnode);
    });
    ulul.select("#node1").on("click", function(d, i) {
      that._savedata("deviceconnect", selectnode);
    });
    ulul.select("#node2").on("click", function(d, i) {
      that._savedata("devicepanel", selectnode);
    });
    ulul.select("#node3").on("click", function(d, i) {
      that._savedata("deviceport", selectnode);
    });
    ulul.select("#node4").on("click", function(d, i) {
      that._savedata("devicecpumem", selectnode);
    });
    ulul.select("#node5").selectAll("a").on("click", function(d, i) {
      if (i == 0) {
        that._savedata("deviceiftable", selectnode);
      } else if (i == 1) {
        that._savedata("deviceroutetable", selectnode);
      } else if (i == 2) {
        that._savedata("devicemactable", selectnode);
      } else if (i == 3) {
        that._savedata("devicearptable", selectnode);
      } else if (i == 4) {
        that._savedata("devicecdptable", selectnode);
      } else if (i == 5) {
        that._savedata("deviceiptable", selectnode);
      }
    });
    ulul.select("#node6").selectAll("a").on("click", function(d, i) {
      if (i == 0) {
        that._savedata("devicealertfast", selectnode);
      } else if (i == 1) {
        that._savedata("devicealertcategory", selectnode);
      }
    });
    ulul.select("#node7").on("click", function(d, i) {
      var ipip = nodelinedata[selectnode].localip;
      var nntype = nodelinedata[selectnode].otype;
      if (nntype == 0 || nntype == 1 || nntype == 2 || nntype == 3) {
        window.open('http://' + ipip);
        that._savedata("deviceweb", selectnode);
      }
    });
    ulul.select("#node8").selectAll("a").on("click", function(d, i) {
      if (i == 0) {
        that._savedata("devicetelnet", selectnode);
      } else if (i == 1) {
        that._savedata("deviceping", selectnode);
      } else if (i == 2) {
        that._savedata("devicetracetoute", selectnode);
      } else if (i == 3) {
        that._savedata("devicesnmptest", selectnode);
      }
    });
    ulul.select("#node9").on("click", function(d, i) {
      that._savedata("devicerefresh", selectnode);
    });
    ulul.select("#node10").on("click", function(d, i) {
      var ids = new Array();
      ids.push(selectnode);
      that._savedata("delgroup", ids);
    });
  },
  _initSubMenu: function() {
    var that = this;
    var ulul = d3.select("#submenu").append("ul");
    var menudes = this.getSubmenudesc();
    var arraymenu = menudes.split(":");
    var issubtopo = that.getIsubtopo();
    for (var i = 0; i < arraymenu.length; i++) {
      if(issubtopo==1 && i==0){
        continue;
      }
      var lia = ulul.append("li").append("a").style("cursor", "pointer").text(arraymenu[i]);
    }
    ulul.selectAll("a").on("click", function(d, i) {
      var ids = new Array();
      selectnodes = new Array();
      for (j = 0; j < nodedata.length; j++) {
        var ndata = nodedata[j];
        if (ndata.selected) {
          ids.push(ndata.sid);
          selectnodes.push(ndata.sid);
        }
      }
      if(issubtopo==1){
        if (i == 0) {
          that._savedata("delgroup", ids);
        }
      }else {
        if (i == 0) {
          ids.push(mousexx);
          ids.push(mouseyy);
          that._savedata("createsubtopo", ids);
        }
        if (i == 1) {
          that._savedata("delgroup", ids);
        }
      }


    });
  },
  _initGroupMenu: function() {
    var that = this;
    var ulul = d3.select("#groupmenu").append("ul");
    var menudes = this.getGroupmenudesc();
    var arraymenu = menudes.split(":");
    for (var i = 0; i < arraymenu.length; i++) {
      var lia = ulul.append("li").append("a").style("cursor", "pointer").text(arraymenu[i]);
    }
    ulul.selectAll("a").on("click", function(d, i) {
      if (i == 0) {
        that._savedata("looksubchart", selectgroup);
      }
      if (i == 1) {
        that._savedata("cancelsubchart", selectgroup);
      }
    });
  },
  _initLinkMenu: function() {
    var that = this;
    var ulul = d3.select("#linkmenu").append("ul");
    var menudes = this.getLinkmenudesc();
    var arraymenu = menudes.split(":");
    for (var i = 0; i < arraymenu.length; i++) {
      var lia = ulul.append("li").append("a").style("cursor", "pointer").text(arraymenu[i]);
    }
    var arrypcmenu = that.getLineshowhide().split("$");
    ulul.append("li").append("a").attr("id", "linehideshow").style("cursor", "pointer").text(arrypcmenu[1]);
    ulul.selectAll("a").on("click", function(d, i) {
      if (i == 0) {
        that._savedata("linepropery", selectlink);
      }
      if (i == 1) {
        that._savedata("lineflow", selectlink);
      }
      if (i == 2) {
        that._savedata("delline", selectlink);
      }
      if (i == 3) {
        that._savedata("linkset", selectlink);
      }
      if (i == 4) {
        var shosho = d3.select("#linehideshow").text();
        var linkshowtype = that.getLinkDisplayType();
        if (linkshowtype == 1) {
          if (shosho == arrypcmenu[1]) {
            d3.select("#text2linkin" + selectlink).style("visibility", "hidden");
            d3.select("#text2linkout" + selectlink).style("visibility", "hidden");
            d3.select("#link" + selectlink).style('marker-mid', '').style('marker-end', '').style('marker-start', '');
            d3.select("#link1" + selectlink).style('marker-mid', '').style('marker-end', '').style('marker-start', '');
            that._hidelines.push(selectlink);
          } else {
            for (i = 0; i < that._hidelines.length; i++) {
              if (that._hidelines[i] === selectlink) {
                that._hidelines.splice(i, 1);
                break;
              }
            }
          }
        } else {
          if (shosho == arrypcmenu[1]) {
            d3.select("#text2link" + selectlink).style("visibility", "hidden");
            d3.select("#text2linkin" + selectlink).style("visibility", "visible");
            d3.select("#text2linkout" + selectlink).style("visibility", "visible");
            d3.select("#link" + selectlink).style('marker-mid', '').style('marker-end', '').style('marker-start', '');
            d3.select("#link1" + selectlink).style('marker-mid', '').style('marker-end', '').style('marker-start', '');
            that._hidelines.push(selectlink);
          } else {
            d3.select("#text2link" + selectlink).style("visibility", "visible");
            for (i = 0; i < that._hidelines.length; i++) {
              if (that._hidelines[i] === selectlink) {
                that._hidelines.splice(i, 1);
                break;
              }
            }
          }
        }
        that._savedata("linkhideshow", selectlink);
      }
    });
  },
  savetopo: function() {
    var showpc = this.getShowpc();
    if (showpc == 1) {
      this._savedata("savetopo", nodedata);
    } else {
      var newnodedata = nodedata.filter(function(value) {
        return (value.otype != 5);
      });
      this._savedata("savetopo", newnodedata);
    }
  },
  topolayout: function(_tag) {
    var that = this;
    switch (_tag) {
      case 0:
        that._selectItem("circular");
        break;
      case 1:
        that._selectItem("normal");
        break;
      case 2:
        that._selectItem("orthogonal");
        break;
      default:
        that._selectItem("circular");
    }
  },
  scalesize: function(_tag) {
    switch (_tag) {
      case 1:
        currentscale = currentscale - 0.1;
        if (currentscale < 0.1)
          currentscale = 0.1;
        d3.select(".layer").attr("transform", "scale(" + currentscale + ")");
        if (currentscale >= 0.1) {
          dragrect.data([{
            x: 0.0,
            y: 0.0,
            w: 74.0 * currentscale,
            h: 72.0 * currentscale
          }]);
          dragrect.attr("width", function(d) {
            return d.w;
          }).attr("height", function(d) {
            return d.h;
          })
        }
        break;
      case 2:
        d3.select(".layer").attr("transform", "scale(1)");
        dragrect.data([{
          x: 0.0,
          y: 0.0,
          w: 74.0,
          h: 72.0
        }]);
        dragrect.attr("width", function(d) {
          return d.w;
        }).attr("height", function(d) {
          return d.h;
        })
        break;
      case 3:
        var nodemaxx = 0;
        var nodemaxy = 0;
        for (j = 0; j < nodedata.length; j++) {
          var ndata = nodedata[j];
          if (ndata.nx > nodemaxx) {
            nodemaxx = ndata.nx;
          }
          if (ndata.ny > nodemaxy) {
            nodemaxy = ndata.ny;
          }
        }
        var cw = that1.getCompWidth();
        var ch = that1.getCompHeight();
        var maxscale = Math.max(cw / nodemaxx, ch / nodemaxy);
        var minscale = Math.min(cw / nodemaxx, ch / nodemaxy);
        if (maxscale > 1) {
          currentscale = minscale;
        } else {
          currentscale = maxscale;
        }
        d3.select(".layer").attr("transform", "scale(" + currentscale + ")");
        if (currentscale >= 1) {
          dragrect.data([{
            x: 0.0,
            y: 0.0,
            w: 74.0 * currentscale,
            h: 72.0 * currentscale
          }]);
          dragrect.attr("width", function(d) {
            return d.w;
          }).attr("height", function(d) {
            return d.h;
          })
        }
        break;
      default:
        currentscale = currentscale + 0.1;
        if (currentscale > 8)
          currentscale = 8;
        d3.select(".layer").attr("transform", "scale(" + currentscale + ")");
        if (currentscale >= 1) {
          dragrect.data([{
            x: 0.0,
            y: 0.0,
            w: 74.0 * currentscale,
            h: 72.0 * currentscale
          }]);
          dragrect.attr("width", function(d) {
            return d.w;
          }).attr("height", function(d) {
            return d.h;
          })
        }
    }
  },
  refreshNodeText: function(_tag) {
    var that = this;
    switch (_tag) {
      case 1:
        that._savedata('name', '');
        nodetext.text(function(d) {
          return d.name
        });
        break;
      case 2:
        that._savedata('model', '');
        nodetext.text(function(d) {
          return d.model
        });
        break;
      case 3:
        that._savedata('customname', '');
        nodetext.text(function(d) {
          return d.customname
        });
        break;
      default:
        that._savedata('ip', '');
        nodetext.text(function(d) {
          return d.localip
        });
    }
  },
  refreshLinkText: function(_tag) {
    var that = this;
    var hidelines = this.getHidelines();
    if (_tag == 0) {
      d3.select(".text2link").selectAll("text").style("visibility", "hidden");
      d3.select(".text2linkin").selectAll("text").style("visibility", "visible");
      d3.select(".text2linkout").selectAll("text").style("visibility", "visible");
    } else {
      d3.select(".text2link").selectAll("text").style("visibility", "visible");
      d3.select(".text2linkin").selectAll("text").style("visibility", "hidden");
      d3.select(".text2linkout").selectAll("text").style("visibility", "hidden");
    }
    switch (_tag) {
      case 1:
        this.setLinkDisplayType(5);
        that._savedata('outflow', '');
        link.data(linetextdata).attr("d", function(d) {
          var endx = (d.source.nx + d.target.nx) / 2;
          var endy = (d.source.ny + d.target.ny) / 2;
          var midx = (d.source.nx + endx) / 2;
          var midy = (d.source.ny + endy) / 2;
          return 'M' + d.source.nx + ',' + d.source.ny + ' ' + midx + ',' + midy + ' ' + endx + ',' + endy;
        }).style('marker-mid', '').style('marker-end', function(d) {
          if (hidelines.indexOf(d.lid) >= 0) {
            return "";
          } else {
            return 'url(#end-arrow)';
          }
        }).style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).attr("d", function(d) {
          var startx = (d.source.nx + d.target.nx) / 2;
          var starty = (d.source.ny + d.target.ny) / 2;
          var midx = (startx + d.target.nx) / 2;
          var midy = (starty + d.target.ny) / 2;
          return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
        }).style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          var tempflow = d.outflow;
          var stringflow = " Kbps";
          if (tempflow > 1024) {
            tempflow = tempflow / 1024;
            stringflow = " Mbps";
            if (tempflow > 1024) {
              tempflow = tempflow / 1024;
              stringflow = " Gbps";
              if (tempflow > 1024) {
                tempflow = tempflow / 1024;
                stringflow = " Tbps";
              }
            }
          }
          if (tempflow == 0) {
            return ""
          } else {
            return Math.round(tempflow * 10) / 10 + stringflow
          }
        });
        break;
      case 2:
        this.setLinkDisplayType(6);
        that._savedata('inflow', '');
        link.data(linetextdata).attr("d", function(d) {
          var endx = (d.source.nx + d.target.nx) / 2;
          var endy = (d.source.ny + d.target.ny) / 2;
          var midx = (d.source.nx + endx) / 2;
          var midy = (d.source.ny + endy) / 2;
          return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
        }).style('marker-mid', '').style('marker-start', function(d) {
          if (hidelines.indexOf(d.lid) >= 0) {
            return "";
          } else {
            return 'url(#end-arrow)';
          }
        }).style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).attr("d", function(d) {
          var startx = (d.source.nx + d.target.nx) / 2;
          var starty = (d.source.ny + d.target.ny) / 2;
          var midx = (startx + d.target.nx) / 2;
          var midy = (starty + d.target.ny) / 2;
          return 'M' + d.target.nx + ',' + d.target.ny + ' ' + midx + ',' + midy + ' ' + startx + ',' + starty;
        }).style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          var tempflow = d.inflow;
          var stringflow = " Kbps";
          if (tempflow > 1024) {
            tempflow = tempflow / 1024;
            stringflow = " Mbps";
            if (tempflow > 1024) {
              tempflow = tempflow / 1024;
              stringflow = " Gbps";
              if (tempflow > 1024) {
                tempflow = tempflow / 1024;
                stringflow = " Tbps";
              }
            }
          }
          if (tempflow == 0) {
            return ""
          } else {
            return Math.round(tempflow * 10) / 10 + stringflow
          }
        });
        break;
      case 3:
        that._savedata('pkts', '');
        this.setLinkDisplayType(2);
        link.data(linetextdata).style('marker-end', '').style('marker-start', '').style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).style('marker-end', '').style('marker-start', '').style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          if (d.pkts == 0) {
            return ""
          } else {
            return Math.round(d.pkts * 10) / 10 + "Pkts/s"
          }
        });
        break;
      case 4:
        this.setLinkDisplayType(3);
        that._savedata('broadcast', '');
        link.data(linetextdata).style('marker-end', '').style('marker-start', '').style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).style('marker-end', '').style('marker-start', '').style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          if (d.broadcast == 0) {
            return ""
          } else {
            return Math.round(d.broadcast * 10) / 10 + " Pkts/s"
          }
        });
        break;
      case 5:
        this.setLinkDisplayType(4);
        that._savedata('bwusage', '');
        link.data(linetextdata).style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).style('marker-end', '').style('marker-start', '').style('marker-mid', '').style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          if (d.bwusage == 0) {
            return ""
          } else {
            return Math.round(d.bwusage * 10) / 10 + "%  (100Mbps)"
          }
        });
        break;
      default:
        this.setLinkDisplayType(1);
        that._savedata('flow', '');
        link.data(linetextdata).attr("d", function(d) {
          var endx = (d.source.nx + d.target.nx) / 2;
          var endy = (d.source.ny + d.target.ny) / 2;
          var midx = (d.source.nx + endx) / 2;
          var midy = (d.source.ny + endy) / 2;
          return 'M' + endx + ',' + endy + ' ' + midx + ',' + midy + ' ' + d.source.nx + ',' + d.source.ny;
        }).style('marker-end', '').style('marker-start', '').style('marker-mid', function(d) {
          if (hidelines.indexOf(d.lid) >= 0) {
            return "";
          } else {
            return 'url(#end-arrow)';
          }
        }).style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        link1.data(linetextdata).attr("d", function(d) {
          var startx = (d.source.nx + d.target.nx) / 2;
          var starty = (d.source.ny + d.target.ny) / 2;
          var midx = (startx + d.target.nx) / 2;
          var midy = (starty + d.target.ny) / 2;
          return 'M' + startx + ',' + starty + ' ' + midx + ',' + midy + ' ' + d.target.nx + ',' + d.target.ny;
        }).style('marker-end', '').style('marker-start', '').style('marker-mid', function(d) {
          if (hidelines.indexOf(d.lid) >= 0) {
            return "";
          } else {
            return 'url(#end-arrow)';
          }
        }).style("Stroke", function(d) {
          var lincc = that.getlinkcolor(d);
          return lincc;
        });
        linktext.data(linetextdata).style("fill", function(d) {}).text(function(d) {
          var tempflow = d.flow;
          var stringflow = " Kbps";
          if (tempflow > 1024) {
            tempflow = tempflow / 1024;
            stringflow = " Mbps";
            if (tempflow > 1024) {
              tempflow = tempflow / 1024;
              stringflow = " Gbps";
              if (tempflow > 1024) {
                tempflow = tempflow / 1024;
                stringflow = " Tbps";
              }
            }
          }
          var tempoutflow = d.outflow;
          var stringoutflow = " Kbps";
          if (tempoutflow > 1024) {
            tempoutflow = tempoutflow / 1024;
            stringoutflow = " Mbps";
            if (tempoutflow > 1024) {
              tempoutflow = tempoutflow / 1024;
              stringoutflow = " Gbps";
              if (tempoutflow > 1024) {
                tempoutflow = tempoutflow / 1024;
                stringoutflow = " Tbps";
              }
            }
          }
          var tempinflow = d.inflow;
          var stringinflow = " Kbps";
          if (tempinflow > 1024) {
            tempinflow = tempinflow / 1024;
            stringinflow = " Mbps";
            if (tempinflow > 1024) {
              tempinflow = tempinflow / 1024;
              stringinflow = " Gbps";
              if (tempinflow > 1024) {
                tempinflow = tempinflow / 1024;
                stringinflow = " Tbps";
              }
            }
          }
          if (tempflow == 0) {
            return ""
          } else {
            return " in:" + Math.round(tempinflow * 10) / 10 + stringinflow + " out:" + Math.round(tempoutflow * 10) / 10 + stringoutflow
          }
        });
    }
  },
  contextmainmenu: function() {
    var others = d3.select('#mymenu').style('display');
    var others1 = d3.select('#linkmenu').style('display');
    var others2 = d3.select('#submenu').style('display');
    var others3 = d3.select('#groupmenu').style('display');
    var topy = that1.getTopy();
    var leftx = that1.getLeftx();
    if (others === 'none' && others1 === 'none' && others2 === 'none' && others3 === 'none') {
      var scrollLeft1 = maindiv.scrollLeft;
      var scrollTop1 = maindiv.scrollTop;
      var position = d3.mouse(this);
      var xx = position[0];
      var yy = position[1];
      mousexx = xx + scrollLeft1;
      mouseyy = yy + scrollTop1;
      d3.select('#Mainmenu').style('position', 'absolute').style('left', xx + "px").style('top', yy + "px").style('display', 'inline-block').on('mouseleave', function() {
        d3.select('#Mainmenu').style('display', 'none');
      });
      d3.event.preventDefault();
    }
  },
  contextlinkmenu: function(data, i) {
    selectlink = data.lid;
    var showlink = d3.select("#link" + selectlink);
    if (showlink != null && showlink != undefined && showlink != '') {
      var showmenu = showlink.style("visibility");
      if (showmenu == 'hidden')
        return;
    }
    var arrypcmenu = that1.getLineshowhide().split("$");
    var linkshowtype = that1.getLinkDisplayType();
    if (linkshowtype == 1) {
      var show1 = d3.select("#text2linkin" + selectlink).style("visibility");
      if (show1 == "visible") {
        d3.select("#linehideshow").text(arrypcmenu[1])
      } else {
        d3.select("#linehideshow").text(arrypcmenu[0])
      }
    } else {
      var show1 = d3.select("#text2link" + selectlink).style("visibility");
      if (show1 == "visible") {
        d3.select("#linehideshow").text(arrypcmenu[1])
      } else {
        d3.select("#linehideshow").text(arrypcmenu[0])
      }
    }
    var scrollLeft1 = maindiv.scrollLeft;
    var scrollTop1 = maindiv.scrollTop;
    var position = d3.mouse(this);
    var xx = position[0];
    var yy = position[1];
    mousexx = xx - scrollLeft1;
    mouseyy = yy - scrollTop1;
    d3.select('#linkmenu').style('position', 'absolute').style('left', mousexx + "px").style('top', mouseyy + "px").style('display', 'inline-block').on('mouseleave', function() {
      d3.select('#linkmenu').style('display', 'none');
    });
    d3.event.preventDefault();
  },
  getAngle: function(px1, py1, px2, py2) {
    x = px2 - px1;
    y = py2 - py1;
    hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    cos = x / hypotenuse;
    radian = Math.acos(cos);
    angle = 180 * radian / Math.PI;
    if (y < 0) {
      angle = -angle;
    } else if ((y == 0) && (x < 0)) {
      angle = 180;
    }
    if (angle >= 90)
      angle = angle + 180;
    if (angle <= -90)
      angle = angle - 180;
    return angle;
  },
  inioverviewnode: function() {
    var ovlayer = d3.select("#overview");
    var nodelist = ovlayer.append("g").attr("class", "ovnodelist");
    ovnode = nodelist.selectAll(".ovnode");
    ovnode = ovnode.data(nodedata);
    var showpc = this.getShowpc();
    ovnode.enter().append("g").attr("class1", function(d) {
      if (d.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).style("visibility", function(d) {
      if (d.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).attr("class", "ovnode").attr("transform", function(d) {
      return "translate(" + d.nx + ", " + d.ny + ")"
    });
    ovnode.append("svg:image").attr("x", -16).attr("y", -16).attr("width", 32).attr("height", 32).attr("xlink:href", function(d) {
      switch (d.otype) {
        case 0:
          return "rwt-resources/topomap/SwitchRouter_Blue.ico";
        case 1:
          return "rwt-resources/topomap/Switch_Blue.ico";
        case 2:
          return "rwt-resources/topomap/Router_Blue.ico";
        case 3:
          return "rwt-resources/topomap/Firewall_Blue.ico";
        case 4:
          return "rwt-resources/topomap/Server_Blue.ico";
        case 5:
          return "rwt-resources/topomap/PC_Blue.ico";
        case 7:
          return "rwt-resources/topomap/HUB_Blue.ico";
        case 8:
          return "rwt-resources/topomap/noSnmp.png";
        case 9:
          return "rwt-resources/topomap/database.png";
        case 23:
          return  "rwt-resources/topomap/APwifi.bmp";
        case 100:
          return "rwt-resources/topomap/Grouping_Blue.ico";
        default:
          return "rwt-resources/topomap/Other_Blue.ico";
      }
    });
    scaleFactor = 1;
    defaultscaleFactor = 0.1;
    currentscale = 1;
    w = this.getMaxX();
    h = this.getMaxY();
    scaleFactor = Math.min(overvieww / w, overviewh / h)
    ovlayer.attr("transform", "scale(" + scaleFactor + ")");
  },
  updateoverviewnode: function() {
    ovnode = ovnode.data(nodedata);
    ovnode.attr("transform", function(d) {
      return "translate(" + d.nx + ", " + d.ny + ")"
    });
    var ovadd = ovnode.enter().append("g").attr("class", "ovnode").attr("transform", function(d) {
      return "translate(" + d.nx + ", " + d.ny + ")"
    });
    ovadd.append("svg:image").attr("x", -16).attr("y", -16).attr("width", 32).attr("height", 32).attr("xlink:href", function(d) {
      switch (d.otype) {
        case 0:
          return "rwt-resources/topomap/SwitchRouter_Blue.ico";
        case 1:
          return "rwt-resources/topomap/Switch_Blue.ico";
        case 2:
          return "rwt-resources/topomap/Router_Blue.ico";
        case 3:
          return "rwt-resources/topomap/Firewall_Blue.ico";
        case 4:
          return "rwt-resources/topomap/Server_Blue.ico";
        case 5:
          return "rwt-resources/topomap/PC_Blue.ico";
        case 7:
          return "rwt-resources/topomap/HUB_Blue.ico";
        case 8:
          return "rwt-resources/topomap/noSnmp.png";
        case 9:
          return "rwt-resources/topomap/database.png";
        case 23:
         return  "rwt-resources/topomap/APwifi.bmp";
        case 100:
          return "rwt-resources/topomap/Grouping_Blue.ico";
        default:
          return "rwt-resources/topomap/Other_Blue.ico";
      }
    });
    ovnode.exit().remove();
  },
  inioverviewlink: function() {
    var that = this;
    var showpc = that.getShowpc();
    var ovlayer = d3.select("#overview");
    ovlink = ovlayer.append("g").attr("class", "ovlink").selectAll("line");
    ovlink = ovlink.data(linetextdata);
    ovlink.enter().append("line").attr("class1", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        return "pc";
      } else {
        return "nopc";
      }
    }).attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    }).style("visibility", function(d) {
      if (d.source.otype == 5 || d.target.otype == 5) {
        if (showpc == 1) {
          return "visible";
        } else {
          return "hidden";
        }
      } else {
        return "visible";
      }
    }).style("stroke-width", "2").style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
  },
  updateoverviewlink: function() {
    var that = this;
    var linw = Math.ceil(defaultscaleFactor / scaleFactor) * 2;
    ovlink = ovlink.data(linetextdata);
    ovlink.attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    }).style("stroke-width", linw + "").style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    ovlink.enter().append("line").attr("x1", function(d) {
      return d.source.nx;
    }).attr("y1", function(d) {
      return d.source.ny;
    }).attr("x2", function(d) {
      return d.target.nx;
    }).attr("y2", function(d) {
      return d.target.ny;
    }).style("stroke-width", "2").style("Stroke", function(d) {
      var lincc = that.getlinkcolor(d);
      return lincc;
    });
    ovlink.exit().remove();
  },
  initrect: function() {
    this.setOverView();
    var maxx = this.getMaxX();
    var maxy = this.getMaxY();
    var cwidth = this.getCompWidth();
    var cheight = this.getCompHeight();
    var drag = d3.behavior.drag().origin(Object).on("drag", dragmove);
    var ovlayer = d3.select("#overviewsvg");
    ovbrush = ovlayer.append("g").attr("class", "brush").data([{
      x: 0.0,
      y: 0.0,
      w: 74.0,
      h: 72.0
    }]);
    dragrect = ovbrush.append("rect").attr("class", "extent").attr("x", function(d) {
      return d.x;
    }).attr("y", function(d) {
      return d.y;
    }).attr("width", function(d) {
      return d.w;
    }).attr("height", function(d) {
      return d.h;
    }).attr("cursor", "move").attr("stroke", "#fff").call(drag);

    function dragmove(d) {
      dragrect.attr("x", d.x = Math.max(0, Math.min(overvieww - d.w, d3.event.x))).attr("y", d.y = Math.max(0, Math.min(overviewh - d.h, d3.event.y)));
      movemain(d);
    }

    function movemain(d) {
      var dwidth = overvieww - d.w;
      var dheight = overviewh - d.h;
      maindiv.scrollLeft = (maindiv.scrollWidth - cwidth) / dwidth * d.x;
      maindiv.scrollTop = (maindiv.scrollHeight - cheight) / dheight * d.y;
    }
  },
  setOverView: function() {
    var cwidth = this.getCompWidth();
    var cheight = this.getCompHeight();
    maindiv.style.width = cwidth + "px";
    maindiv.style.height = cheight + "px";
    var ovpdivleft = cwidth - overvieww - 20;
    var ovpdivtop = cheight - overviewh - 20;
    overviewparentdiv = document.getElementById("overviewparent");
    overviewparentdiv.style.width = overvieww + "px";
    overviewparentdiv.style.height = overviewh + "px";
    overviewparentdiv.style.left = ovpdivleft + "px";
    overviewparentdiv.style.top = ovpdivtop + "px";
    var drag = d3.behavior.drag().on("drag", dragmove1);
    d3.select("#overviewparent").style("cursor", "move").call(drag);

    function dragmove1(d) {
      var windex = maindiv.style.width.indexOf("px");
      var hindex = maindiv.style.height.indexOf("px");
      var sx = maindiv.style.width.substring(0, windex);
      var sy = maindiv.style.height.substring(0, hindex);
      var leftx = parseInt(sx) - overvieww - 20;
      var topy = parseInt(sy) - overviewh - 20;
      var leftv = Math.max(20, Math.min(d3.event.x - 100, leftx));
      var topv = Math.max(20, Math.min(d3.event.y - 100, topy));
      overviewparentdiv.style.left = leftv + "px";
      overviewparentdiv.style.top = topv + "px";
    }
  },
  _removeElements: function(selection) {
    selection.transition().duration(400).attr("opacity", 0.0).remove();
  },
  _savedata: function(index, data) {
    d3.select('#linkmenu').style('display', 'none');
    d3.select('#Mainmenu').style('display', 'none');
    d3.select('#mymenu').style('display', 'none');
    var remoteObject = rap.getRemoteObject(this);
    remoteObject.notify("Selection", {
      "index": index,
      "data": data
    });
  },
  _selectItem: function(index) {
    d3.select('#linkmenu').style('display', 'none');
    d3.select('#Mainmenu').style('display', 'none');
    d3.select('#mymenu').style('display', 'none');
    var remoteObject = rap.getRemoteObject(this);
    remoteObject.notify("Selection", {
      "index": index,
      "data": ""
    });
  }
};
rap.registerTypeHandler("topomap.TopoMap", {
  factory: function(properties) {
    var parent = rap.getObject(properties.parent);
    return new topomap.TopoMap(parent);
  },
  destructor: "destroy",
  properties: ["nodetooltipdesc", "grouptooltipdesc", "linktooltipdesc", "alertdata", "refreshdata", "layoutdata", "linkmenudesc", "menudesc", "groupmenudesc", "nodemenudesc", "tooltipdata", "maxX", "maxY", "compWidth", "compHeight", "overviewWidth", "submenudesc", "overviewHeight", "nodeDisplayType", "linkDisplayType", "topy", "leftx", "cleardata", "render", "newlinedata", "newgroup", "newdevice", "subchartdata", "plinedata", "pnodedata", "showpc", "pcmenu", "locatenode", "toposet", "linkset", "delnode", "deline", "lineshowhide", "hidelines","isubtopo"],
  events: ["Selection"]
});
