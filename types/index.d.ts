import { DefineComponent, Plugin } from 'vue'

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

export interface DynamicClockEmits {
  (e: 'format-toggle', is24Hour: boolean): void
  (e: 'theme-change', theme: number): void
}

export interface DynamicClockExpose {
  toggleFormat: () => void
  changeTheme: () => void
}

export declare const DynamicClockReusable: DefineComponent<
  DynamicClockProps,
  {},
  {},
  {},
  {},
  {},
  {},
  DynamicClockEmits
>

export default DynamicClockReusable

export declare const DynamicClockPlugin: Plugin