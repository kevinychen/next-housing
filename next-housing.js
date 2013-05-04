
/* For Firebase */
var data = new Firebase('https://kyc.firebaseIO.com/');
lats = new Array();
lons = new Array();
data.child('spots').on('child_added', function(snapshot) {
    var roomNum = snapshot.val().room;
    lats[roomNum] = snapshot.val().lat;
    lons[roomNum] = snapshot.val().lon;
});

/* Personal data */
myName = "KevinChen" // Change after using AUTH
myRank = 12 // Change after parsing site.
myYear = 2015 // Change after parsing site.
chosenRooms = new Array();

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

        var minRoom = -1;
        var minDist = 999999;
        for (var roomNum = 301; roomNum <= 376; roomNum++) {
            var dist = Math.abs(lats[roomNum] - lonlat.lat) + Math.abs(lons[roomNum] - lonlat.lon);
            if (dist < minDist) {
                minRoom = roomNum;
                minDist = dist;
            }
        }

        var val = $('input[name=priority]:checked').val();
        if (val) {
            chooseRoom(minRoom, parseInt(val), true);
        }
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


/* Database update functions */

// Priority should be 1, 2, or 3
function chooseRoom(room, priority, update) {
    if (update) {
        data.child('rooms').child(room).child(myName).set({'year': myYear, 'rank': myRank, 'priority': priority});
        chosenRooms[priority] = room;
    }
    $('#priority' + priority).toggle();
    $('#remove' + priority).html('Room ' + room + '<a href="#" id="remove' + priority + '">Remove</a>');
    document.getElementById('remove' + priority).onclick = function() {
        deletePriority(priority, true);
    }
};

// Delete the room with the given priority
function deletePriority(priority, update) {
    if (update) {
        data.child('rooms').child(chosenRooms[priority]).child(myName).remove();
    }
    $('#priority' + priority).toggle();
    $('#remove' + priority).html('');
}

