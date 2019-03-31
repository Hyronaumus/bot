let m = {};

m.returnRandomInteger = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min)) + min);
}

m.generateLeadingZeroes = function(i) {
    i = i.toString();
    let amountToAdd = (5 - i.length);
    let nI = i.split("");
    let nnI = nI.reverse()
    nnI.push("0".repeat(amountToAdd))
    nnI.reverse();
    let nnnI = nnI.join("");
    return(nnnI);
}

m.findSquareRoot = function(n) {
    return (n ^ 0.5); // n to the one-half power = the square root of n.
}

m.findPercent = function(n, p) {
    return (n * (p/100)); // the product of n and p equals p percentage of n when p/100
}



module.exports = m;