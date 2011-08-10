// Boot webtop

WebtopBooter = new BT.core.System({
	init :function(){
		Ext.QuickTips.init();
	},

	getWebwares : function(){
		return BT.core.Initialization.WEBWARE_ARRAY; // see Initialization.js
	},

    // config for the start menu
    getStartConfig : function(){
    }
});