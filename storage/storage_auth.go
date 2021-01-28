package storage

import (
	// "epogt/logger"
	// "epogt/storage/redis"
	// "errors"
	// "epogt/login/config"
	"epogt/admin/storage/db"
	"epogt/admin/storage/redis"
	// "epogt/util"
	// "errors"
	// "fmt"
)

// auth 的数据是只有创建的时候更改数据， 基本不会在中间有变化
// 所以auth不担心不同login数据不一致， 所以支持lru缓存
var rauth *redis.Auth = &redis.Auth{}
var dauth *db.Auth = &db.Auth{}

type Auth struct {
}

func (auth *Auth) Sync(data interface{}) error {
	return dauth.Sync(data)
}

func (auth *Auth) Create(data interface{}) error {
	return dauth.Insert(data)
}

func (auth *Auth) Del(id, data interface{}) error {
	return dauth.Del(id, data)
}

// 账号信息支持只会生成时变化， 而且即使变化， 核心数据不会变， 所以暂时支持lru缓存
func (auth *Auth) Get(data interface{}) error {
	return dauth.Get(data)
}

// 直接更新
func (auth *Auth) Update(id, data interface{}) error {
	return dauth.Update(id, data)
}

// 直接更新
func (auth *Auth) UpdateCols(id interface{}, cols []string, data interface{}) error {
	return dauth.UpdateCols(id, cols, data)
}

// 查询数据， 并返回总数
func (auth *Auth) GetInfos(data interface{}, offset, limit int) error {
	return dauth.GetInfos(data, offset, limit)
}

// 查询数据， 并返回总数
func (auth *Auth) GetCount(data interface{}) (int64, error) {
	return dauth.GetCount(data)
}
