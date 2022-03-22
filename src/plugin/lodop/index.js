import store from '@/store'
import { MessageBox } from 'element-ui'
var CreatedOKLodop7766 = null

// ====判断是否需要安装CLodop云打印服务器:====
function needCLodop() {
  try {
    var ua = navigator.userAgent
    if (ua.match(/Windows\sPhone/i) != null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true
    var verTrident = ua.match(/Trident\D?\d+/i)
    var verIE = ua.match(/MSIE\D?\d+/i)
    var verOPR = ua.match(/OPR\D?\d+/i)
    var verFF = ua.match(/Firefox\D?\d+/i)
    var x64 = ua.match(/x64/i)
    if ((verTrident === null) && (verIE === null) && (x64 !== null)) {
      return true
    } else if (verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64 !== null)) {
        return true
      }
    } else if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if (verOPR[0] >= 32) {
        return true
      }
    } else if ((verTrident === null) && (verIE === null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i)
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) {
          return true
        }
      }
    }
    return false
  } catch (err) {
    return true
  }
}
/* export function needCLodop(){
  try{
    var ua=navigator.userAgent
    if (ua.match(/Windows\sPhone/i) !=null) return true
    if (ua.match(/iPhone|iPod/i) != null) return true
    if (ua.match(/Android/i) != null) return true
    if (ua.match(/Edge\D?\d+/i) != null) return true
    var verTrident=ua.match(/Trident\D?\d+/i)
    var verIE=ua.match(/MSIE\D?\d+/i)
    var verOPR=ua.match(/OPR\D?\d+/i)
    var verFF=ua.match(/Firefox\D?\d+/i)
    var x64=ua.match(/x64/i)
    console.log(ua)
    console.log(verTrident)
    console.log(verIE)
    console.log(x64)
    if ((verTrident == null) && (verIE == null) && (x64 !== null)) {
      return true
    } else if ( verFF !== null) {
      verFF = verFF[0].match(/\d+/)
      if ((verFF[0] >= 41) || (x64 !== null)) return true
    } else if ( verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/)
      if ( verOPR[0] >= 32 ) return true
    } else if ((verTrident == null) && (verIE == null)) {
      var verChrome=ua.match(/Chrome\D?\d+/i)
      if ( verChrome !== null ) {
        verChrome = verChrome[0].match(/\d+/)
        if (verChrome[0] >= 41) return true
      }
    }
    return false
  } catch(err) {
    return true
  }
} */

if (needCLodop()) {
  var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement
  var oscript = document.createElement('script')
  // oscript.src = 'https://localhost:8443/CLodopfuncs.js?priority=1'
  oscript.src = 'http://localhost:8000/CLodopfuncs.js?priority=1'
  head.insertBefore(oscript, head.firstChild)
  // 引用双端口(8000和18000）避免其中某个被占用：
  // oscript = document.createElement('script')
  // oscript.src = 'http://localhost:18000/CLodopfuncs.js?priority=0'
  // head.insertBefore(oscript, head.firstChild)
}

function lodopError() {
  MessageBox.alert("CLodop云打印服务未安装！点击这里<a href='./static/CLodop_Setup_for_Win32NT.exe' target='_self' style='color:#f1595d'>执行安装</a>，安装后请刷新页面。", '提示', {
    dangerouslyUseHTMLString: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    type: 'error',
    confirmButtonText: '知道了',
    callback: action => {
    }
  })
}

// ====获取LODOP对象的主过程：====
export function getLodop(oOBJECT, oEMBED) {
  var LODOP
  try {
    var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0)
    if (needCLodop()) {
      try {
        LODOP = getCLodop()
      } catch (err) {
        // console.log(err)
      }
      if (!LODOP && document.readyState !== 'complete') {
        alert('C-Lodop没准备好，请稍后再试！')
        return
      }
      if (!LODOP) {
        lodopError()
        return
      } else {
        if (LODOP.CVERSION < '3.0.2.9') {
          lodopError()
        }
        if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED)
        if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT)
      }
    } else {
      // var is64IE  = isIE && (navigator.userAgent.indexOf('x64') >= 0)
      // =====如果页面有Lodop就直接使用，没有则新建:==========
      if (oOBJECT !== undefined || oEMBED !== undefined) {
        if (isIE) {
          LODOP = oOBJECT
        } else {
          LODOP = oEMBED
        }
      } else if (CreatedOKLodop7766 === null) {
        LODOP = document.createElement('object')
        LODOP.setAttribute('width', 0)
        LODOP.setAttribute('height', 0)
        LODOP.setAttribute('style', 'position:absolute;left:0px;top:-100px;width:0px;height:0px;')
        if (isIE) LODOP.setAttribute('classid', 'clsid:2105C259-1E0C-4534-8141-A753534CB4CA')
        else LODOP.setAttribute('type', 'application/x-print-lodop')
        document.documentElement.appendChild(LODOP)
        CreatedOKLodop7766 = LODOP
      } else {
        LODOP = CreatedOKLodop7766
      }
      // =====Lodop插件未安装时提示下载地址:==========
      if ((LODOP === null) || (typeof (LODOP.VERSION) === 'undefined')) {
        lodopError()
        return LODOP
      }
    }
    if (LODOP.VERSION < '6.2.2.1') {
      lodopError()
      return LODOP
    }
    // ===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
    LODOP.SET_LICENSES('', '13528A153BAEE3A0254B9507DCDE2839', '', '')
    // ===========================================================
    return LODOP
  } catch (err) {
    lodopError()
  }
}

/**
 * @name 出差申请单 打印表格
 * @description 出差申请单 打印表格
 * @param {string} htmls html模板string 
 */

 export function printStock (pageTitle,htmls) {
  try {
    var LODOP = getLodop()
    LODOP.PRINT_INIT(pageTitle)
    LODOP.SET_PRINT_PAGESIZE(1, '210mm', '297mm', 'A4') // intOrient, PageWidth,PageHeight,strPageName 单位 mm
    LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', true)
    LODOP.SET_PRINT_MODE('POS_BASEON_PAPER', true) // 统一打印机物理边距
    var html = '<body id="printerBody">'
      + '<style>#printerBody,#printerBody *{ padding:0;margin:0;box-sizing:border-box} #printerBody #pdf-content {width:210mm !important; padding:0.8mm 6mm 5mm 6mm !important; position:relative !important;} #printerBody #pdf-content table { width: 100% !important; }#printerBody table tr th,#printerBody .tableStyle tr td { border:1px solid #000; padding: 4px 4px; text-align: center; line-height: 24px; }</style>'
      + htmls
      + '</body>'
    LODOP.ADD_PRINT_HTM('5mm', 0, 'RightMargin: 0cm', 'BottomMargin: 0mm', html)
    // LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向打印预览正常展示
    LODOP.SET_PRINT_MODE('AUTO_CLOSE_PREWINDOW', 1) // 打印后自动关闭预览窗口
    LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true)
    LODOP.PREVIEW() // 预览
  } catch (err) {
    console.log(err)
  }
}
