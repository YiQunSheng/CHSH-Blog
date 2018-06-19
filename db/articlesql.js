var ArticleSQL = {
    insert:'INSERT INTO article(articleTitle,articleAuthor,articleContent,articleWriteDate,tags) VALUES(?,?,?,?,?)',
    changeInfo:'UPDATE user SET userName = ?,password = ? WHERE userId=?',
    queryAll:'SELECT * FROM article order by articleId desc',
    queryFour:"SELECT * from article order by articleWriteDate desc limit 0,4",
    queryPage:'SELECT * from article limit order by articleWriteDate desc ?,?',
    queryByArticleId:'SELECT * FROM article WHERE articleId=?',
    queryAllLimit:'SELECT * FROM  article order by articleWriteDate desc limit ?,?',
    queryArticleByName:'SELECT * FROM article where articleTitle LIKE ?',
    queryTags:'select tags,count(*) as count from article group by tags'
};
module.exports = ArticleSQL;