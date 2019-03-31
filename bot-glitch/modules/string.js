let m = {};

m.parseBoolean = function (s) {
    if (s == "true") {
        return true;
    } else if (s == "false") { 
        return false;
    } else {
        return false;
    }
}

module.exports = m;