import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// loading加载
export const loading = {
  loadingInstance: null as LoadingInstance | null,
  open() {
    if (this.loadingInstance === null) {
      this.loadingInstance = ElLoading.service({
        text: '正在加载中',
        background: 'rgba(0,0,0,0.5)'
      })
    }
  },
  close() {
    if (this.loadingInstance !== null) {
      this.loadingInstance.close()
      this.loadingInstance = null
    }
  }
}
export const DEFAULT_LOADING = true
