Array.prototype.last = function() {
    var index = this.length - 1; 
    return this[index]; 
}

const sample = [1, 2, 3, 4, 5, 6,9];
console.log(sample.last()); 