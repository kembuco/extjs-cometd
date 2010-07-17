Ext.namespace("Ext.ux");

// Map Cometd's JSON methods to ExtJS's JSON methods
Ext.apply(org.cometd.JSON, {
    toJSON: Ext.encode,
    fromJSON: Ext.decode
});

// ExtJS based cometd adapter
Ext.ux.Cometd = (function(){
    var c = org.cometd,

        cometd = new (Ext.extend(c.Cometd, {
            // extend cometd functionality here
        }))(),

        derive = c.Transport.derive,
        LongPollingTransport = Ext.apply(derive(new c.LongPollingTransport()), {
            xhrSend: function(options) { 
                return Ext.Ajax.request({
                    url: options.url,
                    method: "POST",
                    jsonData: options.body,
                    
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

    cometd.registerTransport('long-polling', LongPollingTransport);

    return cometd;
})();
