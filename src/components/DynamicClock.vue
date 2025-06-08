<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ==== Reactive State ====
// These refs will hold the current time values and update UI when the time changes

const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)
const currentDate = ref<Date>(new Date())

// Type for interval
let intervalId: number | undefined

// ==== Computed Properties ====
/* Automatically update when refs change
   Calculate rotation degrees for hour hand
   Hour hand moves 30 deg per hour => (360deg / 12)h
*/

const hourDegrees = computed(() => {
  const format12Hour = hours.value % 12
  const degreesFromHours = format12Hour * 30
  const degreesFromMinutes = (minutes.value / 60) * 30
  // subtract 90 to start from top (12 o'clock)
  return degreesFromHours + degreesFromMinutes - 90
})

// Calculate rotation degrees for minute hand
// Minute hand moves 6 deg per minute => (360deg / 60)minutes
const minuteDegrees = computed(() => {
  const minuteDegrees = minutes.value * 6
  const degreesFromSeconds = (seconds.value / 60) * 6
  return minuteDegrees + degreesFromSeconds - 90
})

// Format time as HH:MM:SS
const formattedTime = computed(() => {
  // padStart ensures two digits('01' not '1')
  const hh = hours.value.toString().padStart(2, '0')
  const mm = minutes.value.toString().padStart(2, '0')
  const ss = seconds.value.toString().padStart(2, '0')
  return `${hh}:${mm}:${ss}`
})

// Format date as YYYY-MM-DD

const formattedDate = computed(() => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // 'Monday'
    year: 'numeric', // '2023'
    month: 'long', // 'September'
    day: 'numerict', // '13'
  }
  return currentDate.value.toLocaleDateString(undefined, options)
})

// ==== Functions ====
// Update time every second

const updateTime = () => {
  const now = new Date()
  hours.value = now.getHours()
}
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
        <div class="text-6xl font-light text-white font-mono tracking-wider">
          {{ formattedTime }}
        </div>
      </div>
    </div>
    <!-- End of Clock Card -->
  </div>
  <!-- End of Main Container -->
</template>
