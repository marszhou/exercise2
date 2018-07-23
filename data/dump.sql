CREATE TABLE blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  user_id integer(128),
  title text(128),
  content text(128),
  create_time integer(128)
);
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name varchar(128)
);
CREATE TABLE category_item_set (
  id INTEGER PRIMARY KEY NOT NULL,
  category_id integer(128),
  item_id integer(128)
);
CREATE TABLE stacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  item_id integer(128),
  number integer(128)
);
CREATE TABLE cart (
  id INTEGER PRIMARY KEY NOT NULL,
  item_id integer(128),
  number integer(128),
  user_id integer(128)
);
CREATE TABLE brands (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  name varchar(128)
);
CREATE TABLE items (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  brand_id integer(128),
  name varchar(128),
  image varchar(128),
  price float(128)
);
CREATE TABLE sessions (
  id varchar(32) PRIMARY KEY NOT NULL,
  user_id integer(128),
  create_time integer(128)
);
CREATE TABLE users (
  id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  username varchar(128),
  password varchar(128),
  gender integer(128),
  salt varchar(128),
  create_time integer(128)
);
INSERT INTO items VALUES(1,1,'Apple iPad 平板电脑 9.7英寸','https://img14.360buyimg.com/n1/s450x450_jfs/t4402/174/572302090/605882/dd1e029d/58d161baN6fba1a2d.jpg',2888.0);
INSERT INTO items VALUES(2,2,'微软（Microsoft）新Surface Pro 二合一平板电脑 12.3英寸','https://img13.360buyimg.com/n1/s450x450_jfs/t11191/117/346065194/121847/b9326254/59edc053N71d7860b.jpg',6688.0);
INSERT INTO items VALUES(3,5,'华为(HUAWEI)M3 青春版 10.1英寸平板电脑','https://img12.360buyimg.com/n1/s450x450_jfs/t5992/313/1760238554/215733/cc254d82/593579cbNf8286c57.jpg',1998.9999999999999999);
INSERT INTO items VALUES(4,1,'Apple MacBook Air 13.3英寸笔记本电脑 银色','https://img11.360buyimg.com/n1/s450x450_jfs/t14848/365/2076510540/93902/e5883831/5a6947e5N39e16ed8.jpg',6497.9999999999999999);
INSERT INTO items VALUES(5,5,'荣耀MagicBook 14英寸轻薄窄边框笔记本电脑','https://img11.360buyimg.com/n1/s450x450_jfs/t17695/189/1800063307/223266/7f72f23e/5ad8525fN051e96d5.jpg',5698.9999999999999998);
INSERT INTO items VALUES(6,3,'戴尔DELL灵越燃7000 II 14.0英寸轻薄窄边框笔记本电脑','https://img14.360buyimg.com/n1/s450x450_jfs/t11719/257/481321980/260610/bc7201c5/59f15b8aN8fb3c4f5.jpg',6198.9999999999999998);
INSERT INTO items VALUES(7,1,'Apple MacBook Pro 13.3英寸笔记本电脑 深空灰色','https://img10.360buyimg.com/n1/s450x450_jfs/t18574/338/284983514/96329/ef344d13/5a694951Nbcb8b0a2.jpg',13899.0);
INSERT INTO items VALUES(8,4,'联想ThinkPad 翼480（1ACD）14英寸轻薄窄边框笔记本电脑','https://img14.360buyimg.com/n1/s450x450_jfs/t19750/245/24122623/198856/a7e0288e/5a582ce8N6a80b6d2.jpg',6998.9999999999999999);
INSERT INTO items VALUES(9,2,'微软（Microsoft）Surface Book 2 二合一平板笔记本 13.5英寸','https://img10.360buyimg.com/n1/s450x450_jfs/t11146/57/1729525408/242743/7bfea886/5a06621cNcd4cb490.jpg',16487.999999999999999);
INSERT INTO items VALUES(10,6,'外星人（alienware） R5 ALW17 17.3英寸八代标压高清独显双硬盘游戏笔记本','https://img10.360buyimg.com/n1/jfs/t16447/151/2658165759/107819/9df629ad/5ac1e78eN70332164.jpg',32998.999999999999999);
INSERT INTO items VALUES(11,1,'Apple 苹果 iMac pro 27英寸一体机','https://img14.360buyimg.com/n1/s450x450_jfs/t15745/246/723127295/60388/43a2539d/5a3b747bN2fd53ffd.jpg',90987.999999999999998);
INSERT INTO items VALUES(12,7,'惠普（HP）光影精灵II代 ','https://img12.360buyimg.com/n1/s450x450_jfs/t20191/115/413662628/174784/54b2ff29/5b0d1329N565d719e.jpg',6498.9999999999999999);
INSERT INTO items VALUES(13,3,'戴尔(DELL)灵越5680游戏台式电脑主机','https://img13.360buyimg.com/n1/s450x450_jfs/t17452/48/2331248274/227903/27059a72/5aefecf1N3734fe7c.jpg',7197.9999999999999997);
INSERT INTO items VALUES(14,4,'联想（Lenovo）AIO 520 致美一体机台式电脑23.8英寸','https://img13.360buyimg.com/n1/s450x450_jfs/t20995/351/1246535489/309909/cc0eac0a/5b235ac6N172c7472.jpg',4998.9999999999999999);
INSERT INTO brands VALUES(1,'苹果');
INSERT INTO brands VALUES(2,'微软');
INSERT INTO brands VALUES(3,'戴尔');
INSERT INTO brands VALUES(4,'联想');
INSERT INTO brands VALUES(5,'华为');
INSERT INTO brands VALUES(6,'外星人');
INSERT INTO brands VALUES(7,'惠普');
INSERT INTO categories VALUES(1,'平板电脑');
INSERT INTO categories VALUES(2,'笔记本');
INSERT INTO categories VALUES(3,'台式机');
INSERT INTO category_item_set VALUES(1,1,1);
INSERT INTO category_item_set VALUES(2,1,2);
INSERT INTO category_item_set VALUES(3,1,3);
INSERT INTO category_item_set VALUES(4,2,2);
INSERT INTO category_item_set VALUES(5,2,4);
INSERT INTO category_item_set VALUES(6,2,5);
INSERT INTO category_item_set VALUES(7,2,6);
INSERT INTO category_item_set VALUES(8,2,7);
INSERT INTO category_item_set VALUES(9,2,8);
INSERT INTO category_item_set VALUES(10,2,9);
INSERT INTO category_item_set VALUES(11,2,10);
