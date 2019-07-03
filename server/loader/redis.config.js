const Redis = require('async-redis');
const myCache = Redis.createClient();
myCache.on("error", function(err) {
    console.log("Error " + err);
});

const setValue = async(key, value) => {
    await myCache.set(key, value);
};

const getValue = async(key) => {
    let val = await myCache.get(key);
    return val;
};

exports.setValue = setValue;
exports.getValue = getValue;