var ArticleSQL = {
    insert:'INSERT INTO article(articleTitle,articleAuthor,articleContent,articleWriteDate) VALUES(?,?,?,?)',
    bangding:'UPDATE user SET userame = ?,password = ? WHERE userid=?  ',
    queryAll:'SELECT * FROM article order by articleId desc',
    queryFour:"SELECT * from article order by articleWriteDate desc limit 0,4",
    queryPage:'SELECT * from article limit order by articleWriteDate desc ?,?',
    queryByArticleId:'SELECT * FROM article WHERE articleId=?',
    queryAllLimit:'SELECT * FROM  article order by articleWriteDate desc limit ?,?'
};
module.exports = ArticleSQL;