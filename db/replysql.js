var replySQL={

    insert:'INSERT INTO reply(replyAuthor,beRepliedAuthor,replyContent,commentId,replyTime) VALUES(?,?,?,?,?)',
    queryAll:'SELECT * FROM reply',
    queryAllBycommentId:'SELECT * FROM reply WHERE commentId=?'
};
module.exports = replySQL;