exports.doCompare =  function (formalCode, commitCode) {

                let lhs = formalCode,
                    rhs = commitCode, 
                    lmodify = [], 
                    ldelete = [], 
                    lempty = [], 
                    radd = [],
                    rmodify = [], 
                    rempty = [],
                    LeftObj = {},
                    RightObj = {};

                let lindex = 0, 
                rindex = 0;
                
                do {
                    let lline = lhs[lindex];
                    let rline = rhs[rindex];
                    if (lline === rline) {
                        //两行相等
                        lindex++;
                        rindex++;
                        lmodify.push(false);
                        ldelete.push(false);
                        lempty.push(false);
                        radd.push(false);
                        rmodify.push(false);
                        rempty.push(false);
                    } else {
                        //两行不等
                        if (lhs.slice(lindex).includes(rline)) {
                            //左边对应被删除的项
                            let nextIndex = lhs.slice(lindex).indexOf(rline)+lindex;

                            for (let n = 0; n < nextIndex - lindex; n++) {
                                lmodify.push(false);
                                ldelete.push(true);
                                lempty.push(false);
                                radd.push(false);
                                rempty.push(true);
                                rmodify.push(false);
                                rhs.splice(rindex, 0, " \n");
                                rindex++;
                            }
                            lindex = nextIndex;

                        } else if (rhs.slice(rindex).includes(lline)) {
                            //右边对应新增的项
                            let nextIndex = rhs.slice(rindex).indexOf(lline)+rindex;

                            for (let n = 0; n < nextIndex - rindex; n++) {
                                radd.push(true);
                                rmodify.push(false);
                                rempty.push(false);
                                ldelete.push(false);
                                lempty.push(true);
                                lmodify.push(false);
                                lhs.splice(lindex, 0, " \n");
                                lindex++;
                            }
                            rindex = nextIndex;
                        } else {
                            //被修改的行
                            lindex++;
                            rindex++;
                            lmodify.push(true);
                            ldelete.push(false);
                            lempty.push(false);
                            radd.push(false);
                            rmodify.push(true);
                            rempty.push(false);
                        }
                    }

                    if (lindex === lhs.length && rindex < rhs.length) {
                        for (let n = 0;  n < rhs.length - rindex ; n++ ) {
                            radd.push(true);
                            rmodify.push(false);
                        }
                        rindex = rhs.length;
                    } else if (lindex < lhs.length && rindex === rhs.length) {
                        for (let n = 0; n< lhs.length - lindex ; n++ ) {
                            lmodify.push(false);
                            ldelete.push(true);
                        }
                        lindex = lhs.length;
                    }

                } while (lindex < lhs.length && rindex < rhs.length);


                LeftObj.delete = ldelete;
                LeftObj.modify = lmodify;
                LeftObj.empty = lempty;
                RightObj.add = radd;
                RightObj.modify = rmodify;
                RightObj.empty = rempty;
                LeftObj.code = lhs;
                RightObj.code = rhs;


                return {
                    LeftObj,
                    RightObj
                };


}