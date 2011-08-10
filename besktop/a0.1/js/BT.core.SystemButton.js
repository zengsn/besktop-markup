/** 
  * ϵͳ��ť�������� Windows �Ŀ�ʼ��ť��
  * @class BT.core.SystemButton 
  * @since 4.0
  */
  
Ext.namespace("BT.core");
Ext.require('Ext.button.Button');

Ext.define('BT.core.SystemButton', {
	// ~ ����ѡ�� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
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

	// ~ ��Ա���� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//name: 'System',
	/** BT.core.ApplicationWindow*/
	applicatonWindow: null,
	appWin: applicatonWindow,
	
	// ~ �̳и��� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	extend: 'Ext.button.Button',
	
	// ~ Mixins - Ƕ�������� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	mixins: {
		otherClass: 'OtherClass'
	},
	useMixins: function() {
		this.mixins.otherClass.doSomething.call(this);
	},

	// ~ ��̬���� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	statics: {
		factory: function(brand) {
			// 'this' in static methods refer to the class itself
			return new this(brand);
		}
	},

	// ~ ���캯�� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor: function(appWin) {
		// ��ֵ
		setApplicationWindown(appWin);
		// ���ø��๹�캯��
		this.callParent([appWin]);
		// ����
		return this;
	},
	
	// ~ ��Ա���� ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	setApplicationWindown: function(appWin) {
		this.appWin = this.applicatonWindow = appWin;
	},
	doToggle: function(btn, pressed) {
		if (!(this.appWin)) alert('Please wait!');
		if (pressed) { //������ʾӦ���б�
			this.appWin.show(btn);
		} else { //����ʱ����
			this.appWin.hide(btn);
		}
	}
});