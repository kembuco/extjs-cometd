Ext.namespace("Ext.ux");

// Map Cometd's JSON methods to ExtJS's JSON methods
Ext.apply(org.cometd.JSON, {
    toJSON: Ext.encode,
    fromJSON: Ext.decode
});

// ExtJS based cometd adapter
Ext.ux.Cometd = (function(){
    var _c = org.cometd,
        _config = {},

        _cometd = new (Ext.extend(_c.Cometd, {}))(),
        _configure = _cometd.configure,

        _derive = _c.Transport.derive,
        LongPollingTransport = Ext.apply(_derive(new _c.LongPollingTransport()), {
            xhrSend: function(options) { 
                return Ext.Ajax.request({
                    url: options.url,
                    method: "POST",
                    jsonData: options.body,
                    timeout: _config.maxNetworkDelay || 30000,
                    
                    headers: Ext.apply(options.headers || {}, {
                        "Content-Type": "application/json;charset=UTF-8"
                    }),

                    success: function(connection) {
                        options.onSuccess(Ext.decode(connection.responseText));
                    },

                    failure: function(connection) {
                        options.onError(connection.statusText, connection);
                    }
                }).conn;
            }
        });

    _cometd.override({
        // We need to hijack the configure method and stash off the config for ExtJS Ajax timeout setting.
        configure: function(config) {
            _config = config;
            
            _configure.apply(this, arguments);
        }
    });
    _cometd.registerTransport('long-polling', LongPollingTransport);

    return _cometd;
})();
