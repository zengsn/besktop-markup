/**
  * 任务栏。
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 任务栏                                                             *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.TaskBarPanel = function(config) {
	// Local variable
	thisPanel = this;
	this.id = 'bt-taskbar';
	// Avoid null
	config = config || {};
	// 取配置
	this.system = config.system;
	// 应用程序菜单
	this.appMenu = new BT.core.AppMenu();
	var appMenu = this.appMenu;
	// 任务按钮工具条
	//this.taskToolbar = new BT.core.TaskToolbar({
	//	taskbar: thisPanel
	//});
	config = Ext.applyIf(config, {
		id: 'bt-taskbar',
		//xtype: 'panel',
		region: 'north',
		height: 44,
		maxHeight: 44,
		minHeight: 44,
		border: false,
		//split: true,
		layout: 'border',
		items: [{
			id: 'systoolbar',
			xtype: 'toolbar',
			region: 'west',
			width: 82,
			maxWidth: 82,
			minWidth: 82,
			border: false,
			split: false,
			items: [{
				taskbar: thisPanel,
				appMenu: this.appMenu,
				xtype: 'btsystembutton',
				reorderable: false
			}, '-']
		}, {
			id: 'tasktoolbar',
			xtype: 'toolbar',
			region: 'center',
			border: false,
			split: false,
			//plugins : [
			//	new Ext.ux.ToolbarReorderer({
			//		defaultReorderable: true
			//	})
			//],
			listeners: {
				'reordered' : function(btn, toolbar) {
					//toolbar.reordered = btn;
				}
			},
			items: [/*, '->', {
				scale: 'large',
				tooltip: '设置主题',
				iconCls: 'bt-theme-button'
			}*/]
		}]
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.TaskBarPanel.superclass.constructor.apply(this, arguments);
	
};
Ext.extend(BT.core.TaskBarPanel, Ext.Panel, {	
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~	
	getTaskToolbar : function() {
		return this.items.item('tasktoolbar');
	},
    addTaskButton : function(win){		
		var btn = new BT.core.TaskButton({
			window: win,
			tbindex: this.getTaskToolbar().items.length
		});
        this.getTaskToolbar().addButton(btn);
		this.getTaskToolbar().doLayout();
		return btn;
    },
    removeTaskButton : function(btn){
        this.getTaskToolbar().remove(btn);
    },
    setActiveButton : function(btn){
        this.activeButton = btn;
    }
});
Ext.reg('bttaskbarpanel', BT.core.TaskBarPanel);

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 系统按钮                                                           *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.SystemButton = function(config) {
	thisButton = this;
	config = config || {};
	// 取配置
	this.taskbar = config.taskbar;
	var taskbar = this.taskbar;
	this.appMenu = config.appMenu;
	var appMenu = this.appMenu;
	config = Ext.applyIf(config, {
		text: '应用',
		scale: 'large',
		iconCls: 'bt-start-button',
		iconAlign: 'left',
		clickEvent: 'mousedown',
		/*
		toggled: true,
		enableToggle: true,
		toggleHandler: function(btn, pressed){
			if(pressed) appWindow.show(btn.el);
			else appWindow.hide(btn.el);
		}*/
		listeners: {
			'mouseover' : function(btn, e) {
				btn.taskbar.system.desktop.updateStatus('单击查看所有'+btn.getText()+'。');
			},
			'mouseout' : function(btn, e) {
				btn.taskbar.system.desktop.updateStatus();
			}
		},
		menuAlign: BT.core.Initialization.CONFIG.appMenuAlign,
		menu: appMenu
	});
	Ext.apply(this, config);
	
    // Constructor
	BT.core.SystemButton.superclass.constructor.apply(this, arguments);

};
Ext.extend(BT.core.SystemButton, Ext.Button, {
});
Ext.reg('btsystembutton', BT.core.SystemButton);

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * 任务栏按钮                                                         *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.TaskButton = function(config) {
	thisButton = this;
	config = config || {};
	// 取配置
	this.window = config.window;
	var win = this.window;
	this.window.taskButton = this;
	config = Ext.applyIf(config, {
        //text: Ext.util.Format.ellipsis(win.title, 12),
		text: win.title,
		scale: 'large',
        iconCls: win.iconCls+'-large',
		//clickEvent:'mousedown',
        listeners : {
			'click': function(btn){
				if(win.minimized || win.hidden){
					win.show();
				} else if(win == win.manager.getActive()){
					win.minimize();
				} else{
					win.toFront();
				}
			}, 
			'mouseover' : function(btn, e) {
				btn.window.taskbar.system.desktop.updateStatus('单击打开：'+btn.getText());
			},
			'mouseout' : function(btn, e) {
				btn.window.taskbar.system.desktop.updateStatus();
			}
        }        
	});
	Ext.apply(this, config);	
    // Constructor
	BT.core.TaskButton.superclass.constructor.apply(this, arguments);

};
Ext.extend(BT.core.TaskButton, Ext.Button, {
    onRender : function(){
		var thisButton = this;
        BT.core.TaskButton.superclass.onRender.apply(this, arguments);
        this.cmenu = new Ext.menu.Menu({			
			defaultAlign: 'tl-bl',
            items: [{
                text: '还原',
                iconCls: 'x-tool x-tool-restore',
                handler: function(){
                    if(!this.window.isVisible()){
                        this.window.show();
                    }else{
                        this.window.restore();
                    }
                },
                scope: this
            },{
                text: '最小化',
                iconCls: 'x-tool x-tool-minimize',
                handler: this.window.minimize,
                scope: this.window
            },{
                text: '最大化',
                iconCls: 'x-tool x-tool-maximize',
                handler: this.window.maximize,
                scope: this.window
            }, '-', {
                text: '关闭',
                iconCls: 'x-tool x-tool-close',
                handler: this.closeWin.createDelegate(this, this.window, true),
                scope: this.window
            }]
        });

        this.cmenu.on('beforeshow', function(){
            var items = this.cmenu.items.items;
            var w = this.window;
            items[0].setDisabled(w.maximized !== true && w.hidden !== true);
            items[1].setDisabled(w.minimized === true);
            items[2].setDisabled(w.maximized === true || w.hidden === true);
        }, this);

        this.el.on('contextmenu', function(e){
            e.stopEvent();
            if(!this.cmenu.el){
                this.cmenu.render();
            }
            //var xy = e.getXY();
			var xy = thisButton.el.getXY();
            //xy[1] = this.cmenu.el.getHeight()-xy[1];
			xy[1] = xy[1]*2 + thisButton.el.getHeight();
            this.cmenu.showAt(xy);
        }, this);
		
		//记录移动前位置
		this.beforeReordered = this.el.getXY()[0];
    },

    closeWin : function(cMenu, e, win){
        if(!win.isVisible()){
            win.show();
        }else{
            win.restore();
        }
        win.close();
    }
});
Ext.reg('bttaskbutton', BT.core.TaskButton);

Ext.onReady(function() {
	// test
	//var tb = new BT.core.TaskBar();
	//tb.render(Ext.getBody());
});


