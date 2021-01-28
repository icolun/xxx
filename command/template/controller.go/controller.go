package controller

import (

	// "epogt/admin/session"

	// ehttp "epogt/http"

	"github.com/gin-gonic/gin"
)

var ctempl *Tmpl = &Tmpl{}

func GetTmpl() *Tmpl {
	return ctempl
}

type Tmpl struct {
}

////////////////////////////////
func (item *Tmpl) Del(c *gin.Context) {
	item.Del1(c)
}

// 增加， 后台临时使用
func (item *Tmpl) Add(c *gin.Context) {
	item.Add1(c)
}

func (item *Tmpl) Edit(c *gin.Context) {
	item.Edit1(c)
}

//账号主页面
func (item *Tmpl) Index(c *gin.Context) {
	HTML(c, "auth/index.tmpl", gin.H{"groups": groups})
}

func (item *Tmpl) Indexp(c *gin.Context) {
	item.Indexp1(c)
}

//////////////////////////////////////
// 获取管理账号信息
func (item *Tmpl) Indexp1(c *gin.Context) error {
	return JsonSuccess(c, gin.H{"total": 0, "rows": nil})
}

func (item *Tmpl) Add1(c *gin.Context) error {
	return JsonSuccess(c, gin.H{"code": 0, "data": nil, "msg": "添加成功"})
}

func (item *Tmpl) Edit1(c *gin.Context) error {
	return JsonSuccess(c, gin.H{"code": 0, "data": nil, "msg": "更新成功"})
}

// 删除账号
func (item *Tmpl) Del1(c *gin.Context) error {
	return JsonSuccess(c, gin.H{"code": 0, "data": nil, "msg": "删除成功"})
}
