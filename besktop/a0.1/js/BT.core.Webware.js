/**  * �����ӿڡ�  * @since 4.0  * @author http://zsn.cc  */Ext.namespace("BT.core");/** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ *  * ������                                                             *  * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/

BT.core.Webware = function(config){
	config = config || {};
    Ext.apply(this, config);
    BT.core.Webware.superclass.constructor.call(this);
    this.init();
}
Ext.extend(BT.core.Webware, Ext.util.Observable, {
    init : Ext.emptyFn,
    onWebtopReady: Ext.emptyFn,
    contains: function(winId) {
    	return null;
    }
});