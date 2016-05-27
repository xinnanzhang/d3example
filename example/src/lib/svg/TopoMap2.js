/*****************************
 *date: 2014/5/22
 *auther: bin.liu
 *topo map
 * stroke-linecap:round;stroke-linejoin:round;
 *******************************/

topomap.TopoMap = function (parent) {
	this._items = new topomap.NodeList();
	this._lines = new topomap.NodeList();
	this._svgMap = new topomap.BaseMap(parent, this);
	this._maxX = 2700; //node 最大x坐标
	this._maxY = 2200; //node 最大y坐标
	this._compWidth = 1000; //组件宽
	this._compHeight = 800; //组件高
	this._overviewWidth = 200; //导航窗的宽
	this._overviewHeight = 200; //导航窗的高
	this._topy = 90; //组件距离top的距离
	this._leftx = 230; //组件距离left的距离
	this._nodeDisplayType = 1; // 1 ip 2 name 3 model 4 customername
	this._linkDisplayType = 1; // 1 flow 2 pkts 3 broadcast 4 bwusage
	this._layer = null;
	this.svg = null;
	this._nodetooltipdesc = ""; //node 的提示信息中文
	this._grouptooltipdesc = ""; //group 的提示信息
	this._linktooltipdesc = ""; //link 的提示信息中文
	this._menudesc = ""; //main菜单加入是为了中文问题
	this._submenudesc = ""; //拓扑子图菜单
	this._groupmenudesc = ""; //子图
	this._linkmenudesc = ""; //link菜单中文
	this._nodemenudesc = ""; //node 中文菜单
	this._tooltipdata = [];
	this._refreshdata = []; //总流量/帧流量/广播包/带宽占用比/平均帧长度 等
	this._layoutdata = []; //node layout nx ny
	this._newlinedata = null; //新线
	this._newgroup = null; //新组
	this._newdevice = null; //新设备
	this._subchartdata = []; //撤销子图的数据

};

topomap.TopoMap.prototype = {

	addItem : function (item) {
		this._items.add(item);
	},

	removeItem : function (item) {
		this._items.remove(item);
	},
	//清除数据
	setCleardata : function (cleardata) {
		this._items = new topomap.NodeList();
		this._lines = new topomap.NodeList();
	},
	//重新填充数据
	setRender : function (render) {
		this.render(this._BaseMap);
	},
	addLine : function (lline) {
		this._lines.add(lline);
	},
	removeLine : function (lline) {
		this._lines.remove(lline);
	},
	destroy : function () {
		this._BaseMap.destroy();
	},

	initialize : function (BaseMap) {
		this._BaseMap = BaseMap;
		this._layer = BaseMap.getLayer("layer");

		this.svg = BaseMap._svg;
	},
	//组件top
	setTopy : function (topy) {
		this._topy = topy;
	},
	getTopy : function () {

		return this._topy;
	},
	//组件left
	setLeftx : function (leftx) {
		this._leftx = leftx;
	},
	getLeftx : function () {

		return this._leftx;
	},
	//node 的显示类型
	setNodeDisplayType : function (nodeDisplayType) {
		this._nodeDisplayType = nodeDisplayType;
	},
	getNodeDisplayType : function () {

		return this._nodeDisplayType;
	},
	//link 的显示类型
	setLinkDisplayType : function (linkDisplayType) {
		this._linkDisplayType = linkDisplayType;
	},
	getLinkDisplayType : function () {

		return this._linkDisplayType;
	},
	setMaxX : function (maxX) {
		if (maxX > this._maxX)
			this._maxX = maxX;
	},
	getMaxX : function () {

		return this._maxX;
	},
	setMaxY : function (maxY) {
		if (maxY > this._maxY)
			this._maxY = maxY;
	},
	getMaxY : function () {

		return this._maxY;
	},
	setCompWidth : function (compWidth) {
		this._compWidth = compWidth;
	},
	getCompWidth : function () {

		return this._compWidth;
	},
	setCompHeight : function (compHeight) {
		this._compHeight = compHeight;
	},
	getCompHeight : function () {

		return this._compHeight;
	},
	setOverviewWidth : function (overviewWidth) {
		this._overviewWidth = overviewWidth;
	},
	getOverviewWidth : function () {

		return this._overviewWidth;
	},
	setOverviewHeight : function (overviewHeight) {
		this._overviewHeight = overviewHeight;
	},
	getOverviewHeight : function () {

		return this._overviewHeight;
	},
	setNodetooltipdesc : function (nodetooltipdesc) {
		this._nodetooltipdesc = nodetooltipdesc;
	},
	getNodetooltipdesc : function () {

		return this._nodetooltipdesc;
	},
	setGrouptooltipdesc : function (grouptooltipdesc) {
		this._grouptooltipdesc = grouptooltipdesc;
	},
	getGrouptooltipdesc : function () {

		return this._grouptooltipdesc;
	},
	setLinktooltipdesc : function (linktooltipdesc) {
		this._linktooltipdesc = linktooltipdesc;
	},
	getLinktooltipdesc : function () {

		return this._linktooltipdesc;
	},
	setMenudesc : function (menudesc) {
		this._menudesc = menudesc;
	},
	getSubmenudesc : function () {
		return this._submenudesc;
	},
	setSubmenudesc : function (submenudesc) {
		this._submenudesc = submenudesc;
	},
	getGroupmenudesc : function () {
		return this._groupmenudesc;
	},
	setGroupmenudesc : function (groupmenudesc) {
		this._groupmenudesc = groupmenudesc;
	},
	getMenudesc : function () {
		return this._menudesc;
	},
	//nodemenudesc
	setNodemenudesc : function (nodemenudesc) {
		this._nodemenudesc = nodemenudesc;
	},
	getNodemenudesc : function () {
		return this._nodemenudesc;
	},
	setLinkmenudesc : function (linkmenudesc) {
		this._linkmenudesc = linkmenudesc;
	},
	getLinkmenudesc : function () {
		return this._linkmenudesc;
	},
	setNewdevice : function (newdevice) {
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
	getNewdevice : function () {
		return this._newdevice;
	},
	setNewlinedata : function (newlinedata) {
		this._newlinedata = newlinedata;
		this.refreshnewline();
	},
	getNewlinedata : function () {
		return this._newlinedata;
	},
	setNewgroup : function (newgroup) {
		this._newgroup = newgroup;
		var nodeobj = {};
		var nodeidid = newgroup.gid;
		nodeobj["sid"] = newgroup.gid;
		nodeobj["nx"] = newgroup.nx - 16;
		nodeobj["ny"] = newgroup.ny - 16;
		nodeobj["otype"] = 100;
		//nodeobj["text"] = item.getText();
		nodeobj["localip"] = newgroup.name;
		nodeobj["mac"] = newgroup.createtime;
		nodeobj["name"] = newgroup.name;
		nodeobj["customname"] = newgroup.name;
		nodeobj["factory"] = newgroup.iplist;
		nodeobj["model"] = newgroup.name;
		nodelinedata[nodeidid] = nodeobj;
		nodedata.push(nodeobj);
		newgroupnode = nodeobj;
		this.updatesubchart();

	},
	getNewgroup : function () {
		return this._newgroup;
	},
	setTooltipdata : function (tooltipdata) {

		this._tooltipdata = tooltipdata;
	},
	setRefreshdata : function (refreshdata) {
		this._refreshdata = refreshdata;
		this.refreshData(refreshdata);
	},
	setLayoutdata : function (layoutdata) {
		this._layoutdata = layoutdata;
		this.toporedrawlayout(layoutdata);
	},
	setSubchartdata : function (subchartdata) {
		this._subchartdata = subchartdata;
		this.udatetopochart(subchartdata);
	},

	/**
	 **
	 ** 初始化和加载数据
	 ** 并绘制整个控件
	 **/
	render : function (BaseMap) {

		//加载样式
		var head = document.getElementsByTagName('HEAD').item(0);
		var style = document.createElement('link');
		style.href = 'rwt-resources/topo.css';
		style.rel = 'stylesheet';
		style.type = 'text/css';
		head.appendChild(style);
		that1 = this;
		//获取导航的长和宽
		overvieww = this.getOverviewWidth();
		overviewh = this.getOverviewHeight();
		//主面板
		maindiv = document.getElementById("maindiv");
		//node link 显示类型
		nodeshowtype = this.getNodeDisplayType();
		linkshowtype = this.getLinkDisplayType();

		//node 提示
		nodetips = this.getNodetooltipdesc();
		grouptips = this.getGrouptooltipdesc();
		linktips = this.getLinktooltipdesc();
		//up down left right key 微调整node位置
		nodeclick = false; //是否点击的node
		//var removeallselected = false; //移除所有选中
		shiftKey = null;
		ctlKey = null;
		mousedownnode = null,
		mouseupnode = null;
		dragup = false; //是否是一个node上的拖动
		d3.select("body")
		.on("keydown.brush", keydown)
		.on("keyup.brush", keyup)
		.each(function () {
			this.focus();
		});
		function keydown() {
			shiftKey = d3.event.shiftKey;
			ctlKey = d3.event.ctrlKey;
		};

		function keyup() {
			//shiftKey = d3.event.shiftKey;
			//ctlKey = d3.event.ctrlKey;
			shiftKey = null;
			ctlKey = null;
		};
		d3.select("#maindiv")
		.on("contextmenu", this.contextmainmenu);
		//移除所有选中状态
		function resetMouseVars() {
			mousedownnode = null;
			mouseupnode = null;
		};

		nodesselected = true;
		d3.select("#maindiv")
		.on("mousedown", function () {

			//拖动多选效果
			//if (ctlKey) {
			nodesselected = false;
			var movex = maindiv.scrollLeft;
			var movey = maindiv.scrollTop;
			//var topy = that1.getTopy();
			//var leftx = that1.getLeftx();
			//localx = d3.mouse(this)[0] + movex - leftx + 16;
			//localy = d3.mouse(this)[1] + movey - topy + 16;
			localx = d3.mouse(this)[0] + movex + 16;
			localy = d3.mouse(this)[1] + movey + 16;
			//选中框
			select_rect.data([{
						x : localx,
						y : localy,
						w : 0,
						h : 0
					}
				]);
			select_rect.attr("x", function (d) {
				return d.x;
			})
			.attr("y", function (d) {
				return d.y;
			})
			.attr("width", function (d) {
				return d.w;
			})
			.attr("height", function (d) {
				return d.h;
			});
			//}
		})
		.on("mouseup", function () {

			//removeallselected = false;
			if (nodeclick) {
				nodeclick = false;
			} else {
				d3.selectAll(".selected")
				.classed("selected", function (d) {
					d.selected = false;
					return false;
				});
				//nodesselected = false;
				//removeallselected = true;
			}

			//处理连线
			if (mousedownnode) {
				// hide drag line
				drag_line
				.classed('hidden', true)
				.style('marker-end', '');
			}
			if (!mousedownnode) {
				if (!nodesselected) {
					var movex = maindiv.scrollLeft;
					var movey = maindiv.scrollTop;
					//var topy = that1.getTopy();
					//var leftx = that1.getLeftx();
					//extentx = d3.mouse(this)[0] + movex - leftx + 16;
					//extenty = d3.mouse(this)[1] + movey - topy + 16;
					extentx = d3.mouse(this)[0] + movex + 16;
					extenty = d3.mouse(this)[1] + movey + 16;
					var rstartx,
					rendx,
					rstarty,
					rendy;
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

					//处理node选中状态
					node.classed("selected", function (d) {
						if (d.nx > rstartx && d.nx < rendx && d.ny > rstarty && d.ny < rendy) {
							d.selected = true;
							return true;
						}

					});
					nodesselected = true;
				}
			}
			// clear mouse event vars
			resetMouseVars();
			//拖动多选效果
			//if (ctlKey) {

			//选中框
			select_rect
			.attr("width", 0)
			.attr("height", 0);
			//不响应移除选中
			//removeallselected = false;

			//}

		})
		.on("mousemove", function () {

			var movex = maindiv.scrollLeft;
			var movey = maindiv.scrollTop;
			//var topy = that1.getTopy();
			//var leftx = that1.getLeftx();
			//var mousex = d3.mouse(this)[0] + movex - leftx;
			//var mousey = d3.mouse(this)[1] + movey - topy;
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

					//选中框
					// if(ctlKey){
					select_rect.data([{
								x : 0,
								y : 0,
								w : w1,
								h : h1
							}
						]);
					select_rect.attr("width", function (d) {
						return d.w;
					})
					.attr("height", function (d) {
						return d.h;
					});
					//}
				}
				return;
			}
			//alert(d3.mouse(this)[0]);
			//滚动后修正鼠标坐标
			drag_line.attr('d', 'M' + mousedownnode.nx + ',' + mousedownnode.ny +
				'L' + mousex + ',' + mousey)
		});

		//初始化菜单
		this._initMainMenu();
		this._initMenu();
		this._initSubMenu();
		this._initGroupMenu();
		this._initLinkMenu();
		// node间拖动显示的线
		drag_line = this._layer.append('svg:path')
			.attr('class', 'link dragline hidden')
			.attr('d', 'M0,0L0,0');

		//选节点的
		var select_g = this._layer.append("g")
			.attr("class", "brush")
			.data([{
						x : 0.0,
						y : 0.0,
						w : 0.0,
						h : 0.0
					}
				]);
		select_rect = select_g.append("svg:rect")
			.attr("class", "selectrect")
			.attr("fill-opacity", 0)
			.attr("stroke", "red")
			.attr("x", function (d) {
				return d.x;
			})
			.attr("y", function (d) {
				return d.y;
			})
			.attr("width", function (d) {
				return d.w;
			})
			.attr("height", function (d) {
				return d.h;
			})
			link = this._layer.append("g")
			.attr("class", "link")
			.selectAll("line");
		link1 = this._layer.append("g") //需要特殊预留 支持双线用，以此推多线link+index
			.attr("class", "link1")
			.selectAll("line");
		linktip = this._layer.append("g")
			.attr("class", "linktip")
			.selectAll("line");
		linktext = this._layer.append("g")
			.attr("class", "text2link")
			.selectAll("text");

		var nodelist = this._layer.append("g")
			.attr("class", "nodelist");

		//构建node数据
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
			//nodeobj["text"] = item.getText();
			nodeobj["localip"] = item.getLocalip();
			nodeobj["mac"] = item.getMac();
			nodeobj["name"] = item.getName();
			nodeobj["customname"] = item.getCustomname();
			nodeobj["factory"] = item.getFactory();
			nodeobj["model"] = item.getModel();
			nodelinedata[nodeidid] = nodeobj;
			nodedata.push(nodeobj);
			nodeobj = {};
		}
		//构建line的data
		//linedata = new Array();
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
			lineobj["flow"] = item.getFlow();
			lineobj["pkts"] = item.getPkts();
			lineobj["broadcast"] = item.getBroadcast();
			lineobj["bwusage"] = item.getBwusage();
			lineobj["avgframeLen"] = item.getAvgframeLen();
			lineobj["error"] = item.getError();
			lineobj["warn"] = item.getWarn();
			//linedata.push(lineobj);
			lineidata[liid] = lineobj;
			linetextdata.push(lineobj);
			lineobj = {};
		}
		//创建nodes
		node = nodelist.selectAll(".node");
		this.createnodes();
		//创建连线
		this.initlinks();
		//初始化overview
		this.inioverviewnode();
		this.inioverviewlink();
		this.initrect();

	},

	/*********************************************
	 ** 初创建link linktip linktext
	 ********************************************/
	initlinks : function () {
		var that = this;
		var linkshowtype = this.getLinkDisplayType();
		//线
		link = link.data(linetextdata);
		link.enter().append("line")
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style('marker-end', 'url(#end-arrow)')
		.style("Stroke", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;

		});

		//link 提示框右键应用
		linktip = linktip.data(linetextdata);
		linktip.enter().append("line")
		.attr("id", function (d) {
			return d.lid;
		})
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style("stroke-width", "16px")
		.style("stroke", "blue")
		.style("stroke-opacity", "0.0")
		.on("contextmenu", this.contextlinkmenu);
		//link 的提示
		linktip.append("svg:title")
		.text(function (d) {
			return linktips.replace('p1', d.sinterface)
			.replace('p2', d.tinterface)
			.replace('p3', d.flow + " Kbps")
			.replace('p4', d.pkts + " Pkts/s")
			.replace('p5', d.broadcast + " Pkts/s")
			.replace('p6', d.bwusage + "% (100Mbps)")
			.replace('p7', d.avgframeLen + " Byte/Pkt");
		});
		//link 的text
		linktext = linktext.data(linetextdata);
		linktext.enter().append("text")
		.attr("x", function (d) {
			return (d.source.nx + d.target.nx) / 2;
		})
		.attr("y", function (d) {
			return (d.source.ny + d.target.ny) / 2;
		})
		.attr("transform", function (d) {
			angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
			return "rotate(" + angle1 + " " + ((d.source.nx + d.target.nx) / 2.0) + "," + ((d.source.ny + d.target.ny) / 2.0) + ")";
		})
		.attr("dy", "-6")
		//.style("font-family", "宋体")
		.style("stroke-width", "2px")
		.style("cursor", "default")
		.style("stroke-linejoin", "round")
		.style("font-size", "12px")
		.style("fill", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;
		})
		.style("Stroke", "none")
		.style("text-anchor", "middle")
		.text(function (d) {
			switch (linkshowtype) {
			case 2:
				return d.pkts + "Pkts/s";
			case 3:
				return d.broadcast + "Pkts/s";
			case 4:
				return d.bwusage + "% (100Mbps)";
			default:
				return d.flow + "Kbps"
			}
		});

	},
	/**
	 * 更新link
	 */
	updatelinks : function () {
		var that = this;
		var linkshowtype = this.getLinkDisplayType();
		//线
		link.data(linetextdata)
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style("Stroke", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;

		});

		//link 提示框右键应用
		linktip.data(linetextdata)
		.attr("id", function (d) {
			return d.lid;
		})
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		});
		/* 	.style("stroke-width", "16px")
		.style("stroke", "blue")
		.style("stroke-opacity", "0.0")
		.on("contextmenu", this.contextlinkmenu); */
		//link 的提示
		linktip.data(linetextdata)
		.text(function (d) {
			""
		});
		linktip.append("svg:title")
		.text(function (d) {
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
			return linktips.replace('p1', d.sinterface)
			.replace('p2', d.tinterface)
			.replace('p3', Math.round(tempflow * 10) / 10 + stringflow)
			.replace('p4', d.pkts + " Pkts/s")
			.replace('p5', d.broadcast + " Pkts/s")
			.replace('p6', d.bwusage + "% (100Mbps)")
			.replace('p7', d.avgframeLen + " Byte/Pkt");
		});
		//link 的text
		linktext.data(linetextdata)
		.attr("x", function (d) {
			return (d.source.nx + d.target.nx) / 2;
		})
		.attr("y", function (d) {
			return (d.source.ny + d.target.ny) / 2;
		})
		.attr("transform", function (d) {
			angle1 = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
			return "rotate(" + angle1 + " " + ((d.source.nx + d.target.nx) / 2.0) + "," + ((d.source.ny + d.target.ny) / 2.0) + ")";
		})
		/* .attr("dy", "-6")
		.style("stroke-width", "2px")
		.style("cursor", "default")
		.style("stroke-linejoin", "round")
		.style("font-size", "12px") */
		.style("fill", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;
		})
		.style("Stroke", "none")
		.style("text-anchor", "middle")
		.text(function (d) {
			switch (linkshowtype) {
			case 2:
				return d.pkts + "Pkts/s";
			case 3:
				return d.broadcast + "Pkts/s";
			case 4:
				return d.bwusage + "";
			default:
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
				return Math.round(tempflow * 10) / 10 + stringflow
			}
		});

		//that.updateoverviewnode();
		that.updateoverviewlink();

	},
	/**
	 * 删除links
	 */
	deletelinks : function () {
		var that = this;
		link = link.data(linetextdata, function (d) {
				return (d.lid);
			});
		link.exit().remove();

		linktip = linktip.data(linetextdata, function (d) {
				return (d.lid);
			});
		linktip.exit().remove();

		linktext = linktext.data(linetextdata, function (d) {
				return (d.lid);
			});
		linktext.exit().remove();
		//that.updateoverviewnode();
		that.updateoverviewlink();
	},
	/**
	刷新新的连线
	 **/
	refreshnewline : function () {
		var datanewline = this.getNewlinedata();
		var that = this;
		var newlineid = datanewline.lid;
		if (newlineid === "nil") {
			if (typeof(linetempobj) == "undefined")
				return;
			selectlink = linetempobj["lid"];
			//删除line

			that.updatelinksdata(0);
			that.deletelinks();
		} else {
			linetempobj["lid"] = datanewline.lid;
			linetempobj["sinterface"] = datanewline.port1;
			linetempobj["tinterface"] = datanewline.port2;
			this.updatelinks();
		}
	},
	/**
	处理links的对象数据
	tag 0 删除单个数据
	tag 1 删除与一个node关联的多个link
	tag 2 删除与多个node关联的多个link
	tag 3 删除子图中的多个link ，并保留一些link
	 **/
	updatelinksdata : function (tag) {
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
				if (linetextdata[i].source.sid === selectnode || linetextdata[i].target.sid === selectnode) {}
				else {
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
	/**
	删除node数据
	 */
	deletenodes : function () {
		//node
		var that = this;
		node = node.data(nodedata, function (d) {
				return (d.sid);
			});
		node.exit().remove();
		that.updateoverviewnode();
	},
	/**
	处理nodes的对象数据
	tag 0 删除单个node
	tag 1 删除多个node delgroup
	 **/
	updatenodesdata : function (tag) {
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
	/**
	 ** 移动节点
	 **/
	nudge : function (dx, dy) {
		node.filter(function (d) {
			return d.selected;
		})
		.attr("transform", function (d) {
			//x y 坐标最大值
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
			return "translate(" + d.nx + ", " + d.ny + ")"
		})
		link.filter(function (d) {
			return d.source.selected;
		})
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		});

		link.filter(function (d) {
			return d.target.selected;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		});
		linktip.filter(function (d) {
			return d.source.selected;
		})
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		});
		linktip.filter(function (d) {
			return d.target.selected;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		});
		linktext.filter(function (d) {
			return (d.source.selected || d.target.selected);
		})
		.attr("x", function (d) {
			return (d.source.nx + d.target.nx) / 2.0;
		})
		.attr("y", function (d) {
			return (d.source.ny + d.target.ny) / 2.0;
		})
		.attr("transform", function (d) {
			angle = that1.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
			return "rotate(" + angle + " " +
			((d.source.nx + d.target.nx) / 2.0) + "," +
			((d.source.ny + d.target.ny) / 2.0) + ")";
		});

		d3.event.preventDefault();
	},
	/**
	创建node
	 **/
	createnodes : function () {
		var that = this;
		//移除所有选中状态
		function resetMouseVars() {
			mousedownnode = null;
			mouseupnode = null;
		}
		//拖动
		var drag = d3.behavior.drag()
			.on("dragstart", function () {
				if (d3.select(this).classed("selected")) {
					// hide drag line
					drag_line
					.classed('hidden', true)
					.style('marker-end', '');
					// clear mouse event vars
					resetMouseVars();
				}
			})
			.on("drag", function (d) {
				/*
				选中状态才可以移动，else 其他动作
				 */
				if (d3.select(this).classed("selected") && !dragup) {
					that.nudge(d3.event.dx, d3.event.dy);
				} else {}
			})
			.on("dragend", function (d) {
				//处理连线
				if (mousedownnode) {
					if (mousedownnode === d)
						dragup = true;
					if (!d3.select(this).classed("selected"))
						d3.event.defaultPrevented(); //响应默认
					// hide drag line
					drag_line
					.classed('hidden', true)
					.style('marker-end', '');
				}
				// clear mouse event vars
				resetMouseVars();

				that1.updateoverviewnode();
				that1.updateoverviewlink();

			});

		//创建node
		node = node.data(nodedata);
		nodeenter = node.enter().append("g");

		nodeenter.attr("class", "node")
		.attr("transform", function (d) {
			return "translate(" + d.nx + ", " + d.ny + ")"
		})
		.on("mouseup", function (d) {
			nodeclick = true; //与removeallselected互斥
			//if (removeallselected) {
			//	d.selected = false;
			//}
			if (!d.selected) { // Don't deselect on shift-drag.
				if (!shiftKey) {
					node.classed("selected", function (p) {
						return p.selected = d === p;
					});
				} else {
					d3.select(this).classed("selected", d.selected = true);
				}
			}
			if (!mousedownnode)
				return;
			mouseupnode = d;
			//添加连线
			if (mouseupnode === mousedownnode) {
				//同一个node 隐藏drag_line
				drag_line
				.classed('hidden', true)
				.style('marker-end', '');
				resetMouseVars();
				return;
			}

			//产生随机数
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
			linetempobj["pkts"] = 30;
			linetempobj["broadcast"] = 3;
			linetempobj["bwusage"] = 0;
			linetempobj["avgframeLen"] = 0;
			linetempobj["error"] = 50;
			linetempobj["warn"] = 20;
			linetextdata.push(linetempobj);

			that1.initlinks();

			//处理连接线
			drag_line
			.classed('hidden', true)
			.style('marker-end', '');
			resetMouseVars();
		})
		.on("mousedown", function (d) {
			dragup = false;
			//if (removeallselected) {
			//	d.selected = false;
			//}

			var that = this;
			var selectedd = d3.select(this).classed("selected")
				if (!selectedd) {
					d.selected = false;
				}
				if (!d.selected) {
					mousedownnode = d;
					//初始化drag_line
					drag_line
					.style('marker-end', 'url(#end-arrow)')
					.classed('hidden', false)
					.attr('d', 'M' + d.nx + ',' + d.ny + 'L' + d.nx + ',' + d.ny);

				}
		})
		.call(drag);
		//创建node的text
		nodeenter.append("text")
		.attr("class", "node2text")
		.attr("x", 0)
		.attr("y", 26)
		.style("fill", "#000000")
		.style("stroke", "#none")
		.style("font-size", "14px")
		.style("cursor", "default")
		.style("text-anchor", "middle")
		.text(function (d) {
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
		//node 的图片
		nodeenter.append("svg:image")
		.attr("x", -16)
		.attr("y", -16)
		.attr("width", 32)
		.attr("height", 32)
		.attr("xlink:href", function (d) {
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
			case 100:
				return "rwt-resources/topomap/Group_Blue.bmp";
			default:
				return "rwt-resources/topomap/Other_Blue.ico";

			}
		});
		//node 的选中框
		var noderects = nodeenter.append("rect")
			.attr("x", -16)
			.attr("y", -16)
			.attr("width", 32)
			.attr("height", 32)
			.attr("id", function (d) {
				return d.sid;
			})
			// .style("cursor","pointer")
			.style("stroke-width", "2")
			.style("stroke-dasharray", "2,2")
			.on("dblclick", function (d) {
				if (d.otype == 100) {
					that1._savedata("looksubchart", d.name);
				} else {
					//that1._savedata("devicepanel", d.sid);
				}
			})
			.on("contextmenu", that.contextnodemenu);
		/* 		.on("contextmenu", function (data, index) {

		var selectnodes = d3.selectAll(".selected");
		var size = selectnodes[0].length; //selectnodes[0]?
		nodeclick = true;
		if (size > 1) {
		//拓扑子图菜单
		selectnode = d3.select(this).attr("id");
		var topy = that1.getTopy();
		var leftx = that1.getLeftx();
		var cheight = that1.getCompHeight();
		var scrollLeft1 = maindiv.scrollLeft;
		var scrollTop1 = maindiv.scrollTop;
		var xx = d3.event.clientX - leftx;
		var yy = d3.event.clientY - topy;
		//记录下鼠标的位置
		mousexx = xx + scrollLeft1;
		mouseyy = yy + scrollTop1;
		d3.select('#submenu')
		.style('position', 'absolute')
		.style('left', xx + "px")
		.style('top', yy + "px")
		.style('display', 'inline-block')
		.on('mouseleave', function () {
		d3.select('#submenu').style('display', 'none');
		});

		d3.event.preventDefault();
		} else {

		if (data.otype == 100) {
		selectgroup = data.name;
		selectnode = data.sid;
		var topy = that1.getTopy();
		var leftx = that1.getLeftx();
		var cheight = that1.getCompHeight();
		var xx = d3.event.clientX - leftx;
		var yy = d3.event.clientY - topy;
		//记录下鼠标的位置
		mousexx = xx;
		mouseyy = yy;
		d3.select('#groupmenu')
		.style('position', 'absolute')
		.style('left', xx + "px")
		.style('top', yy + "px")
		.style('display', 'inline-block')
		.on('mouseleave', function () {
		d3.select('#groupmenu').style('display', 'none');
		});

		d3.event.preventDefault();
		} else {
		//node菜单
		selectnode = data.sid;

		var topy = that1.getTopy();
		var leftx = that1.getLeftx();
		var cheight = that1.getCompHeight();
		var xx = d3.event.clientX - leftx;
		var yy = d3.event.clientY - topy;
		//处理菜单过长的问题
		var fialyy = yy + 30 * nodemenucount;
		if (fialyy > cheight) {
		var yyy = fialyy - cheight;
		yy = yy - yyy;
		}
		d3.select('#mymenu')
		.style('position', 'absolute')
		.style('left', xx + "px")
		.style('top', yy + "px")
		.style('display', 'inline-block')
		.on('mouseleave', function () {
		d3.select('#mymenu').style('display', 'none');
		});

		d3.event.preventDefault();
		}

		}
		}
		); */

		noderects.append("svg:title")
		.text(function (d) {
			switch (d.otype) {
			case 100:
				return grouptips.replace('p1', d.localip)
				.replace('p2', d.mac)
				.replace('p3', d.factory);
			default:
				return nodetips.replace('p1', d.localip)
				.replace('p2', d.mac)
				.replace('p3', d.name)
				.replace('p4', d.customname)
				.replace('p5', d.factory)
				.replace('p6', d.model);
			}
		});

	},
	contextnodemenu : function (data, index) {
		var selectnodes = d3.selectAll(".selected");
		var size = selectnodes[0].length; //selectnodes[0]?
		nodeclick = true;
		if (size > 1) {
			//拓扑子图菜单
			selectnode = d3.select(this).attr("id");
			var topy = that1.getTopy();
			var leftx = that1.getLeftx();
			var cheight = that1.getCompHeight();
			var scrollLeft1 = maindiv.scrollLeft;
			var scrollTop1 = maindiv.scrollTop;
			var xx = d3.event.clientX - leftx;
			var yy = d3.event.clientY - topy;
			//记录下鼠标的位置
			mousexx = xx + scrollLeft1;
			mouseyy = yy + scrollTop1;
			d3.select('#submenu')
			.style('position', 'absolute')
			.style('left', xx + "px")
			.style('top', yy + "px")
			.style('display', 'inline-block')
			.on('mouseleave', function () {
				d3.select('#submenu').style('display', 'none');
			});

			d3.event.preventDefault();
		} else {

			if (data.otype == 100) {
				selectgroup = data.name;
				selectnode = data.sid;
				var topy = that1.getTopy();
				var leftx = that1.getLeftx();
				var cheight = that1.getCompHeight();
				var xx = d3.event.clientX - leftx;
				var yy = d3.event.clientY - topy;
				//记录下鼠标的位置
				mousexx = xx;
				mouseyy = yy;
				d3.select('#groupmenu')
				.style('position', 'absolute')
				.style('left', xx + "px")
				.style('top', yy + "px")
				.style('display', 'inline-block')
				.on('mouseleave', function () {
					d3.select('#groupmenu').style('display', 'none');
				});

				d3.event.preventDefault();
			} else {
				//node菜单
				selectnode = data.sid;

				var topy = that1.getTopy();
				var leftx = that1.getLeftx();
				var cheight = that1.getCompHeight();
				var xx = d3.event.clientX - leftx;
				var yy = d3.event.clientY - topy;
				//处理菜单过长的问题
				var fialyy = yy + 30 * nodemenucount;
				if (fialyy > cheight) {
					var yyy = fialyy - cheight;
					yy = yy - yyy;
				}
				d3.select('#mymenu')
				.style('position', 'absolute')
				.style('left', xx + "px")
				.style('top', yy + "px")
				.style('display', 'inline-block')
				.on('mouseleave', function () {
					d3.select('#mymenu').style('display', 'none');
				});

				d3.event.preventDefault();
			}

		}
	},
	/**
	创建子图后更新界面
	 */
	updatesubchart : function () {
		var that = this;
		that.updatelinksdata(3);
		that.updatenodesdata(1); //更新node数据
		that.deletelinks();
		that.deletenodes();
		that.createnodes();
		that.updatelinks();
	},
	/***
	撤销子图后跟新主图数据
	 **/
	udatetopochart : function (data) {
		var that = this;
		var nodeobj = {};
		var lineobj = {};
		//删除groupnode的相关数据
		that.updatenodesdata(0); //更新node数据
		that.updatelinksdata(1);
		that.deletelinks();
		that.deletenodes();
		//更新数据
		data.map(function (obj, index) {
			var jid = obj.jid;
			if (jid.indexOf("n") == 0) //是否为node
			{
				nodeobj["sid"] = jid;
				nodeobj["nx"] = obj.nx - 16;
				nodeobj["ny"] = obj.ny - 16;
				nodeobj["otype"] = obj.type;
				//nodeobj["text"] = item.getText();
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
				lineobj["pkts"] = 0;
				lineobj["broadcast"] = 0;
				lineobj["bwusage"] = 0;
				lineobj["avgframeLen"] = 0;
				lineobj["error"] = obj.error;
				lineobj["warn"] = obj.warn;
				//linedata.push(lineobj);
				linetextdata.push(lineobj);
				lineobj = {};
			}
		});
		that.createnodes();
		that.initlinks();

		that.updateoverviewnode();
		that.updateoverviewlink();
	},
	/**
	 * 获取link的color
	 */
	getlinkcolor : function (d) {
		var linkshowtype = this.getLinkDisplayType();
		switch (linkshowtype) {
		case 2:
			if (d.pkts > d.error)
				return "red"; //
			if (d.pkts > d.warn)
				return "#FFD306";
			if (d.pkts > 0)
				return "#00DB00";
			if (d.pkts === 0)
				return "#272727";
		case 3:
			if (d.broadcast > d.error)
				return "red"; //
			if (d.broadcast > d.warn)
				return "#FFD306";
			if (d.broadcast > 0)
				return "#00DB00";
			if (d.broadcast === 0)
				return "#272727";
		case 4:
			if (d.bwusage > d.error)
				return "red"; //
			if (d.bwusage > d.warn)
				return "#FFD306";
			if (d.bwusage > 0)
				return "#00DB00";
			if (d.bwusage === 0)
				return "#272727";
		default:
			if (d.flow > d.error)
				return "red"; //
			if (d.flow > d.warn)
				return "#FFD306";
			if (d.flow > 0)
				return "#00DB00";
			if (d.flow === 0)
				return "#272727";
		}
	},
	/**
	 ** 拓扑重新排版
	 **
	 **/
	toporedrawlayout : function (layoutdata) {
		that = this;
		//更新数据
		//得到最小值(负值处理) 最大值(调整div)
		var minvalue = layoutdata.pop();
		var minx = Math.abs(minvalue.nx);

		var miny = Math.abs(minvalue.ny);
		var maxvalue = layoutdata.pop();
		var maxx = Math.abs(maxvalue.nx + 64 + minx);
		var maxy = Math.abs(maxvalue.ny + 64 + miny);
		this.setMaxX(maxx);
		this.setMaxY(maxy);
		layoutdata.map(function (obj, index) {
			nodelinedata[obj.nid].nx = obj.nx + 64 + minx;
			nodelinedata[obj.nid].ny = obj.ny + 64 + miny;
			//nodedata[index].nx = obj.nx + 64 + minx;
			//nodedata[index].ny = obj.ny + 64 + miny;
		});
		node.data(nodedata)
		.attr("transform", function (d) {
			return "translate(" + d.nx + ", " + d.ny + ")"
		})
		link
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		});

		linktip
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		}).attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		});

		linktext
		.attr("x", function (d) {
			return (d.source.nx + d.target.nx) / 2.0;
		})
		.attr("y", function (d) {
			return (d.source.ny + d.target.ny) / 2.0;
		})
		.attr("transform", function (d) {
			angle = that.getAngle(d.source.nx, d.source.ny, d.target.nx, d.target.ny);
			return "rotate(" + angle + " " +
			((d.source.nx + d.target.nx) / 2.0) + "," +
			((d.source.ny + d.target.ny) / 2.0) + ")";
		});

		//处理导航 overview
		w = this.getMaxX();
		h = this.getMaxY();
		scaleFactor = Math.min(overvieww / w, overviewh / h)
			var ovlayer = d3.select("#overview");
		ovlayer.attr("transform", "scale(" + scaleFactor + ")");

		this.updateoverviewnode();
		this.updateoverviewlink();
	},
	/**
	 ** 刷新流量数据等
	 **
	 **/
	refreshData : function (refreshdata) {

		//linetextdata
		//更新数据
		//refreshdata.map(function (obj, index) {
		//	linetextdata[index].flow = obj.flow;
		//	linetextdata[index].pkts = obj.pkts;
		//	linetextdata[index].broadcast = obj.broadcast;
		//	linetextdata[index].bwusage = obj.bwusage;
		//	linetextdata[index].avgframeLen = obj.avgframeLen;
		//});
		var linkshowtype = this.getLinkDisplayType();
		refreshdata.map(function (obj, index) {
			if (lineidata[obj.lid] !== undefined) {
				lineidata[obj.lid].flow = obj.flow;
				lineidata[obj.lid].pkts = obj.pkts;
				lineidata[obj.lid].broadcast = obj.broadcast;
				lineidata[obj.lid].bwusage = obj.bwusage;
				lineidata[obj.lid].avgframeLen = obj.avgframeLen;
			}
		});
		//连线
		link = link.data(linetextdata)
			.style("Stroke", function (d) {
				if (d.flow > d.error)
					return "red"; //
				if (d.flow > d.warn)
					return "#FFD306";
				if (d.flow > 0)
					return "#00DB00";

			})
			.style("stroke-width", function (d) {
				var tempflow = d.flow;
				var stringflow = "1px";
				if (tempflow > 1024) {
					tempflow = tempflow / 1024;
					stringflow = "2px";
					if (tempflow > 1024) {
						tempflow = tempflow / 1024;
						stringflow = "3px";
						if (tempflow > 1024) {
							tempflow = tempflow / 1024;
							stringflow = "4px";
						}
					}
				}
				return stringflow;

			});

		linktip.data(linetextdata)
		.text(function (d) {
			""
		});
		linktip.append("svg:title")
		.text(function (d) {
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

			return linktips.replace('p1', d.sinterface)
			.replace('p2', d.tinterface)
			.replace('p3', Math.round(tempflow * 10) / 10 + stringflow)
			.replace('p4', Math.round(d.pkts * 10) / 10 + " Pkts/s")
			.replace('p5', Math.round(d.broadcast * 10) / 10 + " Pkts/s")
			.replace('p6', Math.round(d.bwusage * 10) / 10 + "% (100Mbps)")
			.replace('p7', Math.round(d.avgframeLen * 10) / 10 + " Byte/Pkt");
		});

		//连线文本
		linktext.data(linetextdata)
		.style("fill", function (d) {
			//if (d.flow > d.error)
			//	return "red"; //
			//if (d.flow > d.warn)
			//	return "#FFD306";
			//if (d.flow > 0)
			//	return "#00DB00";
			switch (linkshowtype) {
			case 2:
				if (d.pkts > d.error)
					return "red"; //
				if (d.pkts > d.warn)
					return "#FFD306";
				if (d.pkts > 0)
					return "#00DB00";
				if (d.pkts === 0)
					return "#272727";
			case 3:
				if (d.broadcast > d.error)
					return "red"; //
				if (d.broadcast > d.warn)
					return "#FFD306";
				if (d.broadcast > 0)
					return "#00DB00";
				if (d.broadcast === 0)
					return "#272727";
			case 4:
				if (d.bwusage > d.error)
					return "red"; //
				if (d.bwusage > d.warn)
					return "#FFD306";
				if (d.bwusage > 0)
					return "#00DB00";
				if (d.bwusage === 0)
					return "#272727";
			default:
				if (d.flow > d.error)
					return "red"; //
				if (d.flow > d.warn)
					return "#FFD306";
				if (d.flow > 0)
					return "#00DB00";
				if (d.flow === 0)
					return "#272727";
			}
		})
		.text(function (d) {

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
					return Math.round(d.bwusage * 10) / 10 + "% (100Mbps)";
				}
			default:
				//return d.flow + "Kbps"
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
				if (tempflow == 0) {
					return "";
				} else {
					return Math.round(tempflow * 10) / 10 + stringflow
				}
			}

		});

	},
	/**
	 ** 初始化菜单
	 **/
	//主菜单
	_initMainMenu : function () {
		var that = this;
		var ulul = d3.select("#Mainmenu").append("ul");
		//var menudes = "node$ip$name$model$custom:link$flow$pkts$broadcast$bwusage:scale size$zoom //in$zoom out$original size:layout$layout1$layout2$layout3";
		var menudes = this.getMenudesc();
		var arraymenu = menudes.split(":");
		for (var i = 0; i < arraymenu.length; i++) {
			var subarraymenu = arraymenu[i].split("$");
			if (subarraymenu.length > 1) {
				var subli = ulul.append("li");
				subli.append("a")
				.style("cursor", "pointer")
				.text(subarraymenu[0]);
				var subul = subli.append("ul")
					.attr("id", "main" + i + "");
				for (var j = 1; j < subarraymenu.length; j++) {
					subul.append("li").append("a")
					.style("cursor", "pointer")
					.text(subarraymenu[j]);
				}
			} else {
				var lia = ulul.append("li").append("a")
					.attr("id", "main" + i + "")
					.style("cursor", "pointer")
					.text(arraymenu[i]);
			}
		}

		//node 显示
		ulul.select("#main0").selectAll("a").on("click", function (d, index) {
			that.refreshNodeText(index);

		});
		//link显示
		ulul.select("#main1").selectAll("a").on("click", function (d, i) {
			that.refreshLinkText(i);
		});
		//zoom
		ulul.select("#main2").selectAll("a").on("click", function (d, i) {
			that.scalesize(i);
		});
		//layout
		ulul.select("#main3").selectAll("a").on("click", function (d, i) {
			that.topolayout(i);
		});
		//savetopo
		ulul.select("#main4").on("click", function (d, i) {
			that.savetopo();
		});
		//添加设备
		ulul.select("#main5").on("click", function (d, i) {
			var ids = new Array();
			ids.push(mousexx);
			ids.push(mouseyy);
			that._savedata("adddevice", ids);
		});
		// add line
		ulul.select("#main6").on("click", function (d, i) {
			that._savedata("addline", "");
		});
	},
	//node菜单
	_initMenu : function () {
		var that = this;
		var ulul = d3.select("#mymenu").append("ul");
		var menudes = this.getNodemenudesc();
		var arraymenu = menudes.split(":");
		nodemenucount = arraymenu.length;
		for (var i = 0; i < arraymenu.length; i++) {
			var subarraymenu = arraymenu[i].split("$");
			if (subarraymenu.length > 1) {
				var subli = ulul.append("li");
				subli.append("a")
				.style("cursor", "pointer")
				.text(subarraymenu[0]);
				var subul = subli.append("ul")
					.attr("id", "node" + i + "");
				for (var j = 1; j < subarraymenu.length; j++) {
					subul.append("li").append("a")
					.style("cursor", "pointer")
					.text(subarraymenu[j]);
				}
			} else {
				var lia = ulul.append("li").append("a")
					.attr("id", "node" + i + "")
					.style("cursor", "pointer")
					.text(arraymenu[i]);
			}
		}
		//设备属性
		ulul.select("#node0").on("click", function (d, i) {
			that._savedata("devicepropery", selectnode);
		});
		//设备连接图
		ulul.select("#node1").on("click", function (d, i) {
			that._savedata("deviceconnect", selectnode);
		});
		//设备面板图
		ulul.select("#node2").on("click", function (d, i) {
			that._savedata("devicepanel", selectnode);
		});
		//设备端口分析
		ulul.select("#node3").on("click", function (d, i) {
			that._savedata("deviceport", selectnode);
		});
		//设备cpu 和内存
		ulul.select("#node4").on("click", function (d, i) {
			that._savedata("devicecpumem", selectnode);
		});
		//
		ulul.select("#node5").on("click", function (d, i) {
			if (i == 0) //接口表信息
			{
				that._savedata("deviceiftable", selectnode);
			} else if (i == 1) //设备路由表
			{
				that._savedata("deviceroutetable", selectnode);
			} else if (i == 2) //设备转发表
			{
				that._savedata("devicemactable", selectnode);
			} else if (i == 3) //arp
			{
				that._savedata("devicearptable", selectnode);
			} else if (i == 4) //cdp
			{
				that._savedata("devicecdptable", selectnode);
			} else if (i == 5) //iptable
			{
				that._savedata("deviceiptable", selectnode);
			}
		});
		ulul.select("#node6").on("click", function (d, i) {
			if (i == 0) //快速报警
			{
				that._savedata("devicealertfast", selectnode);
			} else if (i == 1) //分类报警
			{
				that._savedata("devicealertcategory", selectnode);
			}
		});
		//告警阀值配置
		ulul.select("#node7").on("click", function (d, i) {
			that._savedata("devicealertconfig", selectnode);
		});
		//web浏览
		ulul.select("#node8").on("click", function (d, i) {
			that._savedata("deviceweb", selectnode);
		});
		ulul.select("#node9").on("click", function (d, i) {
			if (i == 0) //telnet
			{
				that._savedata("devicetelnet", selectnode);
			} else if (i == 1) //ping
			{
				that._savedata("deviceping", selectnode);
			} else if (i == 2) //tracetoute
			{
				that._savedata("devicetracetoute", selectnode);
			} else if (i == 3) //snmptest
			{
				that._savedata("devicesnmptest", selectnode);
			}
		});
		//设备刷新
		ulul.select("#node10").on("click", function (d, i) {
			that._savedata("devicerefresh", selectnode);
		});
		//设备删除
		ulul.select("#node11").on("click", function (d, i) {
			var ids = new Array();
			ids.push(selectnode);
			that._savedata("delgroup", ids);
			that.updatenodesdata(0); //更新node数据
			that.updatelinksdata(1);
			that.deletelinks();
			that.deletenodes();

		});
	},
	//node 子图菜单
	_initSubMenu : function () {
		var that = this;
		var ulul = d3.select("#submenu").append("ul");
		var menudes = this.getSubmenudesc();
		var arraymenu = menudes.split(":");
		for (var i = 0; i < arraymenu.length; i++) {
			var lia = ulul.append("li").append("a")
				.style("cursor", "pointer")
				.text(arraymenu[i]);
		}
		ulul.selectAll("a").on("click", function (d, i) {

			var ids = new Array();
			selectnodes = new Array();
			for (j = 0; j < nodedata.length; j++) {

				var ndata = nodedata[j];
				if (ndata.selected) {
					ids.push(ndata.sid);
					selectnodes.push(ndata.sid);
				}
			}

			if (i == 0) {
				//将坐标
				ids.push(mousexx);
				ids.push(mouseyy);
				that._savedata("createsubtopo", ids);
			}
			if (i == 1) {
				that._savedata("delgroup", ids);
				that.updatelinksdata(2);
				that.updatenodesdata(1); //更新node数据
				that.deletelinks();
				that.deletenodes();
			}
			//that._NodeMenuAction(i);
		});
	},

	_initGroupMenu : function () {
		var that = this;
		var ulul = d3.select("#groupmenu").append("ul");
		var menudes = this.getGroupmenudesc();
		var arraymenu = menudes.split(":");
		for (var i = 0; i < arraymenu.length; i++) {
			var lia = ulul.append("li").append("a")
				.style("cursor", "pointer")
				.text(arraymenu[i]);
		}
		ulul.selectAll("a").on("click", function (d, i) {

			if (i == 0) {

				that._savedata("looksubchart", selectgroup);
			}
			if (i == 1) {
				that._savedata("cancelsubchart", selectgroup);
			}
			//that._NodeMenuAction(i);
		});
	},
	//link菜单
	_initLinkMenu : function () {
		var that = this;
		var ulul = d3.select("#linkmenu").append("ul");
		var menudes = this.getLinkmenudesc();
		var arraymenu = menudes.split(":");
		for (var i = 0; i < arraymenu.length; i++) {
			var lia = ulul.append("li").append("a")
				.style("cursor", "pointer")
				.text(arraymenu[i]);
		}
		ulul.selectAll("a").on("click", function (d, i) {
			if (i == 0) //线路属性
			{
				that._savedata("linepropery", selectlink);
			}
			if (i == 1) //线路分析
			{
				that._savedata("lineflow", selectlink);
			}
			if (i == 2) //删除line
			{
				that._savedata("delline", selectlink);
				//删除line
				that.updatelinksdata(0);
				that.deletelinks();

			}
		});
	},

	//保存拓扑图
	savetopo : function () {

		this._savedata("savetopo", nodedata);
	},
	//拓扑图排版
	topolayout : function (_tag) {
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
	//拓扑图缩放
	scalesize : function (_tag) {
		switch (_tag) {
		case 1:
			currentscale = currentscale - 0.1;
			if (currentscale == 0.1)
				currentscale = 0.1;
			d3.select(".layer").attr("transform", "scale(" + currentscale + ")");
			if (currentscale >= 1) {
				dragrect.data([{
							x : 0.0,
							y : 0.0,
							w : 170.0 / currentscale,
							h : 150.0 / currentscale
						}
					]);
				dragrect.attr("width", function (d) {
					return d.w;
				})
				.attr("height", function (d) {
					return d.h;
				})
			}
			break;
		case 2:
			d3.select(".layer").attr("transform", "scale(1)");
			dragrect.data([{
						x : 0.0,
						y : 0.0,
						w : 170.0,
						h : 150.0
					}
				]);
			dragrect.attr("width", function (d) {
				return d.w;
			})
			.attr("height", function (d) {
				return d.h;
			})
			break;
		case 3:
			var nodemaxx = 0;
			var nodemaxy = 0;
			//计算坐标最大值
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
			if (maxscale > 1) //扩大
			{
				currentscale = minscale;
			} else {
				currentscale = maxscale;
			}
			d3.select(".layer").attr("transform", "scale(" + currentscale + ")");
			if (currentscale >= 1) {
				//获取蒙版元素
				dragrect.data([{
							x : 0.0,
							y : 0.0,
							w : 170.0 / currentscale,
							h : 150.0 / currentscale
						}
					]);
				dragrect.attr("width", function (d) {
					return d.w;
				})
				.attr("height", function (d) {
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
				//获取蒙版元素
				dragrect.data([{
							x : 0.0,
							y : 0.0,
							w : 170.0 / currentscale,
							h : 150.0 / currentscale
						}
					]);
				dragrect.attr("width", function (d) {
					return d.w;
				})
				.attr("height", function (d) {
					return d.h;
				})

			}
		}
	},
	//刷新node 的显示
	refreshNodeText : function (_tag) {
		switch (_tag) {
		case 1:
			nodetext
			.text(function (d) {
				return d.model
			});
			break;
		case 2:
			nodetext
			.text(function (d) {
				return d.name
			});
			break;
		case 3:
			nodetext
			.text(function (d) {
				return d.customname
			});
			break;
		default:
			nodetext
			.text(function (d) {
				return d.localip
			});
		}
	},
	//刷新link的显示
	refreshLinkText : function (_tag) {
		var that = this;
		switch (_tag) {
		case 1:
			this.setLinkDisplayType(2);
			link.data(linetextdata)
			.style("Stroke", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;

			});
			linktext.data(linetextdata)
			.style("fill", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;
			})
			.text(function (d) {
				if (d.pkts == 0) {
					return ""
				} else {
					return Math.round(d.pkts * 10) / 10 + "Pkts/s"
				}
			});
			break;
		case 2:
			this.setLinkDisplayType(3);
			link.data(linetextdata)
			.style("Stroke", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;

			});
			linktext.data(linetextdata)
			.style("fill", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;
			})
			.text(function (d) {
				if (d.broadcast == 0) {
					return ""
				} else {
					return Math.round(d.broadcast * 10) / 10 + " Pkts/s"
				}
			});
			break;
		case 3:
			this.setLinkDisplayType(4);
			link.data(linetextdata)
			.style("Stroke", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;

			});
			linktext.data(linetextdata)
			.style("fill", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;
			})
			.text(function (d) {
				if (d.bwusage == 0) {
					return ""
				} else {
					return Math.round(d.bwusage * 10) / 10 + "%  (100Mbps)"
				}
			});
			break;
		default:
			this.setLinkDisplayType(1);
			link.data(linetextdata)
			.style("Stroke", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;

			});
			linktext.data(linetextdata)
			.style("fill", function (d) {
				var lincc = that.getlinkcolor(d);
				return lincc;
			})
			.text(function (d) {
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
				if (tempflow == 0) {
					return ""
				} else {
					return Math.round(tempflow * 10) / 10 + stringflow
				}
			});
		}
	},

	//弹出菜单
	contextmainmenu : function () {
		var others = d3.select('#mymenu').style('display');
		var others1 = d3.select('#linkmenu').style('display');
		var others2 = d3.select('#submenu').style('display');
		var others3 = d3.select('#groupmenu').style('display');
		var topy = that1.getTopy();
		var leftx = that1.getLeftx();
		if (others === 'none' && others1 === 'none' && others2 === 'none' && others3 === 'none') {
			//var xx = d3.event.clientX - leftx;
			//var yy = d3.event.clientY - topy;
			var scrollLeft1 = maindiv.scrollLeft;
			var scrollTop1 = maindiv.scrollTop;
			var position = d3.mouse(this);
			var xx = position[0];
			var yy = position[1];
			mousexx = xx + scrollLeft1;
			mouseyy = yy + scrollTop1;

			d3.select('#Mainmenu')
			.style('position', 'absolute')
			.style('left', xx + "px")
			.style('top', yy + "px")
			.style('display', 'inline-block')
			.on('mouseleave', function () {
				d3.select('#Mainmenu').style('display', 'none');
			});

			d3.event.preventDefault();
		}
	},

	//link菜单
	contextlinkmenu : function (data, i) {

		//记录下id
		// nid1=data.source.sid;
		//nid2=data.target.sid;
		selectlink = data.lid;
		//var topy = that1.getTopy();
		//var leftx = that1.getLeftx();
		//var xx = d3.event.clientX - leftx;
		//var yy = d3.event.clientY - topy;
		var scrollLeft1 = maindiv.scrollLeft;
		var scrollTop1 = maindiv.scrollTop;
		var position = d3.mouse(this);
		var xx = position[0];
		var yy = position[1];
		mousexx = xx + scrollLeft1;
		mouseyy = yy + scrollTop1;
		d3.select('#linkmenu')
		.style('position', 'absolute')
		.style('left', xx + "px")
		.style('top', yy + "px")
		.style('display', 'inline-block')
		.on('mouseleave', function () {
			d3.select('#linkmenu').style('display', 'none');
		});

		d3.event.preventDefault();
	},
	//两点计算角度
	getAngle : function (px1, py1, px2, py2) {
		//两点的x、y值
		x = px2 - px1;
		y = py2 - py1;
		hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
		//斜边长度
		cos = x / hypotenuse;
		radian = Math.acos(cos);
		//求出弧度
		angle = 180 * radian / Math.PI;
		//用弧度算出角度
		if (y < 0) {
			angle = -angle;
		} else if ((y == 0) && (x < 0)) {
			angle = 180;
		}
		//+-180是为了实现翻转保持文字在上面
		if (angle >= 90)
			angle = angle + 180;
		if (angle <= -90)
			angle = angle - 180;
		return angle;
	},
	/*************************************
	 **
	 ** overview 相关
	 **
	 *************************************/

	//初始化导航图的node
	inioverviewnode : function () {
		var ovlayer = d3.select("#overview");
		var nodelist = ovlayer.append("g")
			.attr("class", "ovnodelist");
		//创建node
		ovnode = nodelist.selectAll(".ovnode");
		ovnode = ovnode.data(nodedata);
		ovnode.enter().append("g")
		.attr("class", "ovnode")
		.attr("transform", function (d) {
			return "translate(" + d.nx + ", " + d.ny + ")"
		});

		//node 的图片
		ovnode.append("svg:image")
		.attr("x", -16)
		.attr("y", -16)
		.attr("width", 32)
		.attr("height", 32)
		.attr("xlink:href", function (d) {
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
			case 100:
				return "rwt-resources/topomap/Grouping_Blue.ico";
			default:
				return "rwt-resources/topomap/Other_Blue.ico";

			}
		});
		scaleFactor = 1; //overview缩放率
		defaultscaleFactor = 0.1; //默认overview缩放率.调整overview的line
		currentscale = 1; //topo缩放放大值
		//esvg = d3.select(".SvgMap");
		//w = esvg.attr("width");
		//h = esvg.attr("height");
		w = this.getMaxX();
		h = this.getMaxY();
		scaleFactor = Math.min(overvieww / w, overviewh / h)
			ovlayer.attr("transform", "scale(" + scaleFactor + ")");

	},
	//更新导航图的node
	updateoverviewnode : function () {
		//var ovnode1 = d3.select("#overview").selectAll(".ovnode").data(nodedata);
		ovnode = ovnode.data(nodedata);
		ovnode.attr("transform", function (d) {
			return "translate(" + d.nx + ", " + d.ny + ")"
		});
		var ovadd = ovnode.enter().append("g")
			.attr("class", "ovnode")
			.attr("transform", function (d) {
				return "translate(" + d.nx + ", " + d.ny + ")"
			});
		ovadd.append("svg:image")
		.attr("x", -16)
		.attr("y", -16)
		.attr("width", 32)
		.attr("height", 32)
		.attr("xlink:href", function (d) {
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
			case 100:
				return "rwt-resources/topomap/Grouping_Blue.ico";
			default:
				return "rwt-resources/topomap/Other_Blue.ico";

			}
		});
		ovnode.exit().remove();

	},
	//初始化导航link
	inioverviewlink : function () {
		var that = this;
		var ovlayer = d3.select("#overview");
		ovlink = ovlayer.append("g")
			.attr("class", "ovlink")
			.selectAll("line");
		ovlink = ovlink.data(linetextdata);
		ovlink.enter().append("line")
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style("stroke-width", "2")
		.style("Stroke", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;

		});
	},
	//更新导航link
	updateoverviewlink : function () {
		var that = this;
		var linw = Math.ceil(defaultscaleFactor / scaleFactor) * 2;
		//var ovlink1 = d3.select("#overview").selectAll("line").data(linetextdata);
		ovlink = ovlink.data(linetextdata);
		ovlink.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style("stroke-width", linw + "")
		.style("Stroke", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;

		});
		ovlink.enter().append("line")
		.attr("x1", function (d) {
			return d.source.nx;
		})
		.attr("y1", function (d) {
			return d.source.ny;
		})
		.attr("x2", function (d) {
			return d.target.nx;
		})
		.attr("y2", function (d) {
			return d.target.ny;
		})
		.style("stroke-width", "2")
		.style("Stroke", function (d) {
			var lincc = that.getlinkcolor(d);
			return lincc;

		});
		ovlink.exit().remove();
	},

	//初始化蒙版
	initrect : function () {
		this.setOverView();
		//最大值
		var maxx = this.getMaxX();
		var maxy = this.getMaxY();
		//组件宽 高
		var cwidth = this.getCompWidth();
		var cheight = this.getCompHeight();
		var drag = d3.behavior.drag()
			.origin(Object)
			.on("drag", dragmove);
		var ovlayer = d3.select("#overviewsvg");
		ovbrush = ovlayer.append("g")
			.attr("class", "brush")
			.data([{
						x : 0.0,
						y : 0.0,
						w : 170.0,
						h : 150.0
					}
				]);
		dragrect = ovbrush.append("rect")
			.attr("class", "extent")
			.attr("x", function (d) {
				return d.x;
			})
			.attr("y", function (d) {
				return d.y;
			})
			.attr("width", function (d) {
				return d.w;
			})
			.attr("height", function (d) {
				return d.h;
			})
			.attr("cursor", "move")
			.attr("stroke", "#fff")
			.call(drag);

		//拖动rect
		function dragmove(d) {
			dragrect
			.attr("x", d.x = Math.max(0, Math.min(overvieww - d.w, d3.event.x)))
			.attr("y", d.y = Math.max(0, Math.min(overviewh - d.h, d3.event.y)));

			//maindiv手动滚动
			movemain(d);

		}
		function movemain(d) {
			//相对移动距离
			var dwidth = overvieww - d.w;
			var dheight = overviewh - d.h;
			//(scrollWidth - cwidth) 移动的距离
			maindiv.scrollLeft = (maindiv.scrollWidth - cwidth) / dwidth * d.x;
			maindiv.scrollTop = (maindiv.scrollHeight - cheight) / dheight * d.y;
		}

	},

	/*
	 * 调整导航的位置
	 */
	setOverView : function () {
		var cwidth = this.getCompWidth();
		var cheight = this.getCompHeight();
		maindiv.style.width = cwidth + "px";
		maindiv.style.height = cheight + "px";
		var ovpdivleft = cwidth - overvieww - 20; //导航left
		var ovpdivtop = cheight - overviewh - 20; //导航top
		overviewparentdiv = document.getElementById("overviewparent");
		overviewparentdiv.style.width = overvieww + "px";
		overviewparentdiv.style.height = overviewh + "px";
		overviewparentdiv.style.left = ovpdivleft + "px";
		overviewparentdiv.style.top = ovpdivtop + "px";
	},

	/*************************************
	 **end overview
	 **
	 **************************************/
	_removeElements : function (selection) {
		selection
		.transition()
		.duration(400)
		.attr("opacity", 0.0)
		.remove();
	},

	/**
	保存拓扑图相关数据
	tag 保存的数据的标示
	data 要保存的数据
	 */
	_savedata : function (index, data) {
		var remoteObject = rap.getRemoteObject(this);
		remoteObject.notify("Selection", {
			"index" : index,
			"data" : data
		});
	},

	/**
	 * 菜单选择事件
	 */
	_selectItem : function (index) {

		var remoteObject = rap.getRemoteObject(this);
		remoteObject.notify("Selection", {
			"index" : index,
			"data" : ""
		});
	}

};

// TYPE HANDLER

rap.registerTypeHandler("topomap.TopoMap", {

	factory : function (properties) {
		var parent = rap.getObject(properties.parent);
		return new topomap.TopoMap(parent);
	},

	destructor : "destroy",

	properties : ["nodetooltipdesc", "grouptooltipdesc", "linktooltipdesc", "refreshdata",
		"layoutdata", "linkmenudesc", "menudesc", "groupmenudesc", "nodemenudesc", "tooltipdata",
		"maxX", "maxY", "compWidth", "compHeight", "overviewWidth", "submenudesc",
		"overviewHeight", "nodeDisplayType", "linkDisplayType",
		"topy", "leftx", "cleardata", "render", "newlinedata", "newgroup",
		"newdevice", "subchartdata"],

	events : ["Selection"]

});
