
BEGIN;
INSERT INTO `rule` VALUES (1, 0, '控制台', 1502029281,1502029281, 'user', '/' 100);
INSERT INTO `rule` VALUES (2, 0, '权限管理', 1502029281,1502029281, 'user', '#' 100);
INSERT INTO `rule` VALUES (3, 2, '会员管理', 1502029281,1502029281, 'user', '/admin/auth/index' 100);
INSERT INTO `rule` VALUES (4, 2, '角色组', 1502029281,1502029281, 'user', '/admin/authGroup/index' 100);
INSERT INTO `rule` VALUES (5, 2, '权限规则', 1502029281,1502029281, 'user', '/admin/rule/index' 100);
INSERT INTO `rule` VALUES (6, 0, 'confd', 1502029281,1502029281, 'user', '#' 100);
INSERT INTO `rule` VALUES (7, 0, '敬请期待', 1502029281,1502029281, 'user', '/nindex' 100);

COMMIT;
