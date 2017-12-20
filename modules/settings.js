var fs = require('fs');

var self = module.exports = {
    save(minimanlDistance, seekbarValue) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(__dirname+'/../public/settings.txt',"minimanlDistance:"+minimanlDistance+",seekbarValue:"+seekbarValue);
            resolve();
        })
    }
}