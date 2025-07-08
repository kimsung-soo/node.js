const { query } = require(".");

module.exports = {
  ProductList: {
    query: `SELECT 
              t1.*, 
              t2.path, 
              t3.category1, 
              t3.category2, 
              t3.category3
            FROM t_product t1
            JOIN t_image t2 ON t1.id = t2.product_id AND t2.type = 1
            JOIN t_category t3 ON t1.category_id = t3.id`,
  },
  ProductList2: {
    query: `SELECT 
              t3.*, 
              t4.path 
            FROM (
              SELECT 
                t1.*,
                t2.category1, 
                t2.category2,
                t2.category3
              FROM t_product t1
              JOIN t_category t2 ON t1.category_id = t2.id
            ) t3
            LEFT JOIN (
              SELECT * FROM t_image WHERE type=1
            ) t4 ON t3.id = t4.product_id`,
  },
  productDetail: {
    query: `SELECT 
              t1.*, 
              t2.path, 
              t3.category1,
              t3.category2,
              t3.category3
            FROM t_product t1
            JOIN t_image t2 ON t1.id = t2.product_id AND t2.type = 3
            JOIN t_category t3 ON t1.category_id = t3.id
            WHERE t1.id = ?`,
  },
  productMainImages: {
    query: `SELECT * FROM t_image WHERE product_id = ? AND type = 2`,
  },
  productInsert: {
    query: `INSERT INTO t_product SET ?`,
  },
  productImageInsert: {
    query: `INSERT INTO t_image SET ?`,
  },
  imageDelete: {
    query: `DELETE FROM t_image WHERE id = ?`,
  },
  categoryList: {
    query: `SELECT * FROM t_category`,
  },

  categoryInsert: {
    query: `insert into t_category set ?`,
  },

  sellerList: {
    query: `SELECT * FROM t_seller`,
  },
  signUp: {
    query: `INSERT INTO t_user SET ? ON DUPLICATE KEY UPDATE ?`,
  },
};
