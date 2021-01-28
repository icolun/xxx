package gm

// import (
// 	"epogt/message"
// 	// "epogt/message/jsonp"
// 	"epogt/common"
// 	"epogt/http"
// 	"epogt/logger"
// 	"epogt/util"
// 	"errors"
// 	"fmt"
// 	nethttp "net/http"

// 	"github.com/gin-gonic/gin"
// 	// "strconv"
// )

// type handler func(*gin.Context) (int, error)

// type handlerstruct struct {
// 	h     handler
// 	subhs []handler
// }

// // 不管post还是get只有一个cmd对应一个handler
// // 其實可以使用gin的中間件
// // 這裏直接自己封裝， 個人習慣問題
// var handers = map[int32]*handlerstruct{}

// func sethandler(msgName string, h handler, h1 ...handler) {
// 	msgId := message.GetJsonCmd(msgName)
// 	if msgId <= 0 {
// 		logger.Panicf("sethandler msgName(%v)", msgName)
// 	}
// 	logger.Infof(":: sethandler msgName(%v)", msgName)
// 	hstruct := &handlerstruct{h: h, subhs: h1}
// 	handers[msgId] = hstruct
// }

// func gethandler(msgId int32) *handlerstruct {
// 	return handers[msgId]
// }

// func (hstruct *handlerstruct) launch(c *gin.Context) (int, error) {
// 	for _, h := range hstruct.subhs {
// 		if ret, err := h(c); err != nil {
// 			return ret, err
// 		}
// 	}
// 	if hstruct.h == nil {
// 		return common.RH_NotHandler, errors.New(fmt.Sprintf("%v not handler", hstruct))
// 	}
// 	return hstruct.h(c)
// }

// func Post(c *gin.Context) {
// 	var err error
// 	var cmd int32
// 	var ret int
// 	cmd = util.AtoiInt32(c.PostForm("cmd"))
// 	hstruct := gethandler(cmd)

// 	if hstruct == nil {
// 		http.FailJsonResponse(c, nethttp.StatusFound, common.RH_NotHandler, fmt.Sprintf("%v not handler", cmd))
// 		return
// 	}
// 	ret, err = hstruct.launch(c)
// 	logger.Infof("post cmd(%v) cmdname(%v) c(%v) err(%v)", cmd, message.GetJsonCmdName(cmd), c, err)

// 	if err == nil {
// 		return
// 	}

// 	http.FailJsonResponse(c, nethttp.StatusForbidden, ret, fmt.Sprintf("%v", err))

// }

// func Get(c *gin.Context) {
// 	var cmd int32
// 	var err error
// 	var ret int
// 	cmd = util.AtoiInt32(c.Query("cmd"))
// 	hstruct := gethandler(cmd)

// 	if hstruct == nil {
// 		http.FailJsonResponse(c, nethttp.StatusFound, common.RH_NotHandler, fmt.Sprintf("%v not handler", message.GetJsonCmdName(int32(cmd))))
// 		return
// 	}
// 	ret, err = hstruct.launch(c)
// 	logger.Infof("post cmd(%v) cmdname(%v) c(%v) err(%v)", cmd, message.GetJsonCmdName(int32(cmd)), c, err)

// 	if err == nil {
// 		return
// 	}
// 	http.FailJsonResponse(c, nethttp.StatusForbidden, ret, fmt.Sprintf("%v", err))
// }
