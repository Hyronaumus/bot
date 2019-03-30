let m = {};

m.findInArray = function(array, value) {
    for (let index in array) {
        if (array[index] == value) {
            return index;
        }
    }
    return false;
}

module.exports = m;