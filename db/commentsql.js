var commentSQL={
    insert:'INSERT INTO comment(commentContent,commentAuthor,commentTime,articleId) VALUES(?,?,?,?)',
    queryAllByArticleId:'SELECT * FROM comment WHERE articleId=?'
};
module.exports = commentSQL;