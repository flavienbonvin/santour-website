var map = null;
var polyline = null;
var podsPoint = [];
var poisPoint = [];

var poiSmall = null;
var poiBig = null;
var podSmall = null;
var podBig = null;

function initMap() {
    trackDetails = JSON.parse(trackDetails.replace(/&quot;/g, '"'));

    poiBig = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(40, 40),
    }
    poiSmall = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    }
    podBig = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        scaledSize: new google.maps.Size(40, 40),
    }
    podSmall = {
        url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    }

    var coordinates = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < trackDetails.positions.length; i++) {
        coordinates.push({
            lat: trackDetails.positions[i].latitude,
            lng: trackDetails.positions[i].longitude
        })
        bounds.extend(coordinates[i]);
    }

    map = new google.maps.Map(document.getElementById('track-map-canvas'), {
        zoom: 17,
        center: coordinates[0]
    });



    polyline = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    polyline.setMap(map);

    for (var i = 0; i < trackDetails.pods.length; i++) {
        var temp = {
            lat: trackDetails.pods[i].position.latitude,
            lng: trackDetails.pods[i].position.longitude
        }

        var marker = new google.maps.Marker({
            position: temp,
            map: map,
            icon: podSmall
        });
        podsPoint.push(marker);
    }

    for (var i = 0; i < trackDetails.pois.length; i++) {
        var temp = {
            lat: trackDetails.pois[i].position.latitude,
            lng: trackDetails.pois[i].position.longitude
        }
        var marker = new google.maps.Marker({
            position: temp,
            map: map,
            icon: poiSmall
        });
        poisPoint.push(marker);
    }

    map.fitBounds(bounds);
}

var posMarker = null;
function highlightPoint(lat, lng) {
    clearPoint();
    var temp = {
        lat: lat,
        lng: lng
    }
    posMarker = new google.maps.Marker({
        position: temp,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    });
}
function clearPoint() {
    if (posMarker != null) {
        posMarker.setMap(null);
    }
}
function deletePoint(index, t) {
    if (polyline != null) {
        polyline.setMap(null);
    }
    var coordinates = [];
    for (var i = 0; i < trackDetails.positions.length; i++) {
        if (i != index) {
            coordinates.push({
                lat: trackDetails.positions[i].latitude,
                lng: trackDetails.positions[i].longitude
            })
        }

    }
    polyline = new google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    polyline.setMap(map);

    t.parentNode.parentNode.parentNode.removeChild(t.parentNode.parentNode);
}

function showPOI(index) {
    resetPOI();
    poisPoint[index].setIcon(poiBig);
}
function resetPOI(){
    for (var i = 0; i < poisPoint.length; i++) {
        poisPoint[i].setIcon(poiSmall)
    }
}
function showPOD(index) {
    resetPOD();
    podsPoint[index].setIcon(podBig);
}
function resetPOD(){
    for (var i = 0; i < podsPoint.length; i++) {
        podsPoint[i].setIcon(podSmall)
    }
}