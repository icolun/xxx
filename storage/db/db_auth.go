package db

import (
	// "epogt/logger"
	"epogt/storage/db"
	"errors"
	// "github.com/go-xorm/xorm"
)

type Auth struct {
}

func (auth *Auth) Sync(data interface{}) error {
	return sync(DB_AUTH_ID, data)
}

func (auth *Auth) Get(data interface{}) error {
	has, err := get(DB_AUTH_ID, data)
	if err != nil {
		return err
	}
	if !has {
		return errors.New("get auth null")
	}
	return nil
}

func (auth *Auth) Update(id, data interface{}) error {
	_, err := update(DB_AUTH_ID, id, data)
	return err
}

func (auth *Auth) UpdateCols(id interface{}, cols []string, data interface{}) error {
	_, err := updateCols(DB_AUTH_ID, id, cols, data)
	return err
}

func (auth *Auth) Insert(data interface{}) error {
	_, err := insert(DB_AUTH_ID, data)
	return err
}

func (auth *Auth) Del(id, data interface{}) error {
	_, err := delete(DB_AUTH_ID, id, data)
	return err
}

func (auth *Auth) GetCount(data interface{}) (int64, error) {
	return db.GetEngine(DB_AUTH_ID).Count(data)
}

func (auth *Auth) GetInfos(data interface{}, offset, limit int) error {
	engine := db.GetEngine(DB_AUTH_ID)
	err := engine.Limit(limit, offset).Desc("id").Find(data)
	return err
}
