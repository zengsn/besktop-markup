/** 
  * 应用程序面板， - 类似于手机或平台上面的应用程序快捷面板。
  * @class BT.core.SystemButton 
  * @since 4.0
  */
  
Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 应用程序窗口                                                       *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.ApplicationWindow = function(config) {
	// Local variable
	thisWindow = this;
	// Avoid null
	config = config || {};
	// 取配置
	this.taskbar = config.taskbar;
	config = Ext.applyIf(config, {
		width: 400,
		height: 200,
		x: 0, // 居左
		y: 45, // 任务栏下方，需要计算距离
		title: '应用程序',
		//headerPosition: 'left',
		closable: true,
		//floating: true,
		closeAction: 'hide',
		items: new Ext.Panel({
			html: 'aa'
		})
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.ApplicationWindow.superclass.constructor.apply(this, arguments);
};
Ext.extend(BT.core.ApplicationWindow, Ext.Window, {
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	// 添加启动器
	add: function(launcher) {
	}
});
Ext.reg('btapplicationwindow', BT.core.ApplicationWindow);

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * Panel + Buttons = 类似于 Examples 风格                             *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.ApplicationPanel = function(config) {
	// Local variable
	thisPanel = this;
	// Avoid null
	config = config || {};
	// 取配置
	config = Ext.applyIf(config, {
		id: 'bt-application-panel',
		bodyStyle: 'background: #fff',
		items: new Ext.menu.Menu({
			items: [{
                text: 'Radio Options',
                menu: {        // <-- submenu by nested config object
                    items: [
                        // stick any markup in a menu
                        '<b class="menu-title">Choose a Theme</b>',
                        {
                            text: 'Aero Glass',
                            checked: true,
                            group: 'theme'
                        }, {
                            text: 'Vista Black',
                            checked: false,
                            group: 'theme'
                        }, {
                            text: 'Gray Theme',
                            checked: false,
                            group: 'theme'
                        }, {
                            text: 'Default Theme',
                            checked: false,
                            group: 'theme'
                        }
                    ]
                }
            }]
		})
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.ApplicationPanel.superclass.constructor.apply(this, arguments);
};
Ext.extend(BT.core.ApplicationPanel, Ext.Panel, {	
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	func: function() {
	}
});
Ext.reg('btapplicationpanel', BT.core.ApplicationPanel);





