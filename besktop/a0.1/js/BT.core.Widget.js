/**

BT.core.Widget = function(config){
	config = config || {};
    Ext.apply(this, config);
    BT.core.Widget.superclass.constructor.call(this);
    this.init();
}
Ext.extend(BT.core.Widget, Ext.util.Observable, {
    init : Ext.emptyFn,
    onWebtopReady: Ext.emptyFn,
});