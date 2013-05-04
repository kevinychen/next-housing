
/* For OpenLayer */

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
};


/* For Firebase */
var data = new Firebase('https://kyc.firebaseIO.com/');
data.on('child_added', function(snapshot) {
});
