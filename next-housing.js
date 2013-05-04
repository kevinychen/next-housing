
/* For Firebase */
var data = new Firebase('https://kyc.firebaseIO.com/');

/* For OpenLayer */

OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },

    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
        OpenLayers.Control.prototype.initialize.apply(this, arguments);
        this.handler = new OpenLayers.Handler.Click(this, {'click': this.trigger}, this.handlerOptions);
    },

    trigger: function(e) {
        var lonlat = map.getLonLatFromPixel(e.xy);
    }
});

var map, layer;
function init() {
    map = new OpenLayers.Map({
        div: 'map',
        layers: [
            new OpenLayers.Layer.Image( '3rd Floor', 'http://web.mit.edu/kyc2915/Public/Images/W71_3.png',
                new OpenLayers.Bounds(-180, -90, 180, 90),
                new OpenLayers.Size(1600, 900),
                {numZoomLevels: 4, isBaseLayer: true}
            )],
        controls: [
            new OpenLayers.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Zoom()
        ],
        center: [0, 0],
        zoom: 0
    });

    var click = new OpenLayers.Control.Click();
    map.addControl(click);
    click.activate();
};

