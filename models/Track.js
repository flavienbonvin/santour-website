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
     * @param {Number} duration 
     * @param {string} durationString 
     * @param {bool} isForEveryone 
     * @param {Number} difficulty 
     * @param {string} idUser 
     * @param {Position[]} positions 
     * @param {POD[]} pods 
     * @param {POI[]} pois 
     */
    constructor(id, name, distance, duration, durationString, pauseDuration, isForEveryone, difficulty, idUser, positions, pods, pois) {
        this.id = id;
        this.name = name;
        this.distance = distance;
        this.duration = duration;
        this.durationString = durationString;
        this.pauseDuration = pauseDuration;
        this.isForEveryone = isForEveryone;
        this.difficulty = difficulty;
        this.idUser = idUser;
        this.positions = positions;
        this.pods = pods;
        this.pois = pois;
    }

    convertToFirebase() {
        return {
            name: this.name,
            distance: this.distance,
            duration: this.duration,
            pauseDuration: this.pauseDuration,
            isForEveryone: this.isForEveryone,
            difficulty: this.difficulty,
            idUser: this.idUser,
            positions: this.positions,
            pods: this.pods,
            pois: this.pois
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