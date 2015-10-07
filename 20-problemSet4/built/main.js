function addNumbers(str) {
    var numArr = [];
    var joinedArr = [];
    for (var i = 0; i <= str.length; i++) {
        if (!isNaN(str[i])) {
            numArr.push(str[i]);
        }
        else {
            joinedArr.push(numArr.join(''));
            numArr = [];
        }
    }
    ;
    // console.log(joinedArr); // see whats going on here
    var sum = 0;
    for (var i = 0; i < joinedArr.length; i++) {
        sum = Number(joinedArr[i]) + sum;
    }
    ;
    return sum;
}
console.log(addNumbers("do10you20even30add40"));
console.log(addNumbers("55H33a100lkj2a3.a-7"));
//# sourceMappingURL=main.js.map
