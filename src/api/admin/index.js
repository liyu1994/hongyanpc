import request from '@/plugin/axios'
// const qs = require('qs')

// 管理后台报表
export function getOrderStatistics(query) {
  return request({
    url: '/api/order/getOrderStatistics',
    method: 'get',
    params: query
  })
}

// 后台管理订单列表
export function getManagerList(data) {
  return request({
    url: '/api/order/getManagerList',
    method: 'post',
    data
  })
}

// 后台管理订单列表
export function listPage(data) {
  return request({
    url: '/api/user/listPage',
    method: 'post',
    data
  })
}

// 端商品分页列表
export function goodsListPage(data) {
  return request({
    url: '/api/goods/listPage',
    method: 'post',
    data
  })
}

// 导入商品
export function importGoods(file) {
  return request({
    url: '/api/goods/importGoods',
    method: 'post',
    data: file
  })
}

// 查询订单详情
export function getOrderDetail(query) {
  return request({
    url: '/api/order/getOrderDetail',
    method: 'get',
    params: query
  })
}

// 发货
export function sendOutOrder(data) {
  return request({
    url: '/api/order/sendOutOrder',
    method: 'post',
    data
  })
}

// 新增商品
export function addGoods(data) {
  return request({
    url: '/api/goods/addGoods',
    method: 'post',
    data
  })
}

// 查询商品详情
export function detail(query) {
  return request({
    url: '/api/goods/detail',
    method: 'get',
    params: query
  })
}

// 编辑商品
export function editGoods(data) {
  return request({
    url: '/api/goods/editGoods',
    method: 'post',
    data
  })
}

// 商品上下架
export function upOrDownStand(query) {
  return request({
    url: '/api/goods/upOrDownStand',
    method: 'get',
    params: query
  })
}

// 核销订单
export function writeOffOrder(data) {
  return request({
    url: '/api/order/writeOffOrder',
    method: 'post',
    data
  })
}

// 商品分类列表
export function goodsCategoryList(query) {
  return request({
    url: '/api/goodsCategory/list',
    method: 'get',
    params: query
  })
}

// 新增轮播图
export function bannerAdd(query) {
  return request({
    url: '/api/banner/add',
    method: 'get',
    params: query
  })
}

// 列表展示
export function bannerList(query) {
  return request({
    url: '/api/banner/list',
    method: 'get',
    params: query
  })
}

// 编辑
export function bannerEdit(data) {
  return request({
    url: '/api/banner/edit',
    method: 'post',
    data
  })
}

// 删除
export function bannerRemove(data) {
  return request({
    url: '/api/banner/remove',
    method: 'post',
    data
  })
}

// 文件上传
export function upLoad(file) {
  return request({
    url: '/api/file/onefile/upload',
    method: 'post',
    data: file
  })
}

// 后台管理发票列表
export function getInvoiceList(data) {
  return request({
    url: '/api/order/getInvoiceList',
    method: 'post',
    data
  })
}

// 完成开票
export function completeInvoice(query) {
  return request({
    url: '/api/order/completeInvoice',
    method: 'get',
    params: query
  })
}
