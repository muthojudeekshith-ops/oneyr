# Midnight Surprise

## Overview
A romantic anniversary website featuring a countdown timer, password-protected content, photo memories carousel, and animated effects with background music. Built as a static website (HTML, CSS, JavaScript).

## Project Architecture
- **Type**: Static website
- **Directory**: `docs/` contains all website files
- **Files**:
  - `index.html` - Main page with multiple screens
  - `style.css` - Styling and animations
  - `script.js` - Countdown, navigation, password logic
  - `music.mp3` - Background music
  - `m1.jpg` to `m14.jpg` - Memory photos

## How It Works
1. Shows a countdown timer until the unlock date (April 20, 2026)
2. After countdown, prompts for a password
3. Unlocks a multi-screen anniversary experience with memories, messages, and animations

## Running Locally
Served via Python's built-in HTTP server on port 5000:
```
python3 -m http.server 5000 --bind 0.0.0.0 --directory docs
```

## Deployment
Configured as a static site deployment using the `docs` directory.
