var UserSQL = {  
    insert:'INSERT INTO user(userId,userName,password,role) VALUES(?,?,?,?)',
    bangding:'UPDATE user SET userame = ?,password = ? WHERE userId=?  ',
    queryAll:'SELECT * FROM user',  
    getUserByOpenid:'SELECT * FROM user WHERE userId = ? ', 
    getUserByInfo:'SELECT * FROM user WHERE username = ? AND password = ? ',
    deleteUserByInfo:'DELETE FROM user WHERE username = ? AND password = ? '
};
module.exports = UserSQL;