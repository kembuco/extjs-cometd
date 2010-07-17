# ExtJS Cometd Adapter

Creates an adapter on top of the cometd.js in the cometd distribution in order to use ExtJS for the xhr transport layer.  **NOTE**: Only the long-poll transport is supported right now.  Also note that this project does not provide full comet support for the cometd project.  It is just an adapter on top of the distributed cometd js, which requires you to provide your own xhr implementation.  The value proposition is that for an ExtJS project that is not already relying on the jQuery adapter, it shouldn't be necessary to include jQuery or dojo for cometd to function.

## Usage

Just include the ext/ux/Cometd.js file after including the cometd.js file included with the cometd distribution (not included in this project).

	<script type="text/javascript" src="/ext/ux/Cometd.js"></script>
	
Then you can use it in a very similar fashion to the jQuery and dojo adapters:

	Ext.ux.Cometd.init({
        url: location.protocol + "//" + location.host + "/cometd"
    });

    Ext.ux.Cometd.subscribe("/echo", function(message) { console.log(message.data.msg) })

## Contributions

Contributions are welcome via pull request

	git clone http://github.com/kembuco/extjs-cometd.git