var position = class Position {
    /**
     * 
     * @param {Number} latitude 
     * @param {Number} longitude 
     * @param {Number} altitude 
     * @param {Number} time 
     */
    constructor(latitude, longitude, altitude, time) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.time = time;
    }
}

module.exports = position;