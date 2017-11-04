let doCompare = function (formalCode, commitCode) {
    var lhs = formalCode, rhs = commitCode, lmodify = [], ldelete = [], lempty = [], radd = [],
        rmodify = [], rempty = [];

    var lindex = 0, rindex = 0;
    do {
        var lline = lhs[lindex].split(',')[0];
        var rline = rhs[rindex].split(',')[0];
        if (lline == rline) {
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
            if (lhs.includes(rline) || lhs.includes(rline + ",")) {
                //左边对应被删除的项
                var nextIndex = lhs.indexOf(rline) == -1 ? lhs.indexOf(rline + ",") : lhs.indexOf(rline);
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
            } else if (rhs.includes(lline) || rhs.includes(lline + ",")) {
                //右边对应新增的项
                var nextIndex = rhs.indexOf(lline) == -1 ? rhs.indexOf(lline + ",") : rhs.indexOf(lline);
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

        if (lindex == lhs.length && rindex < rhs.length) {
            for (let n in rhs.length - 1 - rindex) {
                radd.push(true);
                rmodify.push(false);
            }
            rindex = rhs.length;
        } else if (lindex < lhs.length && rindex == rhs.length) {
            for (let n in lhs.length - 1 - rindex) {
                lmodify.push(false);
                ldelete.push(true);
            }
            lindex = lhs.length;
        }
    } while (lindex < lhs.length && rindex < rhs.length);

    if (!ldelete.includes(true) && !lmodify.includes(true) && !radd.includes(true) && !rmodify.includes(true)) {
        this.hasDiff = false;
    }

    this.formalObj.delete = ldelete;
    this.formalObj.modify = lmodify;
    this.formalObj.empty = lempty;
    this.commitObj.add = radd;
    this.commitObj.modify = rmodify;
    this.commitObj.empty = rempty;
    this.formalObj.code = lhs;
    this.commitObj.code = rhs;
}