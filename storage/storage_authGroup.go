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

// authGroup 的数据是只有创建的时候更改数据， 基本不会在中间有变化
// 所以authGroup不担心不同login数据不一致， 所以支持lru缓存
var dauthGroup *db.AuthGroup = &db.AuthGroup{}

type AuthGroup struct {
}

func (authGroup *AuthGroup) Sync(data interface{}) error {
	return dauthGroup.Sync(data)
}

func (authGroup *AuthGroup) Create(data interface{}) error {
	return dauthGroup.Insert(data)
}

// 账号信息支持只会生成时变化， 而且即使变化， 核心数据不会变， 所以暂时支持lru缓存
func (authGroup *AuthGroup) Get(data interface{}) error {
	return dauthGroup.Get(data)
}

func (authGroup *AuthGroup) Del(id, data interface{}) error {
	return dauthGroup.Del(id, data)
}

// 直接更新
func (authGroup *AuthGroup) Update(id, data interface{}) error {
	return dauthGroup.Update(id, data)
}

// 直接更新
func (authGroup *AuthGroup) UpdateCols(id interface{}, cols []string, data interface{}) error {
	return dauthGroup.UpdateCols(id, cols, data)
}

// 查询数据， 并返回总数
func (authGroup *AuthGroup) GetInfos(data interface{}, offset, limit int) error {
	return dauthGroup.GetInfos(data, offset, limit)
}

// 查询数据， 并返回总数
func (authGroup *AuthGroup) GetCount(data interface{}) (int64, error) {
	return dauthGroup.GetCount(data)
}

// 查询数据， 并返回总数
func (authGroup *AuthGroup) Find(data interface{}, condiBeans ...interface{}) error {
	return dauthGroup.Find(data, condiBeans)
}
