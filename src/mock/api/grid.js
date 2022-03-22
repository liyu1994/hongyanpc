const db = [
  { id: '1', name: '用户 1', address: '上海市普陀区金沙江路 1518 弄' },
  { id: '2', name: '用户 2', address: '上海市普陀区金沙江路 1517 弄' },
  { id: '3', name: '用户 3', address: '上海市普陀区金沙江路 1519 弄' },
  { id: '4', name: '用户 4', address: '上海市普陀区金沙江路 1516 弄' }
]

const list = [
  { 'fieldCaption': '标题', 'fieldName': 'title', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 0, 'width': 350 },
  { 'fieldCaption': '状态', 'fieldName': 'status', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 0, 'width': 80 },
  { 'fieldCaption': '点击', 'fieldName': 'pageviews', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 1, 'width': 80 },
  { 'fieldCaption': '类型', 'fieldName': 'type', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 0, 'width': 80 },
  { 'fieldCaption': '作者', 'fieldName': 'author', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 1, 'width': 80 },
  { 'fieldCaption': '图片', 'fieldName': 'image_uri', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 1, 'width': 150 },
  { 'fieldCaption': '时间', 'fieldName': 'display_time', 'visibleFlag': 1, 'sortFlag': 1, 'searchFlag': 1, 'width': 180 }
]

export default [
  {
    path: '/api/gridFields/listGridField',
    method: 'get',
    handle() {
      return { status: 200, message: null, data: list, rel: true }
    }
  },
  {
    path: '/api/gridFields/update',
    method: 'put',
    handle() {
      return { status: 200, message: null, data: '', rel: true }
    }
  },
  {
    path: '/api/gridFields/recover',
    method: 'post',
    handle() {
      return { status: 200, message: null, data: list, rel: true }
    }
  },
  {
    path: '/api/gridFields/saveSnapshot',
    method: 'post',
    handle() {
      return { status: 200, message: null, data: '', rel: true }
    }
  },
  {
    path: '/api/demo/business/issues/142/fetch.*',
    method: 'get',
    handle() {
      return {
        code: 0,
        msg: '获取数据成功',
        data: {
          list: db
        }
      }
    }
  },
  {
    path: '/api/demo/business/issues/142/detail.*',
    method: 'get',
    handle({ params }) {
      return {
        code: 0,
        msg: '获取数据成功',
        data: db.find(e => e.id === params.id)
      }
    }
  }
]
