<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ==== Reactive State ====
// These refs will hold the current time values and update UI when the time changes

const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)
const currentDate = ref<Date>(new Date())
const use24Hour = ref(false)
const currentTheme = ref(0)

// Type for interval
let intervalId: number | undefined

// ==== Computed Properties ====
/* Automatically update when refs change
   Calculate rotation degrees for hour hand
   Hour hand moves 30 deg per hour => (360deg / 12)h
*/

// Theme gradients
const themes = [
  'from-purple-600 to-blue-600',
  'from-pink-500 to-rose-500',
  'from-red-400 to-yellow-500',
  'from-indigo-500 to-purple-500',
  'from-green-400 to-teal-500',
]

// Computed properties for clock hand rotations
const hourDegrees = computed(() => {
  return (hours.value % 12) * 30 + (minutes.value / 60) * 30 - 90
})

const minuteDegrees = computed(() => {
  return minutes.value * 6 + (seconds.value / 60) * 6 - 90
})

const secondDegrees = computed(() => {
  return seconds.value * 6 - 90
})
// Format time as HH:MM:SS
const formattedTime = computed(() => {
  // padStart ensures two digits('01' not '1')
  let h = hours.value
  if (!use24Hour.value && h > 12) {
    h -= 12
  } else if (!use24Hour.value && h === 0) {
    h = 12 // Convert 0 to 12 for AM/PM format
  }
  const hourStr = h.toString().padStart(2, '0')
  const m = minutes.value.toString().padStart(2, '0')
  const s = seconds.value.toString().padStart(2, '0')
  return `${hourStr}:${m}:${s}`
})

// Format date as YYYY-MM-DD

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // 'Monday'
    year: 'numeric', // '2023'
    month: 'long', // 'September'
    day: 'numeric', // '13'
  }
  return currentDate.value.toLocaleDateString(undefined, options)
})

// ==== Functions ====
// Update time function

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
}

// Change theme function
const changeTheme = () => {
  currentTheme.value = (currentTheme.value + 1) % themes.length
}

const updateThemeClass = () => {
  const container = document.querySelector('.bg-gradient-to-br')
  if (container) {
    // Remove old theme classes
    themes.forEach((theme) => {
      theme.split(' ').forEach((cls) => {
        container.classList.remove(cls)
      })
      // Add new theme class
      themes[currentTheme.value].split(' ').forEach((cls) => {
        container.classList.add(cls)
      })
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  updateTime() // set intial time
  intervalId = setInterval(updateTime, 1000) // Update every second
})
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId) // Clear interval on unmount
  }
})
</script>

<template>
  <!-- Main container -->
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600"
  >
    <!-- Clock card  -->
    <div class="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20">
      <!-- Digital Clock -->
      <div class="text-center mb-8">
        <!-- Time Display -->
        <div class="text-6xl font-light text-white font-mono tracking-wider drop-shadow-glow">
          {{ formattedTime }}
        </div>
        <div class="text-xl text-white/80 mt-3">
          {{ formattedDate }}
        </div>
      </div>

      <!-- Analog Clock -->
      <div class="relative w-72 h-72 mx-auto top-4">
        <div
          class="absolute inset-0 bg-white/10 rounded-full border-4 border-white/30 shadow-inner animate-ripple"
        >
          <div class="absolute inset-0 border-2 border-white/40 rounded-full animate-glow"></div>
        </div>
      </div>
    </div>
    <!-- End of Clock Card -->
  </div>
  <!-- End of Main Container -->
</template>

<style>
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
