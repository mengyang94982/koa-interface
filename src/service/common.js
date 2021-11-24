const connection = require("../config/database");
const dayjs = require("dayjs");

class CommonService {
  //文章总数
  async obtainArticleCount() {
    const statement = `SELECT count(id) as count FROM article`;
    const [res] = await connection.execute(statement);
    return res[0].count;
  }

  //阅读量总数
  async obtainArticleRead() {
    const statement = "SELECT SUM(`reading`) AS num FROM `article`";
    const [res] = await connection.execute(statement);
    return res[0].num;
  }

  //评论总数
  async obtainCommentCount() {
    const statement = `SELECT count(id) as count FROM comment`;
    const [res] = await connection.execute(statement);
    return res[0].count;
  }

  //文章点赞数量
  async obtainArticlePraise() {
    const statement = `SELECT SUM(praise) as num FROM article`;
    const [res] = await connection.execute(statement);
    return res[0].num;
  }

  async getHotArticle(query) {
    const { pagination,limit,start}=query
    let statement = `SELECT * FROM article WHERE update_time BETWEEN ${0} AND ${dayjs().unix()}`
    statement += ` ORDER BY reading DESC`
    if (pagination === '1') {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    const [res] = await connection.execute(statement)
    return res
  }

  async getHtoComment(query) {
    const { pagination,start,limit}=query
    let statement = `SELECT * FROM comment ORDER BY create_time DESC`
    if (pagination === '1') {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    const [res] = await connection.execute(statement)
    return res
    
  }

  async getHotTag(query) {
    const { pagination, start, limit } = query
    let statement = `SELECT * FROM label WHERE type=1 ORDER BY group_count DESC`
    if (pagination === '1') {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    const [res] = await connection.execute(statement)
    return res
  }

  async getFriendLink(query) {
    const { pagination, start, limit } = query
    let statement = `SELECT * FROM friend ORDER BY create_time DESC`
    if (pagination === '1') {
      statement += ` LIMIT ${start * limit},${limit}`;
    }
    const [res] = await connection.execute(statement)
    console.log(res)
    return res
  }
}

module.exports = new CommonService();
