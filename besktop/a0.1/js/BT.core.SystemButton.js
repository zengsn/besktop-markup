/** 
  * 系统按钮，类似于 Windows 的开始按钮。
  * @class BT.core.SystemButton 
  * @since 4.0
  */
  
Ext.namespace("BT.core");
Ext.require('Ext.button.Button');

Ext.define('BT.core.SystemButton', {
	// ~ 配置选项 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	config: {
		text: 'SITE NAME',
		iconCls: 'bt-system-button',
		scale: 'large',
		iconAlign: 'left',
		enableToggle: true,
		listeners: {
			'toggle': this.doToggle 
		}
	},

	// ~ 成员变量 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//name: 'System',
	/** BT.core.ApplicationWindow*/
	applicatonWindow: null,
	appWin: applicatonWindow,
	
	// ~ 继承父类 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	extend: 'Ext.button.Button',
	
	// ~ Mixins - 嵌入其他类 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	mixins: {
		otherClass: 'OtherClass'
	},
	useMixins: function() {
		this.mixins.otherClass.doSomething.call(this);
	},

	// ~ 静态方法 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	statics: {
		factory: function(brand) {
			// 'this' in static methods refer to the class itself
			return new this(brand);
		}
	},

	// ~ 构造函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor: function(appWin) {
		// 赋值
		setApplicationWindown(appWin);
		// 调用父类构造函数
		this.callParent([appWin]);
		// 返回
		return this;
	},
	
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	setApplicationWindown: function(appWin) {
		this.appWin = this.applicatonWindow = appWin;
	},
	doToggle: function(btn, pressed) {
		if (!(this.appWin)) alert('Please wait!');
		if (pressed) { //按下显示应用列表
			this.appWin.show(btn);
		} else { //弹起时隐藏
			this.appWin.hide(btn);
		}
	}
});