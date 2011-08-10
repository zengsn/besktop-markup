/**
  * 应用程序启动器-按钮。
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 任务栏                                                             *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

BT.core.Launcher = function(config) {
	// Local variable
	thisLauncher = this;
	// Avoid null
	config = config || {};
	// 取配置
	this.category = config.category;
	// 应用程序面板
	config = Ext.applyIf(config, {
		//xtype: 'button',
		enableToggle: true,
		toggleHandler: function(btn, pressed){
			//if(pressed) appWindow.show(btn.el);
			//else appWindow.hide(btn.el);
		}
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.Launcher.superclass.constructor.apply(this, arguments);
	
};
Ext.extend(BT.core.Launcher, Ext.Button, {	
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	func: function() {
	}
});
Ext.reg('btlauncher', BT.core.Launcher);