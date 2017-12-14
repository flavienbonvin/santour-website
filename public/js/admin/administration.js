function getDetails(id) {
    window.location = 'tracks/'+id;
}
function exporte(e,id){
    e.preventDefault();
    window.location = "/admin/tracks/exports/"+id
}