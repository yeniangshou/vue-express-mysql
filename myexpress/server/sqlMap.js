// sql语句的编写
var sqlMap = {
    user:{
        add: 'insert into user(name,age) values(?,?)',
        query:'select * from user where name =? || age =? ',
        queryAll:'select * from user',
        del:'DELETE FROM user WHERE name = ? '
    }
}

module.exports = sqlMap;
