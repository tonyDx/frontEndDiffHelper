let main = require('./main.js')  ;
let arr1 = [ 'let b=2;' , 'let a=2;' , 'let c=1;' , 'let d=2;'];
let arr2 = [ 'let a=2;' , 'let b=2;' , 'let c=3;' , 'let d=2;' , 'let e=2;' , 'let f=3;'];

console.log(main.doCompare(arr1, arr2));

