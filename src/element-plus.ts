import { App } from 'vue'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { ElButton, ElInput } from 'element-plus'

export default {
  install: (app: App): void => {
    app.config.globalProperties.$ELEMENT = {
      locale: zhCn,
    }
    app.use(ElButton).use(ElInput)
  },
}
