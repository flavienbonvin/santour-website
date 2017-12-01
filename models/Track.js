var POD = require('./Pod');
var POI = require('./Poi');
var Position = require('./Position');

var track = class Track {
    /**
     * 
     * @param {string} id 
     * @param {string} name
     * @param {Number} distance 
     * @param {Number} pauseDuration 
     * @param {bool} isForEveryone 
     * @param {Number} difficulty 
     * @param {string} idUser 
     * @param {Position[]} positions 
     * @param {POD[]} pods 
     * @param {POI[]} pois 
     * @param {string} typeTrackID 
     */
    constructor(id, name, distance, pauseDuration, isForEveryone, difficulty, idUser, positions, pods, pois, typeTrackID) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.pauseDuration = pauseDuration;
        this.isForEveryone = isForEveryone;
        this.difficulty = difficulty;
        this.idUser = idUser;
        this.positions = positions;
        this.pods = pods;
        this.pois = pois;
        this.typeTrackID = typeTrackID;
    }

    convertToFirebase(){
        return {
            name : this.name,
            distance : this.distance,
            pauseDuration : this.pauseDuration,
            isForEveryone : this.isForEveryone,
            difficulty : this.difficulty,
            idUser : this.idUser,
            positions : this.positions,
            pods : this.pods,
            pois : this.pois,
            typeTrackID : this.typeTrackID
        }
    }
}


module.exports = track;
/*public String id;
public String name;
public int pauseDuration;
public boolean isForEveryone;
public int difficulty;
public String idUser;
public List < Position > positions;
public List < POD > pods;
public List < POI > pois;
public String typeTrackID;*/