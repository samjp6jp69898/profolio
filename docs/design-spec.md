Portfolio Design Spec

1. 專案概述 Project Overview
1.1 專案目標 Project Goals
打造一個具有鋼鐵人 JARVIS 風格的個人作品集網站，採用現代化的 Dashboard 佈局（固定側邊欄 + 主內容區），結合全息投影與科技 UI 的視覺效果。使用者可透過側邊導航與指令式搜索，探索個人故事與經歷。

1.2 核心功能 Core Features
- 左側固定導航欄 (Sidebar Navigation)
- JARVIS 風格指令輸入框 (Command Bar)
- 半透明玻璃擬態內容卡片 (Holographic Glass Cards)
- 展示內容：Blog文章、專案展示、關於我、系統狀態
- 響應式設計，支援桌面與行動裝置

1.3 網站內容規劃 Content Planning
區塊 | 內容說明
--- | ---
**Sidebar** | 個人 Logo (Arc Reactor)、導航選單、系統狀態數據 (CPU/Location)
**Main Content** | 頂部搜索欄、動態牆 (Feed)、各類詳細資訊面板
**Dashboard Widgets** | 技能分析、近期專案、系統日誌

2. 視覺設計 Visual Design
2.1 設計風格 Design Style
參考鋼鐵人 JARVIS 介面，採用高科技儀表板 (Dashboard) 形式。
- **Layout**: 左側側邊欄 (Sidebar) + 右側主內容區 (Main Content)。
- **Vibe**: High-tech, Futuristic, Premium, Stark Industries interface.

2.2 色彩系統 Color System
| 名稱 | 色碼 | 用途 |
| --- | --- | --- |
| Primary Cyan | #00D4FF | 主要高亮、UI 邊框、文字發光、連接線 |
| Secondary Blue | #0A84FF | 次要藍、背景漸層、卡片底色 |
| Accent Gold | #FFD700 | 強調色、特殊狀態、關鍵數據標記 |
| Warning Red | #FF3B30 | 警告、錯誤提示、系統異常 |
| Background Dark | #0A0A0F | 深色背景 (Deep Space) |
| Grid Line | rgba(0,212,255,0.08) | 背景網格線 |
| Hologram | rgba(0,212,255,0.15) | 全息投影效果、半透明背景 |

2.3 字體系統 Typography
| 字體 | 類型 | 用途 |
| --- | --- | --- |
| Orbitron | Display / 標題 | Logo、導航按鈕、面板標題 |
| Rajdhani | Sans-serif / 內文 | 一般內文、描述文字 |
| Share Tech Mono | Monospace / 數據 | 系統數據、程式碼片段、座標顯示 |

3. 版面佈局 Layout Structure
3.1 Sidebar (Left Panel, ~250px)
- **Top**: Arc Reactor Logo (簡易版或動圖) + Name "RAY"
- **Middle**: 垂直導航選單 (Home, Articles, Projects, About)
  - Style: HUD Buttons, 懸停發光，選中時左側有標記
- **Bottom**: Tech Specs (CPU Usage, Location, Status)

3.2 Main Content (Right Panel, Flex-grow)
- **Header**: Command Input (Search Bar) - 看起來像 CLI 輸入框
- **Content Area**: Grid Layout 展示內容卡片
  - Card Style: Dark glass panels, thin cyan borders, corner brackets
  - Accents: Holographic icons, connecting lines

4. 技術架構 Technical Architecture
4.1 技術選型 Tech Stack
- **Framework**: Vue 3 (Composition API + TypeScript)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Vanilla CSS (CSS Variables for theming)
- **Animation**: CSS Keyframes (主要), GSAP (若是複雜序列動畫)

4.2 專案結構 Project Structure
```
src/
├── assets/images/          # 靜態資源
├── components/
│   ├── layout/             # 佈局組件
│   │   ├── MainLayout.vue  # 核心佈局容器 (Grid: Sidebar + Content)
│   │   ├── Sidebar.vue     # 左側導航欄
│   │   └── TopBar.vue      # 頂部搜索欄/指令列
│   ├── ui/                 # UI 基礎組件
│   │   ├── ArcReactor.vue  # 反應爐 Logo
│   │   ├── HUDButton.vue   # 導航按鈕
│   │   ├── HoloCard.vue    # 通用玻璃擬態卡片
│   │   └── TechText.vue    # 裝飾性數據文字
│   └── views/              # 頁面內容
│       ├── HomeView.vue
│       ├── ArticlesView.vue
│       ├── ProjectsView.vue
│       └── AboutView.vue
├── stores/uiStore.ts
├── styles/
│   ├── variables.css
│   └── main.css
└── App.vue
```

5. 開發階段 Development Phases
Phase 1: 基礎佈局 (Layout Foundation)
- 建立 `MainLayout`, `Sidebar`, `TopBar`
- 實作響應式 Grid 系統

Phase 2: 核心組件 (Core Components)
- 製作 `ArcReactor` (CSS Draw)
- 製作 `HoloCard` 樣式
- 實作導航切換路由

Phase 3: 內容填充 (Content Population)
- 建立各 View 的內容
- 整合 Blog 文章與專案展示

Phase 4: 視覺優化 (Polish)
- 添加進場動畫
- 優化全息投影效果 (Glow, Flicker)
- 手機版適配 (漢堡選單或底部導航)

6. 參考資料 Reference Materials
- ironman-mockup.html: 新版 Sidebar 佈局參考
- ironman_sidebar_layout_concept.png: 視覺目標圖