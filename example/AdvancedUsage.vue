<script setup lang="ts">
import { ref } from 'vue'
import { DynamicClockReusable } from '../src/index'
import type { DynamicClockProps } from '../src/index'

const theme = ref(5)
const size = ref<DynamicClockProps['size']>('medium')
const use24Hour = ref(false)
const showAnalog = ref(true)
const showDigital = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 p-8">
    <h1 class="text-4xl font-bold text-white text-center mb-8">
      Advanced Configuration Example
    </h1>
    
    <!-- Controls -->
    <div class="max-w-4xl mx-auto mb-8">
      <div class="bg-white/10 backdrop-blur rounded-lg p-6">
        <h2 class="text-xl font-semibold text-white mb-4">Controls</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label class="text-white">
            <span class="block mb-1">Size:</span>
            <select v-model="size" class="w-full px-3 py-2 rounded bg-white/20 text-white">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          
          <label class="text-white">
            <span class="block mb-1">Theme:</span>
            <input 
              type="number" 
              v-model.number="theme" 
              min="0" 
              max="19"
              class="w-full px-3 py-2 rounded bg-white/20 text-white"
            >
          </label>
          
          <label class="text-white flex items-center">
            <input type="checkbox" v-model="showAnalog" class="mr-2">
            Show Analog
          </label>
          
          <label class="text-white flex items-center">
            <input type="checkbox" v-model="showDigital" class="mr-2">
            Show Digital
          </label>
          
          <label class="text-white flex items-center">
            <input type="checkbox" v-model="use24Hour" class="mr-2">
            24-Hour Format
          </label>
        </div>
      </div>
    </div>
    
    <!-- Clock with dynamic props -->
    <div class="flex justify-center">
      <DynamicClockReusable 
        :size="size"
        :theme="theme"
        :show-analog="showAnalog"
        :show-digital="showDigital"
        :use24-hour="use24Hour"
        :show-controls="true"
        @theme-change="(t) => theme = t"
        @format-toggle="(is24) => use24Hour = is24"
      />
    </div>
  </div>
</template>