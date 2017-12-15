function initMap() {
    trackDetails = JSON.parse(trackDetails.replace(/&quot;/g, '"'));

    var coordinates = [];
    for (var i = 0; i < trackDetails.positions.length; i++) {
        coordinates.push({
            lat: trackDetails.positions[i].latitude,
            lng: trackDetails.positions[i].longitude
        })
    }
    
    var map = new google.maps.Map(document.getElementById('track-map-canvas'), {
        zoom: 17,
        center: coordinates[0]
    });


    
    var polyline = new google.maps.Polyline({
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
        console.log('pod');
        
        var marker = new google.maps.Marker({
            position: temp,
            map: map,
            icon : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
    }

    for (var i = 0; i < trackDetails.pois.length; i++) {
        var temp = {
            lat: trackDetails.pois[i].position.latitude,
            lng: trackDetails.pois[i].position.longitude
        }
       console.log('poi');
        var marker = new google.maps.Marker({
            position: temp,
            map: map,
            icon : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
    }

    
}