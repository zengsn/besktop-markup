/**  * 桌面小部件。  * @since 4.0  * @author http://zsn.cc  */Ext.namespace("BT.core");/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *  * Widget                                                             *  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

BT.core.Widget = function(config){
	config = config || {};
    Ext.apply(this, config);
    BT.core.Widget.superclass.constructor.call(this);
    this.init();
}
Ext.extend(BT.core.Widget, Ext.util.Observable, {
    init : Ext.emptyFn,
    onWebtopReady: Ext.emptyFn,	doRefesh : Ext.emptyFn,	doConfig : Ext.emptyFn,	doHelp : Ext.emptyFn
});