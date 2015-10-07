function addNumbers(str) {
    var numArr = [];
    var joinedArr = [];
    for (var i = 0; i <= str.length; i++) {
        if (!isNaN(str[i])) {
            numArr.push(str[i]);
        } else {
            joinedArr.push(numArr.join(''));
            numArr = [];
        }
    };
    // console.log(joinedArr); // see whats going on here
    var sum = 0;
    for (var i = 0; i < joinedArr.length; i++) {
        sum = Number(joinedArr[i]) + sum;
    };
    return sum;
}
console.log(addNumbers("do10you20even30add40"));
console.log(addNumbers("55H33a100lkj2a3.a-7"));

function longestWord(str) {
    var arr = str.split(' ');
    var output = '';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].length > output) {
            output = arr[i];
        }
    }
    console.log(output);
}
longestWord('that takes a single string parameter and returns the largest word in the string. If there are two or more words that are the same length, it returns the first word from the string with that length. Ignore punctuation and assume the input sentence will not be empty.');
//# sourceMappingURL=main.js.map