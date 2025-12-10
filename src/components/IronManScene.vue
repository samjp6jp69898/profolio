<template>
  <div class="scene-container">
    <TresCanvas
      :scene="{
        background: '#0a0a0f',
        fog: { color: '#0a0a0f', near: 10, far: 100 }
      }"
      class="iron-man-scene"
      v-bind="gl"
    >
      <!-- 攝影機設置 -->
      <TresPerspectiveCamera
        :position="[0, 5, 10]"
        :fov="45"
        :aspect="1"
        :near="0.1"
        :far="1000"
        make-default
      />

      <!-- 基礎照明設置 -->
      <TresAmbientLight :intensity="0.4" color="#004080" />
      <TresDirectionalLight
        :position="[10, 10, 5]"
        :intensity="1"
        color="#00d4ff"
        cast-shadow
      />
      <TresPointLight
        :position="[0, 3, 0]"
        :intensity="0.8"
        color="#00d4ff"
        :distance="20"
      />

      <!-- 發光網格地板 -->
      <GlowingGrid />

      <!-- 攝影機控制器 -->
      <OrbitControls
        ref="controls"
        :enable-damping="true"
        :damping-factor="0.05"
        :min-distance="8"
        :max-distance="50"
        :max-polar-angle="Math.PI * 0.48"
        :min-polar-angle="0.1"
        :auto-rotate="true"
        :auto-rotate-speed="0.5"
        :enabled="true"
        :enable-pan="false"
      />
    </TresCanvas>

    <!-- HUD 覆蓋層 -->
    <HUD />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import GlowingGrid from './GlowingGrid.vue'
import HUD from './HUD.vue'

const controls = ref()

// WebGL 設置
const gl = reactive({
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance' as WebGLPowerPreference,
  shadowMap: {
    enabled: true,
    type: 2 // PCFSoftShadowMap
  }
})

// 渲染循環可以在組件中實現
// 這裡預留給未來的動畫邏輯

onMounted(() => {
  // 設置控制器
  if (controls.value) {
    controls.value.target.set(0, 0, 0)
    controls.value.update()
  }
})
</script>

<style scoped lang="scss">
.scene-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #0a0a0f;
}

.iron-man-scene {
  width: 100%;
  height: 100%;
}
</style>