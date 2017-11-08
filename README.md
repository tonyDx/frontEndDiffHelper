# 纯JavaScript代码实现文本比较工具

[![release](https://img.shields.io/badge/release-1.0.02-blue.svg)](https://github.com/tonyDx/frontEndDiffHelper)


文件简析

- [ index.html ](https://tonydx.github.io/frontEndDiffHelper/) 为一个完整的js文本比较工具。
- main.js 为改进版本，可以直接引用

## Usage

```js
const doCompare = require('array-differ');
let arr1 = [ 'let b=2;' , 'let a=2;' , 'let c=1;' , 'let d=2;'];
let arr2 = [ 'let a=2;' , 'let b=2;' , 'let c=3;' , 'let d=2;' , 'let e=2;' , 'let f=3;'];

doCompare(arr1, arr2);
//=> { 
	LeftObj:{ 
			delete: [ true, false, false, false, false ],
	     		modify: [ false, false, true, false, false ],
	     		empty: [ false, false, false, true, false ],
	     		code: [ 'let b=2;', 'let a=2;', 'let c=1;', ' \n', 'let d=2;' ] 
	     	},
  	RightObj:{
			add: [ false, false, false, true, false, true, true ],
	     		modify: [ false, false, true, false, false, false, false ],
	     		empty: [ true, false, false, false, false ],
	     		code:[ ' \n','let a=2;','let b=2;','let c=3;','let d=2;','let e=2;','let f=3;' ] 
		 } 
	  }
```

## 说明

函数最终会返回一个对象，里面包含了三种状态 `新增项` `删除项` `修改项`     
然后你状态渲染到页面     
看看截图就明白了

![示例](https://raw.githubusercontent.com/tonyDx/frontEndDiffHelper/master/test.png)



## License

MIT © [TonyDong](/license)
