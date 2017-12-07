$(document).ready(function () {
    $('.collapsible').collapsible();
});

function deleteTrack(id,e){
    e.preventDefault();
    e.stopPropagation();
}

