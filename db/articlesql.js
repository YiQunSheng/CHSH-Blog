var ArticleSQL = {
    insert:'INSERT INTO article(articleTitle,articleAuthor,articleContent,articleWriteDate) VALUES(?,?,?,?)',
    bangding:'UPDATE user SET userame = ?,password = ? WHERE userid=?  ',
    queryAll:'SELECT * FROM article order by articleId desc',
    queryFour:"SELECT * from article order by articleWriteDate desc limit 0,4",
    queryPage:'SELECT * from article limit ?,?',
    queryByArticleId:'SELECT * FROM article WHERE articleId=?',
    queryAllLimit:'SELECT * FROM  article limit ?,?'
};
module.exports = ArticleSQL;