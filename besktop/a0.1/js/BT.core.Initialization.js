/**
BT.core.Initialization = {};
BT.core.Initialization.WEBWARE_ARRAY = new Array();
BT.core.Initialization.ADD_WEBWARE = function(webware) {
	return BT.core.Initialization.WEBWARE_ARRAY.push(webware);
};
BT.core.Initialization.GET_WEBWARES = function() {
	return BT.core.Initialization.WEBWARE_ARRAY;
};