var UserSQL = {  
    insert:'INSERT INTO user(userId,userName,password,role) VALUES(?,?,?,?)',
    bangding:'UPDATE user SET userame = ?,password = ? WHERE userId=?  ',
    queryAll:'SELECT * FROM user WHERE isDelete=0',
    getUserByOpenid:'SELECT * FROM user WHERE userId = ? ', 
    getUserByInfo:'SELECT * FROM user WHERE username = ? AND password = ? ',
    deleteUserByInfo:'DELETE FROM user WHERE username = ? AND password = ? ',
    deleteUserById:'UPDATE user SET isDelete=1  WHERE userId=?'
};
module.exports = UserSQL;