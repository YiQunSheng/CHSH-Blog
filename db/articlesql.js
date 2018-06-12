var ArticleSQL = {
    insert:'INSERT INTO article(articleTitle,articleAuthor,articleContent,articleWriteDate) VALUES(?,?,?,?)',
    bangding:'UPDATE user SET userame = ?,password = ? WHERE userid=?  ',
    queryAll:'SELECT * FROM article order by articleId desc',
    queryFour:"SELECT * from article order by articleWriteDate desc limit 0,4",
    queryPage:'SELECT * from article limit ?,?',
    getUserByOpenid:'SELECT * FROM user WHERE userid = ? ',
    getUserByInfo:'SELECT * FROM user WHERE username = ? AND password = ? ',
    deleteUserByInfo:'DELETE FROM user WHERE username = ? AND password = ? ',
    queryOnePage:'Select from article limit ?,?'//arg1:how many do we ignore? arg2: the number we select
};
module.exports = ArticleSQL;