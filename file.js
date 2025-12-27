function z1(a) {
    let res = 1;
    let b = 1;

    while (b <= a) {
        res = res * b;
        b += 1;
    }

    return res;
}

console.log('Задание 1. Ответ: ', z1(6));

function z2(string) {
    
    let words = string.split(' ');
    let maxWord = ' ';

    for (const word of words) {
        if (word.length > maxWord.length) {
            maxWord = word;
        }
    }

    return maxWord.length;
}

console.log('Задание 2. Ответ: ', z2('Я в своем познании настолько преисполнился')); 

function z3(arr) {
    const res = [];

    for (let i = 0; i < arr.length; i++) {
        let max = arr[i][0];

        for (let j = 1; j < arr[i].length; j++) {
            if (arr[i][j] > max) {
                max = arr[i][j];
            }
        }

        res.push(max);
    }

    return res;
}

console.log('Задание 3. Ответ: ', z3([[1, 2, 3], [4, 5], [6, 7, 8, 9]])); 

function z4(string, a) {

    if (string.length > a) {
        let newString = string.slice(0, a) + '...';
        return newString;
    }
}
    
console.log('Задание 4. Ответ: ', z4('Смерть стоит того, чтобы жить, а любовь стоит того, чтобы ждать', 35)); 

function z5(string) {
    string = string.toLowerCase();
    const words = string.split(' ');

    const newWords = [];

    for (word of words) {

        let correctWords = word[0].toUpperCase() + word.slice(1);
        newWords.push(correctWords);
    }

    const res = newWords.join(' ');
    return res;
}

console.log('Задание 5. Ответ: ', z5('Я в своем познании настолько преисполнился')) 

function z6(arr1, arr2, n) {
    const res = [];

    for (let i = 0; i < n; i++) {
        res.push(arr2[i]);
    }

    for (let i = 0; i < arr1.length; i++) {
        res.push(arr1[i]);
    }

    for (let i = n; i < arr2.length; i++) {
        res.push(arr2[i]);
    }

    return res;
}

console.log('Задание 6. Ответ: ', z6([1, 2, 3, 4, 5], [6, 7, 8], 2))

function z7(arr) {
    const newArr = arr.filter(Boolean);

    return newArr;
}

console.log('Задание 7. Ответ: ', z7([0, 1, 2, NaN, null])); 

function z8(arr) {
    [str1, str2] = arr;
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    for (let a of str2) {
        if (!str1.includes(a)) {
            return false;
        }
    }
    
    return true;
}

console.log('Задание 8. Ответ: ', z8(['Консультация', 'консул'])) 

function z9(arr, a) {
    const res = [];

    for (let i = 0; i < arr.length; i+= a) {
        const newArr = arr.slice(i, i + a);
        res.push(newArr);
    }
    
    return res;
}

console.log('Задание 9. Ответ: ', z9([1, 2, 3, 4, 5, 6], 2))

function z10 (arr, n) {

    if (n <= 0) {
        return arr;
    }

    let res = arr.slice();
    res.push(n);

    return z10(res, n - 1);
}

console.log('Задание 10. Ответ: ', z10([1, 2, 3, 4, 5, 6], 2))