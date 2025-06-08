<script setup lang="ts">
import { ref } from 'vue'
import DynamicClockReusable from './components/DynamicClockReusable.vue'

const currentTheme = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-500 to-gray-800 p-8 flex items-center justify-center">
    <div class="w-full max-w-7xl">
      <h1 class="text-4xl font-bold text-white text-center pb-12">
        Dynamic Clock Component Demo
      </h1>

      <!-- Main clock with full features -->
      <div class="flex justify-center mb-16">
        <DynamicClockReusable
          size="large"
          :theme="currentTheme"
          @theme-change="(theme) => currentTheme = theme"
        />
      </div>

      <!-- Grid showing different configurations -->
      <div class="grid md:grid-cols-3 gap-8 mb-12 place-items-center">
        <!-- Small clock - analog only -->
        <div class="flex flex-col items-center">
          <h3 class="text-white text-xl mb-4 text-center">Small - Analog Only</h3>
          <DynamicClockReusable
            size="small"
            :theme="currentTheme"
            :show-digital="false"
            :show-controls="false"
          />
        </div>

        <!-- Medium clock - digital only -->
        <div class="flex flex-col items-center">
          <h3 class="text-white text-xl mb-4 text-center">Medium - Digital Only</h3>
          <DynamicClockReusable
            size="medium"
            :theme="currentTheme"
            :show-analog="false"
            :show-controls="false"
          />
        </div>

        <!-- Small clock - no controls, no date -->
        <div class="flex flex-col items-center">
          <h3 class="text-white text-xl mb-4 text-center">Small - Minimal</h3>
          <DynamicClockReusable
            size="small"
            :theme="currentTheme"
            :show-controls="false"
            :show-date="false"
          />
        </div>
      </div>

      <!-- Row with custom styling -->
      <div class="bg-white/10 backdrop-blur rounded-xl p-8">
        <h3 class="text-white text-2xl mb-6 text-center">Custom Styled Clock</h3>
        <div class="flex justify-center">
          <DynamicClockReusable
            size="medium"
            :theme="currentTheme"
            :use24-hour="true"
            container-class="!bg-purple-600/20 !border-purple-400/50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
