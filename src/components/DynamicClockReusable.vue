<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// TypeScript interfaces
interface DynamicClockProps {
  size?: 'small' | 'medium' | 'large'
  theme?: number
  showAnalog?: boolean
  showDigital?: boolean
  use24Hour?: boolean
  showDate?: boolean
  containerClass?: string
}

// Props
const props = withDefaults(defineProps<DynamicClockProps>(), {
  size: 'large',
  theme: 0,
  showAnalog: true,
  showDigital: true,
  use24Hour: false,
  showDate: true,
  containerClass: '',
})

// Emits
const emit = defineEmits<{
  'format-toggle': [is24Hour: boolean]
  'theme-change': [theme: number]
}>()

// Reactive State
const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)
const currentDate = ref<Date>(new Date())
const use24Hour = ref(props.use24Hour)
const currentTheme = ref(props.theme)

// Type for interval
let intervalId: number | undefined

// uiGradients collection (sample from https://github.com/ghosh/uiGradients)
const gradients = [
  { name: "Omolon", colors: ["#091E3A", "#2F80ED", "#2D9EE0"] },
  { name: "Farhan", colors: ["#9400D3", "#4B0082"] },
  { name: "Purple", colors: ["#c84e89", "#F15F79"] },
  { name: "Iota", colors: ["#4776E6", "#8E54E9"] },
  { name: "Radar", colors: ["#A770EF", "#CF8BF3", "#FDB99B"] },
  { name: "Ibiza Sunset", colors: ["#ee0979", "#ff6a00"] },
  { name: "Dawn", colors: ["#F093FB", "#F5576C"] },
  { name: "Cool Sky", colors: ["#2980B9", "#6BB6FF", "#3F2B96"] },
  { name: "Yoda", colors: ["#FF0099", "#493240"] },
  { name: "Memariani", colors: ["#aa4b6b", "#6b6b83", "#3b8d99"] },
  { name: "Amin", colors: ["#8360c3", "#2ebf91"] },
  { name: "Harvey", colors: ["#1f4037", "#99f2c8"] },
  { name: "Neuromancer", colors: ["#f953c6", "#b91d73"] },
  { name: "Azur Lane", colors: ["#7F7FD3", "#91EAE4"] },
  { name: "Witching Hour", colors: ["#c31432", "#240b36"] },
  { name: "Flare", colors: ["#f12711", "#f5af19"] },
  { name: "Metapolis", colors: ["#659999", "#f4791f"] },
  { name: "Kyoo Pal", colors: ["#dd3e54", "#6be585"] },
  { name: "Kye Meh", colors: ["#8360c3", "#2ebf91"] },
  { name: "Kyoo Tah", colors: ["#544a7d", "#ffd452"] }
]

// Convert hex colors to CSS linear gradient
const createGradient = (colors: string[]): string => {
  return `linear-gradient(135deg, ${colors.join(', ')})`
}

// Size configurations
const sizeConfig = {
  small: {
    card: 'p-6',
    analogClock: 'w-48 h-48',
    digitalTime: 'text-4xl',
    date: 'text-lg',
  },
  medium: {
    card: 'p-8',
    analogClock: 'w-64 h-64',
    digitalTime: 'text-5xl',
    date: 'text-lg',
  },
  large: {
    card: 'p-10',
    analogClock: 'w-72 h-72',
    digitalTime: 'text-6xl',
    date: 'text-xl',
  },
}

// Computed properties for clock hand rotations (same as original)
const hourDegrees = computed(() => {
  return (hours.value % 12) * 30 + (minutes.value / 60) * 30 - 90
})

const minuteDegrees = computed(() => {
  return minutes.value * 6 + (seconds.value / 60) * 6 - 90
})

const secondDegrees = computed(() => {
  return seconds.value * 6 - 90
})

// Format time as HH:MM:SS (same as original)
const formattedTime = computed(() => {
  let h = hours.value
  if (!use24Hour.value) {
    if (h === 0) {
      h = 12
    } else if (h > 12) {
      h -= 12
    }
  }
  const hourStr = h.toString().padStart(2, '0')
  const m = minutes.value.toString().padStart(2, '0')
  const s = seconds.value.toString().padStart(2, '0')
  return `${hourStr}:${m}:${s}`
})

// Format date (same as original)
const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return currentDate.value.toLocaleDateString(undefined, options)
})

// Current size config
const currentSize = computed(() => sizeConfig[props.size])

// Container classes
const containerClasses = computed(() => {
  return props.containerClass || ''
})

// Gradient styles
const gradientStyles = computed(() => {
  const gradientIndex = currentTheme.value % gradients.length
  const gradient = gradients[gradientIndex]
  return {
    background: createGradient(gradient.colors)
  }
})

// Update time function (same as original)
const updateTime = () => {
  const now = new Date()
  hours.value = now.getHours()
  minutes.value = now.getMinutes()
  seconds.value = now.getSeconds()
  currentDate.value = now
}

// Toggle functions
const toggleFormat = () => {
  use24Hour.value = !use24Hour.value
  emit('format-toggle', use24Hour.value)
}

// Change theme function
const changeTheme = () => {
  currentTheme.value = (currentTheme.value + 1) % gradients.length
  emit('theme-change', currentTheme.value)
}

// Watch for prop changes
watch(
  () => props.use24Hour,
  (newVal) => {
    use24Hour.value = newVal
  },
)

watch(
  () => props.theme,
  (newVal) => {
    currentTheme.value = newVal
  },
)

// Lifecycle hooks (same as original)
onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

// Expose methods for parent components
defineExpose({
  toggleFormat,
  changeTheme,
})
</script>

<template>
  <!-- Clock card only - no min-h-screen container -->
  <div
    :class="[
      'bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 animate-glow',
      currentSize.card,
      containerClasses,
    ]"
    :style="gradientStyles"
  >
    <!-- Digital Clock -->
    <div v-if="showDigital" class="text-center mb-8">
      <!-- Time Display -->
      <div
        :class="[
          'font-light text-white font-mono tracking-wider drop-shadow-glow',
          currentSize.digitalTime,
        ]"
      >
        {{ formattedTime }}
      </div>
      <div v-if="showDate" :class="['text-white/80 mt-3', currentSize.date]">
        {{ formattedDate }}
      </div>
    </div>

    <!-- Analog Clock -->
    <div v-if="showAnalog" :class="['relative mx-auto top-4', currentSize.analogClock]">
      <div
        class="absolute inset-0 bg-white/10 rounded-full border-4 border-white/30 shadow-inner animate-ripple"
      >
        <div class="absolute inset-0 border-2 border-white/40 rounded-full animate-glow"></div>
      </div>
      <!-- Clock Numbers -->
      <div
        v-for="i in 12"
        :key="i"
        class="absolute w-full h-full"
        :style="{ transform: `rotate(${i * 30}deg)` }"
      >
        <span
          class="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 font-semibold text-lg"
          :style="{ transform: `rotate(${-i * 30}deg)` }"
        >
          {{ i }}
        </span>
      </div>
      <!-- Hour Markers -->
      <div
        v-for="i in 12"
        :key="`marker-${i}`"
        class="absolute w-full h-full"
        :style="{ transform: `rotate(${i * 30}deg)` }"
      >
        <div
          class="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/60 rounded-full"
        ></div>
      </div>

      <!-- Clock Hands -->
      <div
        class="absolute top-1/2 left-1/2 w-20 h-1.5 bg-white rounded-full shadow-lg origin-left -translate-y-1/2 transition-transform duration-300 ease-out"
        :style="{ transform: `rotate(${hourDegrees}deg)` }"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-28 h-1 bg-white rounded-full shadow-lg origin-left -translate-y-1/2 transition-transform duration-300 ease-out"
        :style="{ transform: `rotate(${minuteDegrees}deg)` }"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-32 h-0.5 bg-red-400 rounded-full origin-left -translate-y-1/2 transition-transform duration-300 ease-out"
        :style="{ transform: `rotate(${secondDegrees}deg)` }"
      ></div>

      <!-- Center Dot -->
      <div
        class="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"
      ></div>
    </div>
    <!-- Control Buttons -- Optional -->
    <div class="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 pt-14">
      <button
        @click="toggleFormat"
        class="flex-1 px-3 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 cursor-pointer animate-glow"
      >
        {{ use24Hour ? '12 Hour' : '24 Hour' }}
      </button>
      <button
        @click="changeTheme"
        class="flex-1 px-3 py-1.5 sm:py-2 text-small sm:text-base bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors duration-200 cursor-pointer animate-glow"
      >
        Change Theme
      </button>
    </div>
  </div>
</template>

<style scoped>
@layer utilities {
  .drop-shadow-glow {
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
  }
}
/* Smooth hand transition for seconds */
.transition-transform {
  transition-property: transform;
}
</style>
