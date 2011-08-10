/**
  * 桌面系统类。
  * @since 4.0
  * @author http://zsn.cc
  */

Ext.namespace("BT.core");

/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *
  * WEBTOP SYSTEM                                                      *
  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
BT.core.System = function(config) {
    Ext.apply(this, config);
    this.addEvents({
        'ready' : true,
        'beforeunload' : true
    });
    Ext.onReady(this.initSystem, this);
};
Ext.extend(BT.core.System, Ext.util.Observable, {
	// ~ 配置选项 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
	position: 'bottom',
	buttonStyle: 'icononly',
	isReady: false,
    launcher: null,
    webwares: null,

	// ~ 构造函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	constructor: function(config) {
		Ext.onReady(this.initSystem, this);
		// 返回
		return this;
	},
	
	// ~ 成员函数 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	getStartConfig : function(){
	},
	initSystem: function() {
	  	//this.startConfig = this.startConfig || this.getStartConfig();
		//try {
			this.desktop = new BT.core.DesktopViewport({system:this});
		//} catch (e) {
			//alert('Desktop Error: \n'+e);
		//}
		this.launcher = this.desktop.taskbar.appMenu;
		this.webwares = this.getWebwares();
		if(this.webwares){
			this.initWebwares(this.webwares);
		}
		this.initShortcuts();
		this.initWidgets();
		this.init();
		Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
		this.fireEvent('ready', this);
		this.isReady = true;
	},
	getWebwares : Ext.emptyFn,
	init : Ext.emptyFn,
	initWebwares : function(webwares){
		for(var i = 0, len = webwares.length; i < len; i++){
		  var webware = webwares[i];
			Ext.apply(webware.launcher, {
				//itemCls: 'x-menu-item bt-menu-item',
				//overCls: 'bt-menu-item-over',
				//iconCls: 'bt-menu-item-icon bt-default-32'
				/*
				listeners: {
					'mouseover' : function(menu, e, item) {
						webware.system.desktop.updateStatus('单击打开：'+item.getText()+'。');
					},
					'mouseout' : function(menu, e, item) {
						webware.system.desktop.updateStatus();
					}
				}*/
			});
			this.launcher.addLauncher(webware.launcher);
			webware.system = this;
		}
	},    
	initShortcuts: function() {
		var thisSystem = this;
		var shortcutsEl = Ext.get('bt-desktop-shortcuts');
		if (shortcutsEl) {
			var shortcuts = shortcutsEl.select('div');
			if (shortcuts) {
				shortcuts.each(function(el, c, index) {
					var id = el.getAttribute('id');
					var text = 'Unknown';
					var clazz = el.getAttribute('class');
					el.removeClass(clazz);
					var child = el.query('a:first');
					if (child && child.length > 0) {
						text = child[0].innerHTML;
						Ext.fly(child[0]).hide();
					}
					(new Ext.Button({
						text: text,
						scale: 'large',
						iconCls: clazz || id+'-icon',
						iconAlign: 'top',
						width: 64,
						listeners: {
							'click' : function(btn, e) {
								var winId = id.replace('-shortcut', '')+'-win';
								var webware = thisSystem.getWebware(winId)
								if (webware) webware.createWindow({
									window: winId,
									title: text
								});
							}, 
							'mouseover' : function(btn, e) {
								thisSystem.desktop.updateStatus('单击打开：'+text);
							},
							'mouseout' : function(btn, e) {
								thisSystem.desktop.updateStatus();
							}
						}
					})).render(id);
				});
			}
		}
	},
	initWidgets : function() {
		var thisSystem = this;
		var widgetsEl = Ext.get('bt-desktop-widgets');
		// markup widgets
		if (widgetsEl) {
			var widgets = widgetsEl.select('div[class=bt-desktop-widget]');
			if (widgets) {
				widgets.each(function(el, c, index) {
					// check if a image widget 
					var imageEl = el.child('div[class=bt-widget-image]');
					if (imageEl) {
						var customEl = (new Ext.Resizable(imageEl.child('img'), {
							wrap:true,
							pinned:false,
							minWidth:50,
							minHeight: 50,
							preserveRatio: true,
							handles: 'all',
							draggable:true,
							dynamic:true
						})).getEl();
						document.body.insertBefore(customEl.dom, document.body.firstChild);
						customEl.on('dblclick', function(){
							customEl.hide(true);
						});
						customEl.hide();
						customEl.setLocation(Ext.lib.Dom.getViewWidth()-customEl.getWidth(),45,true);
						//customEl.center();
						customEl.show(true);
						return; // skip the other markup
					} 
					var titleEl = el.child('div[class=bt-widget-title]');
					if (titleEl) {
						titleEl.hide();
					} 
					var bodyEl = el.child('div[class=bt-widget-body]');
					var body = bodyEl.dom.innerHTML;
					if (bodyEl) { bodyEl.hide(); }
					var footerEl = el.child('div[class=bt-widget-footer]');
					if (footerEl) {
						footerEl.hide();
					}
					var panel = new Ext.Panel({
						renderTo: el,
						title: titleEl ? titleEl.dom.innerHTML : '',
						header: titleEl ? true : false,
						html: body,
						//frame: true,
						closable: titleEl ? true : false,
						collapsible: titleEl ? true : false,
						preventBodyReset: true,
						draggable: {
							insertProxy: false,
							onDrag : function(e){
								var pel = this.proxy.getEl();
								this.x = pel.getLeft(true);
								this.y = pel.getTop(true);
								var s = this.panel.getEl().shadow;
								if (s) {
									s.realign(this.x, this.y, pel.getWidth(), pel.getHeight());
								}
							},
							endDrag : function(e){
								this.panel.el.setLocation(this.x, this.y);
							}
						},
						tools: [{
							id:'refresh',
							qtip: '刷新',
							// hidden:true,
							handler: function(event, toolEl, panel){
							// refresh logic
							}
						}, {
							id:'gear',
							qtip: '配置',
							// hidden:true,
							handler: function(event, toolEl, panel){
							// refresh logic
							}
						}, {
							id:'close',
							qtip: '关闭',
							// hidden:true,
							handler: function(event, toolEl, panel){
							// refresh logic
							}
						}, {
							id:'help',
							qtip: '帮助',
							handler: function(event, toolEl, panel){
							// whatever
							}
						}],
						//footer: footerEl ? true : false,
						bbar: footerEl ? [footerEl.dom.innerHTML] : null
					});
					//panel.hide();
					//panel.getEl().setLocation(Ext.lib.Dom.getViewWidth()-panel.getWidth(),Ext.lib.Dom.getViewHeight()-panel.getHeight());
					panel.show();
				});
			}
		}
		// dynamic widgets
	},
	getWebware : function(winId){
 		var webwares = this.webwares;
 		for(var i = 0, len = webwares.length; i < len; i++){
 			if( webwares[i].id == winId 
 				|| webwares[i].systemType == winId 
 				|| webwares[i].contains(winId) // overrided by webware
 			){
 				return webwares[i];
			}
		}
		return '';
	},
	onReady : function(fn, scope){
		if(!this.isReady){
			this.on('ready', fn, scope);
		}else{
			fn.call(scope, this);
		}
	},
	getDesktop : function(){
		return this.desktop;
	},
	getWebtop : function(){
		return this.getDesktop();
	},
	onUnload : function(e){
		if(this.fireEvent('beforeunload', this) === false){
			e.stopEvent();
		}
	}
});


