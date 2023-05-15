import { App } from 'vue'
import { ElButton, ElRow, ElForm, ElFormItem, ElInput } from 'element-plus'
const components = [ElButton, ElRow, ElForm, ElFormItem, ElInput]

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
