CREATE DATABASE `music_academy`;

USE `music_academy`;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- music_academy.profile_image definition

CREATE TABLE `profile_image` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `format` varchar(100) NOT NULL,
  `blob_data` longblob NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- music_academy.user_role definition

CREATE TABLE `user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `english_name` varchar(100) NOT NULL,
  `persian_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- music_academy.user_profile definition

CREATE TABLE `user_profile` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `role` bigint NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `national_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profile_picture` bigint DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `user_profile_user_role_FK` (`role`),
  KEY `user_profile_profile_image_FK` (`profile_picture`),
  CONSTRAINT `user_profile_profile_image_FK` FOREIGN KEY (`profile_picture`) REFERENCES `profile_image` (`id`),
  CONSTRAINT `user_profile_user_role_FK` FOREIGN KEY (`role`) REFERENCES `user_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
-- music_academy.music_class definition

CREATE TABLE `music_class` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `teacher` varchar(100) NOT NULL,
  `student` varchar(100) NOT NULL,
  `session_price` bigint NOT NULL,
  `week_day` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `houre` varchar(100) NOT NULL,
  `duration` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `session_left` bigint NOT NULL,
  `absence_left` bigint NOT NULL,
  `is_finish` tinyint(1) NOT NULL DEFAULT '0',
  `is_payed` tinyint(1) NOT NULL,
  `teacherـpercentage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `music_class_user_profile_FK` (`teacher`),
  KEY `music_class_user_profile_FK_1` (`student`),
  CONSTRAINT `music_class_user_profile_FK` FOREIGN KEY (`teacher`) REFERENCES `user_profile` (`username`),
  CONSTRAINT `music_class_user_profile_FK_1` FOREIGN KEY (`student`) REFERENCES `user_profile` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
-- music_academy.music_session definition

CREATE TABLE `music_session` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `class_id` bigint NOT NULL,
  `status` enum('presence','valid_absence','invalid_absence') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` bigint NOT NULL,
  `description` longtext,
  `session_date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `music_session_music_class_FK` (`class_id`),
  CONSTRAINT `music_session_music_class_FK` FOREIGN KEY (`class_id`) REFERENCES `music_class` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
-- music_academy.error_messages definition

CREATE TABLE `error_messages` (
  `id` bigint NOT NULL,
  `err_english` longtext NOT NULL,
  `err_persian` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.error_messages (id,err_english,err_persian) VALUES
	 (1,'The operation was successful','عملیات با موفقیت انجام شد'),
	 (2,'404 Not Found','صفحه پیدا نشد. ارور ۴۰۴'),
	 (3,'500 Internal Server Error','مشکل از سرور. ارور ۵۰۰'),
	 (4,'Token Expired','توکن منغضی شده است'),
	 (5,'Error happend try again later','مشکلی پیش آمده بعدا دوباره تلاش کنید'),
	 (6,'This username has already been registered','این نام کاربری قبلا ثبت شده است'),
	 (7,'Invalid username or password','نام کاربری یا رمز عبور اشتباه وارد شده است'),
	 (8,'Invalid username','نام کاربری به درستی وارد نشده است'),
	 (9,'Invalid password','رمز عبور به درستی وارد نشده است'),
	 (10,'Invalid name','نام ورودی نا معتبر است');
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.error_messages (id,err_english,err_persian) VALUES
	 (11,'Invalid last name','نام خانوادگی ورودی نا معتیر است'),
	 (12,'Invalid mobile','شماره همراه ورودی نا معتبر است'),
	 (13,'Invalid phone','شماره تلفن ثابت ورودی نا معتبر است'),
	 (14,'Invalid email','پست الکترونیک ورودی نامغتبر است'),
	 (15,'Invalid address','آدرس ورودی نا معتبر است'),
	 (16,'Invalid national id','کد ملی ورودی نا معتبر است'),
	 (17,'You do not have permission to access','شما اجازه دسترسی را ندارید'),
	 (18,'Invalid role','نقش کاربری وارده اشتباه است'),
	 (19,'Invalid teacher','نام کاربری استاد نا معتبر است'),
	 (20,'Invalid strident','نام کاربری هنرجو نا معتبر است');

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.error_messages (id,err_english,err_persian) VALUES
	 (21,'Invalid session price','قیمت هر جلسه نا معتبر است'),
	 (22,'Invalid week day','روز کلاس نا معتبر است'),
	 (23,'Invalid houre','ساعت کلاس نا معتبر است'),
	 (24,'Invalid duration','مثدار زمان کلاس نا معتبر است'),
	 (25,'Invalid session left','جلسات باقی مانده نا معتبر است'),
	 (26,'Invalid absence left','غیبت های باقی مانده نا معتبر است'),
	 (27,'Invalid payed bool value','مقدار پرداخت شده؟ نا معتبر است'),
	 (28,'Invalid teacher percentage','درضد استاد نا معتبر است'),
	 (29,'input user is not normal user','نقش کاربری کاربر وارد شده باید کاربر نرمال باشد'),
	 (30,'input user is not teacher','نقش کاربری کاربر وارد شده باید استاد باشد');

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.error_messages (id,err_english,err_persian) VALUES
	 (31,'input user is not admin','نقش کاربری کاربر وارد شده باید مدیر باشد'),
	 (32,'This class conflicts with another class.','این کلاس با کلاس دیگری تداخل دارد'),
	 (33,'Invalid class id','آی دی کلاس نا معتبر است'),
	 (34,'There is no available session of absence left','جلسه با غیبت برای کلاس باقی نمانده'),
	 (35,'Invalid boolean value','مقدار منطقی نا معتبر است'),
	 (36,'Invalid Session id','آی دی جلسه نامعتبر است'),
	 (37,'Invalid Session status','وصعیت جلسه نامعتبر است'),
	 (38,'Invalid session price','قیمت جلسه نامعتبر است'),
	 (39,'Invalid session description','توضیحات جلسه نامعتبر است'),
	 (40,'Invalid session date','تاریخ جلسه نامعتبر است');

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.error_messages (id,err_english,err_persian) VALUES
	 (41,'Class hase been finished','جلسات کلاس تمام شده یا کلاس کنسل شده'),
	 (42,'Invalid start date','تاریخ شروع نا معتبر است'),
	 (43,'Invalid finish date','تاریخ پایان نا معتبر است'),
	 (44,'Invalid teacher username','نام کاربری معلم نا معتبر است'),
	 (45,'Invalid profile picture','تصویر پروفایل کاربر نا معتبر است'),
	 (46,'Invalid profile id','آی دی تصویر پروفایل نا معتبر است'),
	 (47,'valid token','احراز هویت با موفقیت انجام شده');

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.user_role (id,english_name,persian_name) VALUES
	 (1,'user','کاربر'),
	 (2,'teacher','معلم'),
	 (3,'admin','مدیر');

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
INSERT INTO music_academy.user_profile (username,password,is_active,`role`,name,last_name,mobile,phone,email,address,national_id,profile_picture) VALUES
	 ('admin','$2a$08$9JB0uFrWu9TkWwzgij1ZrOoCB4TsS1ZFxkfXKSoB7l1gZ8UKnlwwK',1,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);