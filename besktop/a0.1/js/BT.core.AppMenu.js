/**
  * 应用程序菜单。
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 应用程序菜单                                                       *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.AppMenu = function(config) {
	thisMenu = this;
	config = config || {};
	config = Ext.applyIf(config, {
		cls: 'bt-menu',
		items: [{
			xtype: 'textfield',
			label: '搜索'
		}, '-', '-', {
			iconCls: 'bt-close',
			text: '退出'
		}]
	});
	Ext.apply(this, config);
	BT.core.AppMenu.superclass.constructor.apply(this, arguments);
};
Ext.extend(BT.core.AppMenu, Ext.menu.Menu, {
	addLauncher: function(launcher) {
		this.insert(this.items.getCount()-2, launcher);
	}
});
Ext.reg('btappmenu', BT.core.AppMenu);