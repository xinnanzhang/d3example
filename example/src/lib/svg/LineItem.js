/********************************************
 *date: 2014/5/22
 *auther: bin.liu
 * line and node
 *Lineitem
 ********************************************/
topomap.LineItem = function (parent) {
	this._parent = parent;
	this._lid  = "";//线标示 nodeid:portid
	this._lsource = ""; //line 的source
	this._ltarget = ""; //line 的target
	this._sinterface = "";//source interface
	this._tinterface = "";//target interface
	this._sdesc="";
	this._tdesc="";
	this._alias="";
	this._flow = 0.0; //流量
	this._inflow = 0.0;
	this._speed = 100.0;
	this._outflow = 0.0;
	this._pkts = 0.0;//帧流量
	this._broadcast = 0.0;//广播
	this._bwusage = 0.0;//带宽占用比
	this._avgframeLen = 0.0;//平均帧长度
	this._error = 0.0; // 错误阀值
	this._warn = 0.0;  // 危险阀值
	this._pktserror = 0.0;
	this._pktswarn = 0.0;
	this._broadcasterror = 0.0;
	this._broadcastwarn = 0.0;
	this._bwusagerror =0.0;
	this._bwusagewarn =0.0;
	this._selfalert = 0;
	this._portstate =1;
	this._parent.addLine(this);
};

topomap.LineItem.prototype = {
	
	getParent : function () {
		return this._parent;
	},
	getLid : function () {
		return this._lid;
	},
	setLid : function (lid) {
		this._lid = lid;
	},
	getLsource : function () {
		return this._lsource;
	},
	setLsource : function (lsource) {
		this._lsource = lsource;
	},
	getLtarget : function () {
		return this._ltarget;
	},
	setLtarget : function (ltarget) {
		this._ltarget = ltarget;
	},
	getSinterface : function () {
		return this._sinterface;
	},
	setSinterface : function (sinterface) {
		this._sinterface = sinterface;
	},
	
	getAlias : function () {
		return this._alias;
	},
	setAlias : function (alias) {
		this._alias = alias;
	},
	getSelfalert : function () {
		return this._selfalert;
	},
	setSelfalert : function (selfalert) {
		this._selfalert = selfalert;
	},
	getPortstate : function () {
		return this._portstate;
	},
	setPortstate : function (portstate) {
		this._portstate = portstate;
	},
	getSdesc : function () {
		return this._sdesc;
	},
	setSdesc : function (sdesc) {
		this._sdesc = sdesc;
	},
	getTdesc : function () {
		return this._tdesc;
	},
	setTdesc : function (tdesc) {
		this._tdesc = tdesc;
	},
	getTinterface : function () {
		return this._tinterface;
	},
	setTinterface : function (tinterface) {
		this._tinterface = tinterface;
	},
	getFlow : function () {
		return this._flow;
	},
	setFlow : function (flow) {
		this._flow = flow;
	},
	getInflow : function () {
		return this._inflow;
	},
	setInflow : function (inflow) {
		this._inflow = inflow;
	},
	getSpeed : function () {
		return this._speed;
	},
	setSpeed : function (speed) {
		this._speed = speed;
	},
	getOutflow : function () {
		return this._outflow;
	},
	setOutflow : function (outflow) {
		this._outflow = outflow;
	},
	getPkts : function () {
		return this._pkts;
	},
	setPkts : function (pkts) {
		this._pkts = pkts;
	},
	getBroadcast : function () {
		return this._broadcast;
	},
	setBroadcast : function (broadcast) {
		this._broadcast = broadcast;
	},
	getBwusage : function () {
		return this._bwusage;
	},
	setBwusage : function (bwusage) {
		this._bwusage = bwusage;
	},
	getAvgframeLen : function () {
		return this._avgframeLen;
	},
	setAvgframeLen : function (avgframeLen) {
		this._avgframeLen = avgframeLen;
	},
	getError : function () {
		return this._error;
	},
	setError : function (error) {
		this._error = error;
	},
	getPktserror : function () {
		return this._pktserror;
	},
	setPktserror : function (pktserror) {
		this._pktserror = pktserror;
	},
	getBroadcasterror : function () {
		return this._broadcasterror;
	},
	setBroadcasterror : function (broadcasterror) {
		this._broadcasterror = broadcasterror;
	},
	getBwusagerror : function () {
		return this._bwusagerror;
	},
	setBwusagerror : function (bwusagerror) {
		this._bwusagerror = bwusagerror;
	},
	getWarn : function () {
		return this._warn;
	},
	setWarn : function (warn) {
		this._warn = warn;
	},
	getPktswarn : function () {
		return this._pktswarn;
	},
	setPktswarn : function (pktswarn) {
		this._pktswarn = pktswarn;
	},
	getBroadcastwarn : function () {
		return this._broadcastwarn;
	},
	setBroadcastwarn : function (broadcastwarn) {
		this._broadcastwarn = broadcastwarn;
	},
	getBwusagewarn : function () {
		return this._bwusagewarn;
	},
	setBwusagewarn : function (bwusagewarn) {
		this._bwusagewarn = bwusagewarn;
	},
	id : function () {
		return this._rwtId;
	},
	
	destroy : function () {
		this._parent.removeItem(this);
	}
	
};

// TYPE HANDLER

rap.registerTypeHandler("topomap.LineItem", {
	
	factory : function (properties) {
		var parent = rap.getObject(properties.parent);
		return new topomap.LineItem(parent);
	},
	destructor : "destroy",
	properties : [ "lid","lsource", "ltarget","sdesc","tdesc","sinterface","tinterface",
	              "flow","inflow","speed","outflow","pkts","broadcast","bwusage","avgframeLen",
				  "error","warn","alias","pktserror","pktswarn","broadcasterror","broadcastwarn","bwusagerror","bwusagewarn","selfalert","portstate"]
	
});
