package db

import (
	// "epogt/logger"
	"epogt/storage/db"
	"errors"
	// "github.com/go-xorm/xorm"
)

type AuthGroup struct {
}

func (authGroup *AuthGroup) Sync(data interface{}) error {
	return sync(DB_AUTHGROUP_ID, data)
}

func (authGroup *AuthGroup) Get(data interface{}) error {
	has, err := get(DB_AUTHGROUP_ID, data)
	if err != nil {
		return err
	}
	if !has {
		return errors.New("get authGroup null")
	}
	return nil
}

func (authGroup *AuthGroup) Update(id, data interface{}) error {
	_, err := update(DB_AUTHGROUP_ID, id, data)
	return err
}

func (authGroup *AuthGroup) UpdateCols(id interface{}, cols []string, data interface{}) error {
	_, err := updateCols(DB_AUTHGROUP_ID, id, cols, data)
	return err
}

func (authGroup *AuthGroup) Del(id, data interface{}) error {
	_, err := delete(DB_AUTHGROUP_ID, id, data)
	return err
}

func (authGroup *AuthGroup) Insert(data interface{}) error {
	_, err := insert(DB_AUTHGROUP_ID, data)
	return err
}

func (authGroup *AuthGroup) GetCount(data interface{}) (int64, error) {
	return db.GetEngine(DB_AUTHGROUP_ID).Count(data)
}

func (authGroup *AuthGroup) GetInfos(data interface{}, offset, limit int) error {
	engine := db.GetEngine(DB_AUTHGROUP_ID)
	err := engine.Limit(limit, offset).Desc("id").Find(data)
	return err
}

func (authGroup *AuthGroup) Find(data interface{}, condiBeans ...interface{}) error {
	engine := db.GetEngine(DB_AUTHGROUP_ID)
	return engine.Find(data)
}
