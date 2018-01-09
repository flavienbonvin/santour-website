var ratePod = class RatePOD {
    /**
     * @description this object allow you to give a rate to a pod category
     * @param {string} podCatID 
     * @param {Number} rate 
     */
    constructor(podCatID, rate) {
        this.podCatID = podCatID;
        this.rate = rate;
    }
}

module.exports = ratePod;