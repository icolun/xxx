package db

import (
	// "epogt/logger"
	"epogt/storage/db"
	"errors"
	// "github.com/go-xorm/xorm"
)

type Rule struct {
}

func (rule *Rule) Sync(data interface{}) error {
	return sync(DB_RULE_ID, data)
}

func (rule *Rule) Get(data interface{}) error {
	has, err := get(DB_RULE_ID, data)
	if err != nil {
		return err
	}
	if !has {
		return errors.New("get rule null")
	}
	return nil
}

func (rule *Rule) Del(id, data interface{}) error {
	_, err := delete(DB_RULE_ID, id, data)
	return err
}

func (rule *Rule) UpdateCols(id interface{}, cols []string, data interface{}) error {
	_, err := updateCols(DB_RULE_ID, id, cols, data)
	return err
}

func (rule *Rule) Update(id, data interface{}) error {
	_, err := update(DB_RULE_ID, id, data)
	return err
}

func (rule *Rule) Insert(data interface{}) error {
	_, err := insert(DB_RULE_ID, data)
	return err
}

func (rule *Rule) GetCount(data interface{}) (int64, error) {
	return db.GetEngine(DB_RULE_ID).Count(data)
}

func (rule *Rule) GetInfos(data interface{}, offset, limit int) error {
	engine := db.GetEngine(DB_RULE_ID)
	err := engine.Limit(limit, offset).Desc("id").Find(data)
	return err
}

func (rule *Rule) Find(data interface{}, condiBeans ...interface{}) error {
	engine := db.GetEngine(DB_RULE_ID)
	return engine.Find(data)
}
