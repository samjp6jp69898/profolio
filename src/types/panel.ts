import type { Component } from 'vue'

export interface PanelInfo {
  id: string
  icon: string
  title: string
  titleEn: string
}

export interface BasePanelData {
  readonly type: string
}

export abstract class Panel<T extends BasePanelData = BasePanelData> {
  abstract readonly info: PanelInfo
  abstract readonly data: T

  abstract getComponent(): Component

  // 手動註冊方法
  register(): void {
    PanelFactory.register(this)
  }
}

export class PanelFactory {
  private static panels: Map<string, Panel> = new Map()

  static register(panel: Panel): void {
    this.panels.set(panel.info.id, panel)
  }

  static getPanel(id: string): Panel | undefined {
    return this.panels.get(id)
  }

  static getAllPanels(): Panel[] {
    return Array.from(this.panels.values())
  }

  static getPanelInfos(): PanelInfo[] {
    return Array.from(this.panels.values()).map(panel => panel.info)
  }
}