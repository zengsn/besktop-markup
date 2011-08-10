/**
  * 桌面 。
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 应用程序窗口                                                       *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.DesktopViewport = function(config) {
	// Local variable
	thisView = this;
	// Avoid null
	config = config || {};
	// 取配置
	this.system = config.system;
	this.position = 'bottom';
	this.buttonStyle = 'icononly';
	this.taskbar = new BT.core.TaskBarPanel({
		system: this.system,
		region: BT.core.Initialization.CONFIG.taskbarPos
	});
    this.windows = new Ext.WindowGroup();
    this.activeWindow;
	this.shortcuts = [];
	this.widgets = [];
	
	config = Ext.applyIf(config, {
		id: 'desktop-viewport',
		layout: 'border',
		defaults: {
			border: true
		},
		margins: '5 5 5 5',
		items: [this.taskbar,{
			id: 'desktop-canvas',
			xtype: 'panel',
			region: 'center',
			border: false,
			frame: false,
			bodyCssClass: 'bt-desktop-body',
			bbar: [
				'<span id="bt-desktop-status">桌面正常启动。</span>', '->', '-', {
				id: 'bt-desktop-message-btn',
				iconCls: 'bt-desktop-message-icon',
				handler: function(btn) {
					if (thisView.messageWin) {
						thisView.showMessage(thisView.lastMessage);
					}
				}
			}],
			contentEl: 'canvas'
		}]
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.DesktopViewport.superclass.constructor.apply(this, arguments);
};
Ext.extend(BT.core.DesktopViewport, Ext.Viewport, {
	
    minimizeWin : function(win){
        win.minimized = true;
        win.hide();
    },
	
	messageBeforeShow : function(win) {
		win.taskbar.system.desktop.showMessage({
			title: '打开',
			messageIcon: win.iconCls+'-large',
			message: win.title+' ...'
		});
		win.taskbar.system.desktop.markActive(win);
	},

    markActive : function(win){
        if(this.activeWindow && this.activeWindow != win){
            this.markInactive(this.activeWindow);
        } 
        this.taskbar.setActiveButton(win.taskButton);
        this.activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('x-btn-menu-active');
        win.minimized = false;
    },

    markInactive : function(win){
        if(win == this.activeWindow){
            this.activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('x-btn-menu-active');
        }
    },

    removeWin : function(win){
    	this.taskbar.removeTaskButton(win.taskButton);
    },

	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
    createWindow : function(config, cls){
    	var win = new (cls||Ext.Window)(
            Ext.applyIf(config||{}, {
                manager: this.windows,
                minimizable: true,
                maximizable: true
            })
        );
		win.title = config.title;
        win.render(Ext.get('desktop-canvas'));
		win.taskbar = this.taskbar;
        win.taskButton = this.taskbar.addTaskButton(win);
		var pos = this.getWinPosition(win.taskButton, win);
		win.setPagePosition(pos[0], pos[1]);
        win.cmenu = new Ext.menu.Menu({
            items: [
            ]
        });
        win.animateTarget = win.taskButton.el;
        win.on({
        	'activate': {
        		fn: this.markActive
        	},
        	'beforeshow': {
        		fn: this.messageBeforeShow
        	},
        	'deactivate': {
        		fn: this.markInactive
        	},
        	'minimize': {
        		fn: this.minimizeWin
        	},
        	'close': {
        		fn: this.removeWin
        	}
        });
        return win;
    },
	
	getWinPosition : function(tbtn, win) {
		if (!(this.lastLeft) || !(this.lastTop)) {
			this.lastLeft = tbtn.el.getLeft();
			this.lastTop = tbtn.el.getTop()+50;
		} else {
			this.lastLeft += 50;
			this.lastTop += 50;
		}		
		return [this.lastLeft, this.lastTop]
	},
	
	updateStatus : function(msg) {
		if (msg) Ext.get('bt-desktop-status').dom.innerHTML = msg;
		else Ext.get('bt-desktop-status').dom.innerHTML = '桌面正常启动。';
	},
	
	showMessage : function(config) {
		config = config || {};
		var title = config.title || '系统提示';
		var message = config.message || '无法获取消息';
		var iconCls = config.iconCls || 'bt-desktop-message-icon';
		var messageIcon = config.messageIcon || 'bt-desktop-message-icon-large';
		var win = this.messageWin;
		if (!win) {
			win = new Ext.Window(
				Ext.applyIf(config||{}, {
					title: title,
					width:200,
					height:100,
					layout: 'border',
					iconCls: iconCls,
					shim:false,
					applyTo: 'bt-message-ct',
					constrainHeader:true,
					animCollapse:true,
					minimizable: false,
					maximizable: false,
					closable: true,
					closeAction: 'hide',
					defaults: {border:false},
					items: [{
						region: 'west',
						width: 40,
						bodyStyle: 'padding-top:5px;',
						html: '<div id="bt-desktop-message-icon" class="'+messageIcon+'">&nbsp;</div>'
					}, {
						region: 'center',
						bodyStyle: 'padding-top:5px;',
						html: '<div id="bt-desktop-message-text">'+message+'</div>'
					}]
				})
			);
			this.messageWin = win;
			this.lastMessage = config;
		} else {
			win.setTitle(title, iconCls);
			//win.setIconClass(iconCls);
			var iconEl = Ext.get('bt-desktop-message-icon');
			iconEl.replaceClass(iconEl.getAttribute('class'), messageIcon);
			Ext.get('bt-desktop-message-text').update(message);
		}
		//win.animateTarget = Ext.getCmp('bt-desktop-message-btn').el;
		//win.show(Ext.getCmp('bt-desktop-message-btn').el, function() {
			//win.setPagePosition(Ext.lib.Dom.getViewWidth()-160, Ext.lib.Dom.getViewHeight()-100-48);
		//});
		win.setPagePosition(Ext.lib.Dom.getViewWidth()-200, Ext.lib.Dom.getViewHeight()-100-Ext.getCmp('desktop-canvas').getBottomToolbar().getHeight());
		win.el.slideIn('b', {
			easing: 'easeOut',
			duration: .5
		});
		setTimeout(function() {
			win.el.slideOut('b', {
				easing: 'easeOut',
				duration: .5,
				remove: false,
				useDisplay: false
			});
		}, 5*1000);
	},

    getManager : function(){
        return this.windows;
    },

    getWindow : function(id){
        return this.windows.get(id);
    },   

    getWinWidth : function(){
		var width = Ext.lib.Dom.getViewWidth();
		return width < 200 ? 200 : width;
	},	

	getWinHeight : function(){
		var height = (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight());
		return height < 100 ? 100 : height;
	},		

	getWinX : function(width){
		return (Ext.lib.Dom.getViewWidth() - width) / 2;
	},		

	getWinY : function(height){
		return (Ext.lib.Dom.getViewHeight()-taskbarEl.getHeight() - height) / 2;
	}

});
Ext.reg('btdesktopviewport', BT.core.DesktopViewport);

Ext.onReady(function() {
	// test
	//var dt = new BT.core.Desktop();
});


