package storage

import (
	// "epogt/logger"
	// "epogt/storage/redis"
	// "errors"
	// "epogt/login/config"
	"epogt/admin/storage/db"
	// "epogt/admin/storage/redis"
	// "epogt/util"
	// "errors"
	// "fmt"
)

// rule 的数据是只有创建的时候更改数据， 基本不会在中间有变化
// 所以rule不担心不同login数据不一致， 所以支持lru缓存
var drule *db.Rule = &db.Rule{}

type Rule struct {
}

func (rule *Rule) Sync(data interface{}) error {
	return drule.Sync(data)
}

func (rule *Rule) Create(data interface{}) error {
	return drule.Insert(data)
}

func (rule *Rule) Del(id, data interface{}) error {
	return rule.Del(id, data)
}

// 账号信息支持只会生成时变化， 而且即使变化， 核心数据不会变， 所以暂时支持lru缓存
func (rule *Rule) Get(data interface{}) error {
	return drule.Get(data)
}

// 直接更新
func (rule *Rule) UpdateCols(id interface{}, cols []string, data interface{}) error {
	return drule.UpdateCols(id, cols, data)
}

// 直接更新
func (rule *Rule) Update(id, data interface{}) error {
	return drule.Update(id, data)
}

// 查询数据， 并返回总数
func (rule *Rule) GetInfos(data interface{}, offset, limit int) error {
	return drule.GetInfos(data, offset, limit)
}

// 查询数据， 并返回总数
func (rule *Rule) GetCount(data interface{}) (int64, error) {
	return drule.GetCount(data)
}

// 查询数据， 并返回总数
func (rule *Rule) Find(data interface{}, condiBeans ...interface{}) error {
	return drule.Find(data, condiBeans)
}
