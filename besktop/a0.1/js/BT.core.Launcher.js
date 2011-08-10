/**
  * Ӧ�ó���������-��ť��
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * ������                                                             *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

BT.core.Launcher = function(config) {
	// Local variable
	thisLauncher = this;
	// Avoid null
	config = config || {};
	// ȡ����
	this.category = config.category;
	// Ӧ�ó������
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
	// ~ ��Ա���� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	func: function() {
	}
});
Ext.reg('btlauncher', BT.core.Launcher);