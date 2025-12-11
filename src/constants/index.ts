/**
 * 專案常數定義
 */

// 應用基本資訊
export const APP_CONFIG = {
  title: '個人作品集',
  titleEn: 'Portfolio',
  version: '1.0.0',
  author: 'Your Name',
  description: '鋼鐵人風格的個人作品集網站',
  descriptionEn: 'Iron Man styled personal portfolio website'
} as const

// 個人資訊
export const PERSONAL_INFO = {
  name: '您的姓名',
  nameEn: 'Your Name',
  title: '前端工程師',
  titleEn: 'Frontend Developer',
  currentLocation: '台北, 台灣',
  currentLocationEn: 'Taipei, Taiwan',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername'
} as const

// 主題配色
export const THEME_COLORS = {
  primary: '#00d4ff',
  secondary: '#0099cc',
  accent: '#00ffff',
  background: '#000000',
  surface: '#111111',
  text: '#ffffff',
  textSecondary: '#cccccc'
} as const

// 動畫時間設定
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 400,
  slow: 800,
  menu: 600,
  panel: 500
} as const

// 3D 場景配置
export const SCENE_CONFIG = {
  camera: {
    position: [0, 0, 5],
    fov: 75,
    near: 0.1,
    far: 1000
  },
  grid: {
    size: 20,
    divisions: 20,
    color: THEME_COLORS.primary
  }
} as const

// 斷點設定
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440
} as const