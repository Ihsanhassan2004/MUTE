import fs from 'fs';
import path from 'path';

// Let's create high-quality vector SVGs for MUTE

// 1. Square Logo / Favicon SVG (512x512)
const squareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" fill="#000000" rx="0"/>
  <g fill="#FFFFFF">
    <!-- Letter M -->
    <path d="M 64,316 V 196 H 82.5 L 121,274 L 159.5,196 H 178 V 316 H 160.5 V 224 L 126.5,292 H 115.5 L 81.5,224 V 316 Z"/>
    
    <!-- Letter U -->
    <path d="M 204,196 H 222 V 276 C 222,291 231,300.5 245,300.5 C 259,300.5 268,291 268,276 V 196 H 286 V 275 C 286,301.5 269.5,317.5 245,317.5 C 220.5,317.5 204,301.5 204,275 Z"/>
    
    <!-- Letter T -->
    <path d="M 306,196 H 386 V 213.5 H 355 V 316 H 337 V 213.5 H 306 Z"/>
    
    <!-- Letter E -->
    <path d="M 406,196 H 466 V 213.5 H 424 V 247.5 H 460 V 265 H 424 V 298.5 H 466 V 316 H 406 Z"/>
  </g>
</svg>`;

// 2. Horizontal Logo SVG (viewBox 0 0 400 120) with transparent or dark background
const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 122" width="100%" height="100%">
  <g fill="#FFFFFF" transform="translate(-64, -195)">
    <!-- Letter M -->
    <path d="M 64,316 V 196 H 82.5 L 121,274 L 159.5,196 H 178 V 316 H 160.5 V 224 L 126.5,292 H 115.5 L 81.5,224 V 316 Z"/>
    
    <!-- Letter U -->
    <path d="M 204,196 H 222 V 276 C 222,291 231,300.5 245,300.5 C 259,300.5 268,291 268,276 V 196 H 286 V 275 C 286,301.5 269.5,317.5 245,317.5 C 220.5,317.5 204,301.5 204,275 Z"/>
    
    <!-- Letter T -->
    <path d="M 306,196 H 386 V 213.5 H 355 V 316 H 337 V 213.5 H 306 Z"/>
    
    <!-- Letter E -->
    <path d="M 406,196 H 466 V 213.5 H 424 V 247.5 H 460 V 265 H 424 V 298.5 H 466 V 316 H 406 Z"/>
  </g>
</svg>`;

fs.writeFileSync('public/favicon.svg', squareSvg);
fs.writeFileSync('public/mute-logo.svg', squareSvg);
fs.writeFileSync('public/logo.svg', squareSvg);
fs.writeFileSync('public/mute-logo-horizontal.svg', horizontalSvg);
console.log('SVGs generated successfully!');
