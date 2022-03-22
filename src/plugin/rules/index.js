import * as validate from '@/plugin/validate'

export default {
  install(Vue, options) {
    // 验证手机号码
    const isvalidateMobile = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证座机号码
    const isvalidatePhoneNumber = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatPhoneNumber(value)) {
          callback(new Error('请输入正确的座机号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证手机号码和座机号码
    const isvalidateMobilePhone = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatMobilePhone(value)) {
          callback(new Error('请输入正确的手机号码或者座机号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证网址
    const isvalidateUrl = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validateURL(value)) {
          callback(new Error('请输入正确的网址'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证身份证
    const isvalidateCardNo = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatCardNo(value)) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证车牌
    const isvalidateTruckNumber = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatTruckNumber(value)) {
          callback(new Error('请输入正确的车牌号码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证密码
    const isvalidateCode = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validPass(value)) {
          callback(new Error('必须是由6-20位数字和字母组合'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证新密码
    const isvalidatePass = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validPass(value)) {
          callback(new Error('必须是由6-20位数字和字母组合'))
        } else {
          if (rule.pass !== '') {
            rule.fnc && rule.fnc()
          }
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证确认新密码
    const isvalidateCheckPass = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validPass(value)) {
          callback(new Error('密码必须是由6-20位数字和字母组合'))
        } else if (value !== rule.pass) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证邮政编码
    const isvalidatePostcode = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validatPostcode(value)) {
          callback(new Error('请输入正确的邮政编码'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证中文
    const isvalidateZh = (rule, value, callback) => {
      if (value !== null && value !== '') {
        if (!validate.validateZh(value)) {
          callback(new Error('只能输入中文'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 验证不包含中文
    const isvalidateNotZh = (rule, value, callback) => {
      if (value !== null && value !== '') {
        var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
        if (reg.test(value)) {
          callback(new Error('输入内容不能包含中文'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 表单验证
    Vue.prototype.$rules = function(item) {
      const rules = []
      if (item.required) {
        rules.push({ required: true, message: (item.message || '该输入字符必填项'), trigger: ['blur', 'change'] })
      }
      if (item.maxLength) {
        rules.push({ min: 1, max: item.maxLength, message: '最多输入' + item.maxLength + '个字符', trigger: ['blur', 'change'] })
      }
      if (item.min && item.max) {
        rules.push({ min: item.min, max: item.max, message: '长度在' + item.min + '到' + item.max + '个字符', trigger: ['blur', 'change'] })
      }
      if (item.type) {
        const type = item.type
        switch (type) {
          case 'email':
            rules.push({ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] })
            break
          case 'number':
            rules.push({ type: 'number', message: '请输入数字值', trigger: ['blur', 'change'] })
            break
          case 'date':
            rules.push({ type: 'date', message: '请选择日期', trigger: ['blur', 'change'] })
            break
          case 'array':
            rules.push({ type: 'array', message: '值为数组类型', trigger: ['blur', 'change'] })
            break
          case 'mobile':
            rules.push({ validator: isvalidateMobile, trigger: ['blur', 'change'] })
            break
          case 'phone-number':
            rules.push({ validator: isvalidatePhoneNumber, trigger: ['blur', 'change'] })
            break
          case 'mobile-phone':
            rules.push({ validator: isvalidateMobilePhone, trigger: ['blur', 'change'] })
            break
          case 'url':
            rules.push({ validator: isvalidateUrl, trigger: ['blur', 'change'] })
            break
          case 'card-no':
            rules.push({ validator: isvalidateCardNo, trigger: ['blur', 'change'] })
            break
          case 'truck-number':
            rules.push({ validator: isvalidateTruckNumber, trigger: ['blur', 'change'] })
            break
          case 'code':
            rules.push({ validator: isvalidateCode, trigger: ['blur', 'change'] })
            break
          case 'pass':
            rules.push({ validator: isvalidatePass, pass: item.pass, fnc: item.fnc, trigger: ['blur', 'change'] })
            break
          case 'check-pass':
            rules.push({ validator: isvalidateCheckPass, pass: item.pass, trigger: ['blur', 'change'] })
            break
          case 'postcode':
            rules.push({ validator: isvalidatePostcode, pass: item.pass, trigger: ['blur', 'change'] })
            break
          case 'zh':
            rules.push({ validator: isvalidateZh, pass: item.pass, trigger: ['blur', 'change'] })
            break
          case 'not-zh':
            rules.push({ validator: isvalidateNotZh, pass: item.pass, trigger: ['blur', 'change'] })
            break
          default:
            rules.push({})
            break
        }
      }
      return rules
    }
  }
}
