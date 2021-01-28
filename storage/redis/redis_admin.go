package redis

// import (
// 	"epogt/storage/redis"
// 	"errors"
// 	"fmt"
// )

type Auth struct {
}

// type AuthInterface interface {
// 	SetId(int64)
// }

// func (acount *Auth) GetUuidKey() string {
// 	return "uuid:auth"
// }

// func (auth *Auth) GetKey(auth string) string {
// 	return fmt.Sprintf("auth:%v", auth)
// }

// func (auth *Auth) Create(auth string, user AuthInterface) error {
// 	conn := redis.GetConn(REDIS_ADMIN_ID)
// 	if conn == nil {
// 		return errors.New("create conn is null")
// 	}
// 	defer conn.Close()
// 	hashobj := redis.NewRedisHashObj(auth.GetKey(auth), conn)
// 	isexit, err := hashobj.IsExist()
// 	if isexit {
// 		return errors.New("auth also exits")
// 	}
// 	if err != nil {
// 		return err
// 	}
// 	stringobj := redis.NewRedisStringObj(auth.GetUuidKey(), conn)
// 	uuid, err := stringobj.Incr()
// 	if err != nil {
// 		return err
// 	}
// 	user.SetId(uuid)
// 	n, err := hashobj.MSetForStruct(user)
// 	if n <= 0 {
// 		return errors.New("error")
// 	}
// 	return err

// }
// func (auth *Auth) Get(auth string, user interface{}) error {
// 	conn := redis.GetConn(REDIS_ADMIN_ID)
// 	hashobj := redis.NewRedisHashObj(auth.GetKey(auth), conn)
// 	defer hashobj.Close()
// 	isexit, err := hashobj.IsExist()
// 	if !isexit {
// 		return errors.New("auth not exits")
// 	}
// 	if err != nil {
// 		return err
// 	}
// 	sfvalues, err := hashobj.GetAll()
// 	if err != nil {
// 		return err
// 	}
// 	err = redis.ScanStruct(sfvalues, user)
// 	return err
// }

// func (auth *Auth) Update(auth string, user interface{}) error {
// 	conn := redis.GetConn(REDIS_ADMIN_ID)
// 	hashobj := redis.NewRedisHashObj(auth.GetKey(auth), conn)
// 	defer hashobj.Close()
// 	n, err := hashobj.MSetForStruct(user)
// 	if err != nil {
// 		return err
// 	}
// 	if n <= 0 {
// 		return errors.New("error")
// 	}
// 	return nil
// }
