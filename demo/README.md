# Demo Media Files

This directory contains the demo media files for the Dynamic Clock Vue Component.

## Required Files

### Video/GIF Demo
- `clock-demo.gif` - Animated demo showing the clock component in action
  - Should show theme switching
  - Show analog and digital displays
  - Show size variations
  - Show 12/24 hour toggle
  - Recommended size: 600-800px width
  - Keep file size under 10MB for GitHub

### Screenshots
- `theme-1.png` - Omolon theme (blue gradient)
- `theme-2.png` - Ibiza Sunset theme (pink/orange gradient)
- `theme-3.png` - Harvey theme (green gradient)
- `size-small.png` - Small size configuration
- `digital-only.png` - Digital clock only configuration
- `analog-only.png` - Analog clock only configuration

## How to Create Demo Media

### Creating a GIF

**Option 1: Using Browser DevTools**
1. Run `pnpm dev` to start the development server
2. Open Chrome DevTools (F12)
3. Press Ctrl+Shift+P and type "Capture node screenshot"
4. Or use Performance tab to record and export

**Option 2: Using Screen Recording Tools**
- **Windows**: ScreenToGif, ShareX, LICEcap
- **macOS**: Kap, Gifox, GIPHY Capture
- **Linux**: Peek, Byzanz, SimpleScreenRecorder

**Option 3: Using ffmpeg**
```bash
# Record screen (adjust -video_size and -i for your display)
ffmpeg -f x11grab -video_size 1920x1080 -i :0.0 -t 10 output.mp4

# Convert to GIF
ffmpeg -i output.mp4 -vf "fps=15,scale=600:-1:flags=lanczos" -c:v gif output.gif
```

### Creating Screenshots

1. Run the development server: `pnpm dev`
2. Open http://localhost:5173
3. Take screenshots using:
   - Browser DevTools screenshot feature
   - OS screenshot tools (Win+Shift+S on Windows, Cmd+Shift+4 on macOS)
   - Browser extensions like Full Page Screen Capture

### Optimizing Files

**For GIFs:**
- Use https://ezgif.com/optimize to reduce file size
- Aim for < 5MB for smooth GitHub loading

**For PNGs:**
- Use https://tinypng.com to compress
- Or use command line: `pngquant --quality=65-80 *.png`

## Placeholder Images

Until you create the actual demo media, you can use placeholder services:
- https://via.placeholder.com/600x400
- https://placehold.co/600x400

But remember to replace with actual screenshots before publishing!