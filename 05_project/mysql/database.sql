-- =================================================================
-- dev 데이터베이스 사용
-- =================================================================
USE dev;

-- =================================================================
-- 테이블 삭제 (참조 역순으로 안전하게 삭제)
-- =================================================================
DROP TABLE IF EXISTS `t_image`;
DROP TABLE IF EXISTS `t_product`;
DROP TABLE IF EXISTS `t_seller`;
DROP TABLE IF EXISTS `t_category`;
DROP TABLE IF EXISTS `t_user`;

-- =================================================================
-- 테이블 생성 (참조 순서대로 생성)
-- =================================================================

-- 1. 카테고리 테이블 (Dependencies: 없음)
CREATE TABLE `t_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category1` varchar(100) NOT NULL DEFAULT '',
  `category2` varchar(100) NOT NULL DEFAULT '',
  `category3` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 2. 판매자 테이블 (Dependencies: 없음)
-- [수정됨] id를 unsigned로 변경하여 t_product.seller_id와 타입을 일치시킴
CREATE TABLE `t_seller` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 3. 상품 테이블 (Dependencies: t_seller, t_category)
CREATE TABLE `t_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_name` varchar(200) NOT NULL DEFAULT '',
  `product_price` int(11) NOT NULL DEFAULT 0,
  `delivery_price` int(11) NOT NULL DEFAULT 0,
  `add_delivery_price` int(11) NOT NULL DEFAULT 0,
  `tags` varchar(100) DEFAULT NULL,
  `outbound_days` int(2) NOT NULL DEFAULT 5,
  `seller_id` int(11) unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `active_yn` enum('Y','N') NOT NULL DEFAULT 'Y',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `seller_id` (`seller_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `t_product_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `t_seller` (`id`),
  CONSTRAINT `t_product_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `t_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




-- 4. 이미지 테이블 (Dependencies: t_product)
CREATE TABLE `t_image` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) unsigned NOT NULL,
  `type` int(1) NOT NULL DEFAULT 1 COMMENT '1-썸네일, 2-제품사진, 3-제품설명사진',
  `path` varchar(150) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `t_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `t_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 5. 사용자 테이블 (Dependencies: 없음)
CREATE TABLE `t_user` (
  `email` varchar(50) NOT NULL,
  `type` int(1) NOT NULL DEFAULT 1 COMMENT '1-buyer, 2-seller',
  `nickname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- 상품 (product), 카테고리(category), 이미지(image)

 select *
 from t_seller;
 insert into t_seller (name,email,phone)
 values ('seller01', '01@email.com', '010-0000-0000');
 
 select *
 from t_category;
 insert into t_category(category1, category2, category3)
 values ('컴퓨터', '주요부품', '메인보드1');
  insert into t_category(category1, category2, category3)
 values ('컴퓨터', '주변기기', '마우스');
 
 select * 
from t_product;
 INSERT INTO t_product 
    (product_name, product_price, delivery_price, seller_id, category_id) 
VALUES 
    ('lg 마우스', 15000, 3000, 1, 2);
     INSERT INTO t_product 
    (product_name, product_price, delivery_price, seller_id, category_id) 
VALUES 
    ('logitech 마우스', 18000, 3000, 1, 2);
    
select *
from t_image;
insert into t_image (product_id, type, path)
values(3, 1, 'upload/2/thumnail.jpg');
insert into t_image (product_id, type, path)
values(4, 1, 'upload/2/thumnail2.jpg');

select *
from t_category;
select *
from t_seller;



DELETE FROM t_image 
WHERE product_id = 3 
  AND path = 'upload/2/thumnail2.jpg';
select concat(c.category1, '/',c.category2, '/', c.category3)
as category
,p.id
,p.product_name
,p.delivery_price
,i.*
from t_product p
join t_category c
on p.category_id = c.id
join t_image i
on p.id = i. product_id
and i.type =1  -- 메인이미지.
where p.product_name = 'lg 마우스'; 


DELETE FROM t_product WHERE id IN (3, 4);
 
SELECT 
              t1.*, 
              t2.path, 
              t3.category1, 
              t3.category2, 
              t3.category3
            FROM t_product t1
            JOIN t_image t2 ON t1.id = t2.product_id AND t2.type = 1
            JOIN t_category t3 ON t1.category_id = t3.id;