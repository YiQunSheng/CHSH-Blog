var ArticleSQL = {
    insert:'INSERT INTO article(articleTitle,articleAuthor,articleContent,articleWriteDate,tags,articleIsArDelete) VALUES(?,?,?,?,?,0)',
    changeInfo:'UPDATE user SET userName = ?,password = ? WHERE userId=?',
    queryAll:'SELECT * FROM article where articleIsDelete=0  order by articleId desc',
    queryFour:"SELECT * from article order by articleWriteDate desc limit 0,4",
    queryPage:'SELECT * from article limit order by articleWriteDate desc ?,?',
    queryByArticleId:'SELECT * FROM article WHERE articleId=?',
    queryAllLimit:'SELECT * FROM  article where articleIsDelete=0 order by articleWriteDate desc limit ?,?',
    queryArticleByName:'SELECT * FROM article where articleTitle LIKE ? and articleIsDelete=0',
    queryTags:'select tags,count(*) as count from article group by tags',
    queryArticleByTag:'SELECT * FROM article where tags =? and articleIsDelete=0',
    queryTagByArticleId:'SELECT tags FROM article where articleId=?',
    queryArticleTitleByArticleId:'SELECT articleTitle From article where articleId=?',
    likeArticle:'Insert into likeArticle(userId,articleId) values(?,?)',
    queryLikesByArticleId:'select count(*) as LikeNumbers from likeArticle where articleId =?',
    deleteArticleById:'update  article set articleIsDelete=1 where articleId=?',
    recommendArticle:'select article.articleId,article.articleAuthor,article.articleTitle,article.articleWriteDate ,count(article.articleId) as likeCount from article right join likeArticle on article.articleId = likeArticle.articleId group by article.articleId order by likeCount desc limit 0,4',
};
module.exports = ArticleSQL;