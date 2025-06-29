# Dynamic Clock Vue Component

[![npm version](https://img.shields.io/npm/v/dynamic-clock-vue-component)](https://www.npmjs.com/package/dynamic-clock-vue-component)
[![npm downloads](https://img.shields.io/npm/dm/dynamic-clock-vue-component)](https://www.npmjs.com/package/dynamic-clock-vue-component)
[![GitHub stars](https://img.shields.io/github/stars/Brian-Zavala/dynamic-clock-vue-typescript)](https://github.com/Brian-Zavala/dynamic-clock-vue-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-green.svg)](https://vuejs.org/)

A beautiful, customizable clock component for Vue 3 with TypeScript support. Features both analog and digital displays with smooth animations and 20+ professional gradient themes from the uiGradients collection.

## 🎥 Demo

https://github.com/user-attachments/assets/62755b7f-e53d-46c0-bb61-5893bc1ad589

## Features

- 🕐 **Dual Display**: Both analog and digital clock displays
- 🎨 **20+ Professional Themes**: Curated gradients from [uiGradients](https://uigradients.com) collection
- 📏 **3 Size Options**: Small, medium, and large
- 🌓 **12/24 Hour Format**: Toggle between formats
- 📅 **Date Display**: Shows full date with day of week
- ✨ **Smooth Animations**: Beautiful border animations on analog clock
- 🎯 **TypeScript**: Full type safety
- 🎮 **Customizable**: Props for all display options
- 📦 **Tree-shakable**: Optimized for modern bundlers

## Prerequisites

**⚠️ Important**: This component requires Tailwind CSS to be installed and configured in your project as it uses Tailwind utility classes for styling.

### Install Tailwind CSS (if not already installed)

**For Vite projects (Recommended):**

```bash
npm install tailwindcss @tailwindcss/vite
```

Add to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

Add to your main CSS file (e.g., `src/assets/main.css`):

```css
@import 'tailwindcss';
```

**For tailwind(3.9⬇️):**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/dynamic-clock-vue-component/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🚀 Quick Start

### Installation

```bash
npm install dynamic-clock-vue-component
```

### Running the Demo Locally

```bash
# Clone the repository
git clone https://github.com/Brian-Zavala/dynamic-clock-vue-typescript.git

# Navigate to project directory
cd dynamic-clock-vue-typescript

# Install dependencies
pnpm install
# or npm install

# Run development server
pnpm dev
# or npm run dev

# Open http://localhost:5173 in your browser
```

## Basic Usage

### ES Module Import

```vue
<script setup lang="ts">
import { DynamicClockReusable } from 'dynamic-clock-vue-component'
</script>

<template>
  <!-- Minimal usage -->
  <DynamicClockReusable />

  <!-- With custom container -->
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600"
  >
    <DynamicClockReusable />
  </div>
</template>
```

### Default Import

```vue
<script setup lang="ts">
import DynamicClock from 'dynamic-clock-vue-component'
</script>

<template>
  <DynamicClock />
</template>
```

### Plugin Installation (Vue.use)

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { DynamicClockPlugin } from 'dynamic-clock-vue-component'

const app = createApp(App)
app.use(DynamicClockPlugin)
app.mount('#app')
```

Then use in templates:

```vue
<template>
  <DynamicClock />
</template>
```

> **Note about CSS**: You don't need to manually import CSS files! The component's styles are automatically included when Tailwind CSS processes your project. The built component only contains scoped styles and custom animations - all Tailwind utility classes are handled by your project's Tailwind installation.

## Props

| Prop             | Type                             | Default   | Description              |
| ---------------- | -------------------------------- | --------- | ------------------------ |
| `size`           | `'small' \| 'medium' \| 'large'` | `'large'` | Clock size               |
| `theme`          | `number`                         | `0`       | Theme index (0-19+)      |
| `showAnalog`     | `boolean`                        | `true`    | Show analog clock        |
| `showDigital`    | `boolean`                        | `true`    | Show digital time        |
| `use24Hour`      | `boolean`                        | `false`   | Use 24-hour format       |
| `showDate`       | `boolean`                        | `true`    | Show date below time     |
| `containerClass` | `string`                         | `''`      | Custom container classes |

## Events

| Event            | Payload   | Description                      |
| ---------------- | --------- | -------------------------------- |
| `@format-toggle` | `boolean` | Emitted when time format changes |
| `@theme-change`  | `number`  | Emitted when theme changes       |

## Slots

### `controls` slot

Add custom control buttons:

```vue
<template>
  <DynamicClock>
    <template #controls="{ toggleFormat, changeTheme }">
      <button @click="toggleFormat">Toggle Format</button>
      <button @click="changeTheme">Change Theme</button>
    </template>
  </DynamicClock>
</template>
```

## TypeScript Support

The component exports TypeScript interfaces for better development experience:

```ts
import type { DynamicClockProps } from 'dynamic-clock-vue-component'

// Use the interface for type safety
const clockProps: DynamicClockProps = {
  size: 'large',
  theme: 5,
  showAnalog: true,
  showDigital: true,
  use24Hour: false,
  showDate: true,
  containerClass: 'my-custom-class',
}
```

## Advanced Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DynamicClockReusable } from 'dynamic-clock-vue-component'
import type { DynamicClockProps } from 'dynamic-clock-vue-component'

const currentTheme = ref(0)
const clockSize = ref<'small' | 'medium' | 'large'>('medium')

// Type-safe props
const clockConfig: DynamicClockProps = {
  size: clockSize.value,
  theme: currentTheme.value,
  showAnalog: true,
  showDigital: true,
  use24Hour: false,
  showDate: true,
}
</script>

<template>
  <div class="p-8">
    <DynamicClockReusable
      :size="clockSize"
      :theme="currentTheme"
      :show-analog="true"
      :show-digital="true"
      :use24-hour="false"
      @theme-change="(theme) => (currentTheme = theme)"
    />
  </div>
</template>
```

## Themes

The component includes 20 professional gradient themes from the [uiGradients](https://github.com/ghosh/uiGradients) collection:

1. **Omolon** (0): Deep blue to light blue gradient
2. **Farhan** (1): Purple to indigo gradient
3. **Purple** (2): Pink to rose gradient
4. **Iota** (3): Blue to purple gradient
5. **Radar** (4): Purple to pink to peach gradient
6. **Ibiza Sunset** (5): Pink to orange gradient
7. **Dawn** (6): Pink to red gradient
8. **Cool Sky** (7): Blue multi-tone gradient
9. **Yoda** (8): Pink to dark gradient
10. **Memariani** (9): Multi-color subtle gradient
11. **Amin** (10): Purple to teal gradient
12. **Harvey** (11): Dark green to mint gradient
13. **Neuromancer** (12): Pink to purple gradient
14. **Azur Lane** (13): Light purple to teal gradient
15. **Witching Hour** (14): Red to dark gradient
16. **Flare** (15): Red to orange gradient
17. **Metapolis** (16): Teal to orange gradient
18. **Kyoo Pal** (17): Red to green gradient
19. **Kye Meh** (18): Purple to teal gradient
20. **Kyoo Tah** (19): Purple to yellow gradient

> Themes cycle automatically when using the "Change Theme" button. You can also set a specific theme by index.

## Credits

Gradient themes are sourced from the beautiful [uiGradients](https://uigradients.com) collection by [@ghosh](https://github.com/ghosh/uiGradients) - a community-contributed collection of beautiful multi-color gradients.

## Troubleshooting

### Styles not working

- Ensure Tailwind CSS is properly installed and configured in your project
- Make sure you have `@import "tailwindcss";` in your main CSS file
- Verify your Tailwind config includes the component path in the content array
- Check that your Vite config includes the `@tailwindcss/vite` plugin

### TypeScript errors

- Install Vue types: `npm install -D @vue/tsconfig`
- Ensure your `tsconfig.json` includes Vue file extensions

### Component not appearing

- Check that Vue 3 is installed as a peer dependency
- Verify the component is properly imported and used in the template

## Dependencies

### Peer Dependencies

- Vue (`vue: ^3.0.0`)
- Tailwind CSS (`tailwindcss: ^3.0.0`)

## Notes

- The component is self-contained and doesn't include a full-screen container
- Add your own wrapper for positioning and background
- The analog clock preserves the ripple and glow animations
- All times are based on the user's system clock
- The component updates every second automatically
- Gradient themes use CSS `linear-gradient()` for optimal performance
- Component styles are scoped and won't interfere with your global styles

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © Brian Zavala
