<script setup lang="ts">
import { ref } from 'vue'
import DynamicClockReusable from './DynamicClockReusable.vue'

// State for demo controls
const currentTheme = ref(0)
const currentSize = ref<'small' | 'medium' | 'large'>('large')
const showAnalog = ref(true)
const showDigital = ref(true)
const use24Hour = ref(false)
const showDate = ref(true)

// Theme gradients for background
const themes = [
  'from-purple-600 to-blue-600',
  'from-pink-500 to-rose-500',
  'from-red-400 to-yellow-500',
  'from-indigo-500 to-purple-500',
  'from-green-400 to-teal-500',
]
</script>

<template>
  <!-- This wrapper provides the full-screen gradient background -->
  <div :class="['min-h-screen flex items-center justify-center bg-gradient-to-br', themes[currentTheme]]">
    <!-- The reusable clock component -->
    <DynamicClockReusable
      :size="currentSize"
      :theme="currentTheme"
      :show-analog="showAnalog"
      :show-digital="showDigital"
      :use24-hour="use24Hour"
      :show-date="showDate"
      @theme-change="(theme) => currentTheme = theme"
      @format-toggle="(is24Hour) => use24Hour = is24Hour"
    >
      <!-- Optional: Add custom controls -->
      <template #controls="{ toggleFormat, changeTheme }">
        <div class="flex gap-2 mt-6 justify-center">
          <button
            @click="changeTheme"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors"
          >
            Change Theme
          </button>
          <button
            @click="toggleFormat"
            class="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors"
          >
            Toggle 12/24
          </button>
        </div>
      </template>
    </DynamicClockReusable>

    <!-- Demo controls -->
    <div class="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white text-sm">
      <h3 class="font-bold mb-2">Demo Controls</h3>
      <div class="space-y-2">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="showDigital" class="rounded">
          Show Digital
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="showAnalog" class="rounded">
          Show Analog
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="showDate" class="rounded">
          Show Date
        </label>
        <div class="mt-2">
          <label class="block mb-1">Size:</label>
          <select v-model="currentSize" class="bg-white/20 rounded px-2 py-1 text-white">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>