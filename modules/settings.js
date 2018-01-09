var fs = require('fs');

var self = module.exports = {
    /**
     * @description save the new data in the settings file
     * @param {Number} minimanlDistance 
     * @param {Number} seekbarValue 
     */
    save(minimanlDistance, seekbarValue) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(__dirname+'/../public/settings.txt',"minimalDistance:"+minimanlDistance+",seekbarValue:"+seekbarValue);
            resolve();
        })
    },
    /**
     * @description get the data from settings
     * @returns []
     */
    get(){
        var txt = fs.readFileSync(__dirname+'/../public/settings.txt','utf8');
        var tab = txt.split(',');
        var res ={};
        for(var i = 0;i<tab.length;i++){
            var tmp = tab[i].split(':');
            res[tmp[0]] = tmp[1];
        }
        return res;
    }
}