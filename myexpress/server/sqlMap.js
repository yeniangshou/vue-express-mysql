var sqlMap = {
    user:{
        add: 'insert into user(name,age) values(?,?)',
        query:'select * from user where name =? || age =? ',
        queryAll:'select * from user'
    }
}

module.exports = sqlMap;
