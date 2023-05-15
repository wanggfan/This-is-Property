import { App } from 'vue'
import registerElement from './register-element'
// export function globalRegister(app: App) {
//   // registerElement(app)
//   app.use(registerElement)
// }
export const globalRegister = {
  install(app: App) {
    app.use(registerElement)
  }
}
