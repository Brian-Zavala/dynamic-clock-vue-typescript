<script setup lang="ts">
import { ref } from 'vue'
import { DynamicClockReusable } from '../src/index'

const currentTheme = ref(0)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 p-8">
    <h1 class="text-4xl font-bold text-white text-center mb-12">
      Basic Usage Example
    </h1>
    
    <!-- Default clock with all features -->
    <div class="max-w-md mx-auto">
      <DynamicClockReusable 
        :theme="currentTheme"
        @theme-change="(theme) => currentTheme = theme"
      />
    </div>
  </div>
</template>