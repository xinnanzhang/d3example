/*******************************************
 *date: 2014/5/22
 *auther: bin.liu
 *base interface
 ********************************************/

topomap = {};
topomap.BaseMap = function (parent, renderer) {
	this._renderer = renderer;
	this._element = this.createElement(parent);
	//this.createCanvas(parent);//save image try
	this.createOverview(parent);
	this.createMainMenu(parent);
	this.createSubMenu(parent);
	this.createGroupMenu(parent);
	this.createMenu(parent);
	this.createlinkMenu(parent);
	this._svg = d3.select(this._element).append("svg").attr("class", "SvgMap")
		.attr("xmlns", "http://www.w3.org/2000/svg");
		//.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));
		//������������ϵ�ı仯�����ò�Ҫ��
	function zoom() {
	           // alert(d3.event.translate);
	           // alert(d3.event.scale);
				d3.select(".layer").attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}
	//������ͷ
	this._svg.append('svg:defs').append('svg:marker')
	.attr('id', 'end-arrow')
	.attr('viewBox', '0 -5 10 10')
	.attr('refX', 6)
	.attr('markerWidth', 6)
	.attr('markerHeight', 6)
	.attr('orient', 'auto')
	.append('svg:path')
	.attr('d', 'M0,-5L10,0L0,5')
	.attr('fill', '#000');
	this._needsLayout = true;
	this._needsRender = true;
	var that = this;
	rap.on("render", function () {
		if (that._needsRender) {
			if (that._needsLayout) {
				that._renderer.initialize(that);
				that._needsLayout = false;
			}
			that._renderer.render(that);
			that._needsRender = false;
		}
	});
	parent.addListener("Resize", function () {
		that._resize(parent.getClientArea());
	});
	this._resize(parent.getClientArea());
};

topomap.BaseMap.prototype = {

	//������div
	createElement : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "maindiv");
		element.style.position = "absolute";
		element.style.left = "0";
		element.style.top = "0";
		//element.style.width = "1000px";
		//element.style.height = "800px";
		element.style.overflow = "auto";
		//element.style.background = "#ffffff";
		//element.style.backgroundImage ="url(rwt-resources/topomap/topobg.png)";
		element.style.background = "url(rwt-resources/topomap/topobg.png)";
		//element.style.background-repeat = "repeat";

		parent.append(element);
		return element;
	},
	//�������˵�
	createMainMenu : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "Mainmenu");
		element.setAttribute("class", "menu");
		element.style.display = "none";
		parent.append(element);
	},
	//node �Ĳ˵�
	createMenu : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "mymenu");
		element.setAttribute("class", "menu");
		element.style.display = "none";
		element.style.zIndex = "1000";
		parent.append(element);

	},
	//��ͼnode�Ĳ˵�
	createSubMenu : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "submenu");
		element.setAttribute("class", "menu");
		element.style.display = "none";
		parent.append(element);

	},
	//��ͼgroup�Ĳ˵�
	createGroupMenu : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "groupmenu");
		element.setAttribute("class", "menu");
		element.style.display = "none";
		parent.append(element);

	},
	//link�Ĳ˵�
	createlinkMenu : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "linkmenu");
		element.setAttribute("class", "menu");
		element.style.display = "none";
		parent.append(element);

	},
	//����ͼ
	createOverview : function (parent) {
		var element = document.createElement("div");
		element.setAttribute("id", "overviewparent");
		element.setAttribute("class", "overviewparent");
		element.style.position = "absolute";
		//element.style.left = "780px";
		//element.style.top = "580px";
		//element.style.width = "200px";
		//element.style.height = "200px";
		element.style.display = "inline-block";
		element.style.background = "url(rwt-resources/topomap/topobg.png)";
		parent.append(element);

		var svg1 = d3.select(element).append("svg").attr("class", "overviewsvg")
			.attr("id", "overviewsvg")
			.attr("width","200")
			.attr("height","200")
			.attr("xmlns", "http://www.w3.org/2000/svg");
		svg1.append("g")
		.attr("class", "overview")
		.attr("id", "overview");
	},
	//����ͼ û��ʹ��
	createCanvas : function (parent) {
		d3.select("body").append("canvas")
		.attr("id", "canvas1")
		//.attr("width","1000")
		//.attr("height","1000")
		.style("display", "none"); ;
	},

	getLayer : function (name) {
		var layer = this._svg.select("g." + name);

		if (layer.empty()) {
			this._svg.append("svg:g").
			attr("class", name)
			;
			layer = this._svg.select("g." + name);

		}

		return layer;
	},
	//����svg�Ŀ���
	_resize : function (clientArea) {
		//this._svg.attr("width", clientArea[2]).attr("height", clientArea[3]);
		this._svg.attr("width", "2700").attr("height", "2200");
		this._element.style.width = clientArea[2]+"px";
		this._element.style.height = clientArea[3]+"px";
		this._scheduleUpdate(true);
	},

	//���²���
	_scheduleUpdate : function (needsLayout) {
		if (needsLayout) {
			this._needsLayout = true;
		}
		//this._needsRender = true;
	},

	destroy : function () {
		var element = this._element;
		if (element.parentNode) {
			element.parentNode.removeChild(element);
		}
	}

};
