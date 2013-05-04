
/* For Firebase */
var data = new Firebase('https://kyc.firebaseIO.com/');
lats = new Array();
lons = new Array();
data.child('spots').on('child_added', function(snapshot) {
    var roomNum = snapshot.val().room;
    lats[roomNum] = snapshot.val().lat;
    lons[roomNum] = snapshot.val().lon;
    lats[roomNum - 100] = lats[roomNum + 100] = lats[roomNum + 200] = lats[roomNum];
    lons[roomNum - 100] = lons[roomNum + 100] = lons[roomNum + 200] = lons[roomNum];
});

/* Personal data */

data.on('value', function(snapshot) {
    dat = snapshot.val();
    myRank = dat.ranks[myName].rank // Change after parsing site.
    myYear = dat.ranks[myName].year // Change after parsing site.
                $("#yourrank").text(myRank);
                $("#youryear").text(myYear);
});

chosenRooms = new Array();

/* For OpenLayer */

var map2, map3, map4, map5;
var layer2, layer3, layer4, layer5;
function init() {

    /* MAP 2 */
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	layer2 = new OpenLayers.Layer.Vector("Simple Geometry", {
        styleMap: new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#00FF00",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#FF5500",
            fillOpacity: 0.5,
            pointRadius: 6,
            pointerEvents: "visiblePainted",
            label: "${name}",

            fontColor: "black",
            fontSize: "${getFontSize}",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            labelOutlineColor: "white",
            labelOutlineWidth: 3
        }, {context:{
            getFontSize : function() {
                return (map2.getZoom() * 8 + 10) + "px";
            }
        }})),
            renderers: renderer
    });

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
            var lonlat = map2.getLonLatFromPixel(e.xy);
    
            var minRoom = -1;
            var minDist = 999999;
            for (var roomNum = 201; roomNum <= 276; roomNum++) {
                var dist = Math.abs(lats[roomNum] - lonlat.lat) + Math.abs(lons[roomNum] - lonlat.lon);
                if (dist < minDist) {
                    minRoom = roomNum;
                    minDist = dist;
                }
            }
    
            var val = currSelectRoom;
            if (val) {
                chooseRoom(minRoom, parseInt(val), true);
            }
        }
    });

    map2 = new OpenLayers.Map({
        div: 'map2',
        layers: [
            new OpenLayers.Layer.Image( '3rd Floor', 'http://web.mit.edu/kyc2915/Public/Images/W71_2.png',
                new OpenLayers.Bounds(-180, -90, 180, 90),
                new OpenLayers.Size(900, 500),
                {numZoomLevels: 5, isBaseLayer: true}
            ),
            layer2,
        ],
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
    map2.addControl(click);
    click.activate();


    /* MAP 3 */
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	layer3 = new OpenLayers.Layer.Vector("Simple Geometry", {
        styleMap: new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#00FF00",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#FF5500",
            fillOpacity: 0.5,
            pointRadius: 6,
            pointerEvents: "visiblePainted",
            label: "${name}",

            fontColor: "black",
            fontSize: "${getFontSize}",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            labelOutlineColor: "white",
            labelOutlineWidth: 3
        }, {context:{
            getFontSize : function() {
                return (map3.getZoom() * 8 + 10) + "px";
            }
        }})),
            renderers: renderer
    });

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
            var lonlat = map3.getLonLatFromPixel(e.xy);
    
            var minRoom = -1;
            var minDist = 999999;
            for (var roomNum = 301; roomNum <= 376; roomNum++) {
                var dist = Math.abs(lats[roomNum] - lonlat.lat) + Math.abs(lons[roomNum] - lonlat.lon);
                if (dist < minDist) {
                    minRoom = roomNum;
                    minDist = dist;
                }
            }
    
            var val = currSelectRoom;
            if (val) {
                chooseRoom(minRoom, parseInt(val), true);
            }
        }
    });

    map3 = new OpenLayers.Map({
        div: 'map3',
        layers: [
            new OpenLayers.Layer.Image( '3rd Floor', 'http://web.mit.edu/kyc2915/Public/Images/W71_3.png',
                new OpenLayers.Bounds(-180, -90, 180, 90),
                new OpenLayers.Size(900, 500),
                {numZoomLevels: 5, isBaseLayer: true}
            ),
            layer3,
        ],
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
    map3.addControl(click);
    click.activate();


    /* MAP 4 */
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	layer4 = new OpenLayers.Layer.Vector("Simple Geometry", {
        styleMap: new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#00FF00",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#FF5500",
            fillOpacity: 0.5,
            pointRadius: 6,
            pointerEvents: "visiblePainted",
            label: "${name}",

            fontColor: "black",
            fontSize: "${getFontSize}",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            labelOutlineColor: "white",
            labelOutlineWidth: 3
        }, {context:{
            getFontSize : function() {
                return (map4.getZoom() * 8 + 10) + "px";
            }
        }})),
            renderers: renderer
    });

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
            var lonlat = map4.getLonLatFromPixel(e.xy);
    
            var minRoom = -1;
            var minDist = 999999;
            for (var roomNum = 401; roomNum <= 476; roomNum++) {
                var dist = Math.abs(lats[roomNum] - lonlat.lat) + Math.abs(lons[roomNum] - lonlat.lon);
                if (dist < minDist) {
                    minRoom = roomNum;
                    minDist = dist;
                }
            }
    
            var val = currSelectRoom;
            if (val) {
                chooseRoom(minRoom, parseInt(val), true);
            }
        }
    });

    map4 = new OpenLayers.Map({
        div: 'map4',
        layers: [
            new OpenLayers.Layer.Image( '3rd Floor', 'http://web.mit.edu/kyc2915/Public/Images/W71_4.png',
                new OpenLayers.Bounds(-180, -90, 180, 90),
                new OpenLayers.Size(900, 500),
                {numZoomLevels: 5, isBaseLayer: true}
            ),
            layer4,
        ],
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
    map4.addControl(click);
    click.activate();


    /* MAP 5 */
    var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
	layer5 = new OpenLayers.Layer.Vector("Simple Geometry", {
        styleMap: new OpenLayers.StyleMap(new OpenLayers.Style({
            strokeColor: "#00FF00",
            strokeOpacity: 1,
            strokeWidth: 3,
            fillColor: "#FF5500",
            fillOpacity: 0.5,
            pointRadius: 6,
            pointerEvents: "visiblePainted",
            label: "${name}",

            fontColor: "black",
            fontSize: "${getFontSize}",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            labelOutlineColor: "white",
            labelOutlineWidth: 3
        }, {context:{
            getFontSize : function() {
                return (map5.getZoom() * 8 + 10) + "px";
            }
        }})),
            renderers: renderer
    });

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
            var lonlat = map5.getLonLatFromPixel(e.xy);
    
            var minRoom = -1;
            var minDist = 999999;
            for (var roomNum = 501; roomNum <= 576; roomNum++) {
                var dist = Math.abs(lats[roomNum] - lonlat.lat) + Math.abs(lons[roomNum] - lonlat.lon);
                if (dist < minDist) {
                    minRoom = roomNum;
                    minDist = dist;
                }
            }
    
            var val = currSelectRoom;
            if (val) {
                chooseRoom(minRoom, parseInt(val), true);
            }
        }
    });

    map5 = new OpenLayers.Map({
        div: 'map5',
        layers: [
            new OpenLayers.Layer.Image( '3rd Floor', 'http://web.mit.edu/kyc2915/Public/Images/W71_5.png',
                new OpenLayers.Bounds(-180, -90, 180, 90),
                new OpenLayers.Size(900, 500),
                {numZoomLevels: 5, isBaseLayer: true}
            ),
            layer5,
        ],
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
    map5.addControl(click);
    click.activate();


    for (var roomNum = 200; roomNum <= 600; roomNum++) {
        selector = $("#plus" + roomNum);
        if (selector.length){
            selector.click(function(){
                var id = $(this).attr('id');
                var roomNumC = id.match(/[0-9]+/)[0];
                chooseRoom(roomNumC, currSelectRoom, true);
                return false;
            });
        }
    }
};


/* Database update functions */

// Priority should be 1, 2, or 3
function chooseRoom(room, priority, update) {
    if (update) {
        data.child('rooms').child(room).child(myName).set({'year': myYear, 'rank': myRank, 'priority': priority});
        data.child('rooms').child(room).child(myName).setPriority(myYear * 1000 + myRank);
        data.child('log').push({'name': myName, 'room': room, 'priority': priority, 'action': 'choose'});
    }
    chosenRooms[priority] = room;
    $('#remove' + priority).html('Room ' + room + '<a href="#" id="remove' + priority + '">Remove</a>');
    $('#choice' + priority).hide();
    document.getElementById('remove' + priority).onclick = function() {
        $("#room" + room).html("none");
        deletePriority(priority, true);
        return false;
    }
    disableChoosing();
};

// Delete the room with the given priority
function deletePriority(priority, update) {
    if (update) {
        data.child('rooms').child(chosenRooms[priority]).child(myName).remove();
        data.child('log').push({'name': myName, 'room': chosenRooms[priority], 'priority': priority, 'action': 'remove'});
    }
    $('#choice' + priority).show();
    $('#remove' + priority).html('');
    disableChoosing();
}


/* random stuff */

function enableChoosing(priority){
    $(".chooseroombtnlist").show();
    $("#choice" + priority).css({"background-color": "#B38217"});
    $("#choice" + priority).css({"border": "#FFBA24 1px solid"});
    currSelectRoom = priority;
}
function disableChoosing(){
    $(".chooseroombtnlist").hide();
    $("#choice1").css({"background-color": "#FFBA24"});
    $("#choice1").css({"border": "#FFBA24 1px solid"});
    $("#choice2").css({"background-color": "#FFBA24"});
    $("#choice2").css({"border": "#FFBA24 1px solid"});
    $("#choice3").css({"background-color": "#FFBA24"});
    $("#choice3").css({"border": "#FFBA24 1px solid"});
    currSelectRoom = false;
}


/* Sync with database */


features = new Array();
data.on('value', function (snapshot) {
    var obj = snapshot.val();
    for (j in Object.keys(obj.rooms)) {
        var roomNumT = Object.keys(obj.rooms)[j];
        data.child('rooms').child(roomNumT).on('child_added', function(snapshot2) {
            var roomNumStr = snapshot2.ref().parent().toString();
            var roomNum = parseInt(roomNumStr.substring(roomNumStr.lastIndexOf('/') + 1));
            var name = snapshot2.name();
            if (name == myName) {
                chooseRoom(roomNum, snapshot2.val().priority, false);
            }

            var point = new OpenLayers.Geometry.Point(lons[roomNum], lats[roomNum]);
            var pointFeature = new OpenLayers.Feature.Vector(point);
            pointFeature.attributes = {
                name: snapshot2.name()
            };

            /* Update map [priority, name, feature] */
            layers = [layer2, layer3, layer4, layer5];
            if (!features[roomNum]) {
                features[roomNum] = new Array();
            }
            features[roomNum].push([snapshot2.getPriority(), name, pointFeature]);
            for (var i = 0; i < features[roomNum].length; i++) {
                layers[~~(roomNum / 100) - 2].removeFeatures([features[roomNum][i][2]]);
            }
            var topContestant = 0;
            for (var i = 0; i < features[roomNum].length; i++) {
                if (features[roomNum][i][0] < features[roomNum][topContestant][0]) {
                    topContestant = i;
                }
            }
            layers[~~(roomNum / 100) - 2].addFeatures([features[roomNum][topContestant][2]]);
        });
        data.child('rooms').child(roomNumT).on('child_removed', function(snapshot2) {
            var roomNumStr = snapshot2.ref().parent().toString();
            var roomNum = parseInt(roomNumStr.substring(roomNumStr.lastIndexOf('/') + 1));
            var name = snapshot2.name();

            for (var i = 0; i < features[roomNum].length; i++) {
                layers[~~(roomNum / 100) - 2].removeFeatures([features[roomNum][i][2]]);
                if (features[roomNum][i][1] == name) {
                    features[roomNum].splice(i);
                }
            }
            for (var i = 0; i < features[roomNum].length; i++) {
            layers[~~(roomNum / 100) - 2].removeFeatures([features[roomNum][i][2]]);
            }
            var topContestant = 0;
            for (var i = 0; i < features[roomNum].length; i++) {
                if (features[roomNum][i][0] < features[roomNum][topContestant][0]) {
                    topContestant = i;
                }
            }
            layers[~~(roomNum / 100) - 2].addFeatures([features[roomNum][topContestant][2]]);
        });
    }
});

