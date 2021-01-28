package db

import (
	"epogt/storage/db"
)

const (
	DB_ID_LOCAL = 1 // 固定本区redis id 是1
	DB_ID_CROSS = 2 // 固定跨区redis id 是2
)

const (
	DB_AUTH_ID      = DB_ID_LOCAL
	DB_AUTHGROUP_ID = DB_ID_LOCAL
	DB_RULE_ID      = DB_ID_LOCAL
)

func sync(dbId int32, data interface{}) error {
	return db.GetEngine(dbId).Sync2(data)
}

func get(dbId int32, data interface{}) (bool, error) {
	return db.GetEngine(dbId).Get(data)
}

func insert(dbId int32, data ...interface{}) (int64, error) {
	return db.GetEngine(dbId).Insert(data)
}

func update(dbId int32, id interface{}, data ...interface{}) (int64, error) {
	return db.GetEngine(dbId).Update(id, data)
}

func updateCols(dbId int32, id interface{}, cols []string, data interface{}) (int64, error) {

	return db.GetEngine(dbId).ID(id).Cols(cols...).Update(data)
}

func delete(dbId int32, id interface{}, data interface{}) (int64, error) {
	return db.GetEngine(dbId).ID(id).Delete(data)
}
