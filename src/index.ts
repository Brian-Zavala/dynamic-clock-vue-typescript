import DynamicClockReusable from './components/DynamicClockReusable.vue'
import type { App } from 'vue'

// Export the component for individual import
export { DynamicClockReusable }

// Export default separately (not as re-export)
export default DynamicClockReusable

// Export plugin installer for Vue.use()
export const DynamicClockPlugin = {
  install(app: App) {
    app.component('DynamicClock', DynamicClockReusable)
  }
}

// Export component props interface for TypeScript users
export interface DynamicClockProps {
  size?: 'small' | 'medium' | 'large'
  theme?: number
  showAnalog?: boolean
  showDigital?: boolean
  use24Hour?: boolean
  showDate?: boolean
  showControls?: boolean
  containerClass?: string
  wrapperClass?: string
}