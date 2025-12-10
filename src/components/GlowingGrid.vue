<template>
  <TresGroup>
    <!-- 主網格地板 -->
    <TresMesh
      :position="[0, 0, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
      receive-shadow
    >
      <TresPlaneGeometry :args="[100, 100, 50, 50]" />
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
        transparent
        :side="DoubleSide"
      />
    </TresMesh>

    <!-- 發光線條網格 -->
    <TresLineSegments
      ref="gridLines"
      :position="[0, 0.01, 0]"
    >
      <TresBufferGeometry />
      <TresLineBasicMaterial
        color="#00d4ff"
        :opacity="0.3"
        transparent
      />
    </TresLineSegments>

    <!-- 中心發光點 -->
    <TresMesh :position="[0, 0.1, 0]">
      <TresRingGeometry :args="[0, 2, 32]" />
      <TresMeshBasicMaterial
        color="#00d4ff"
        :opacity="0.5"
        transparent
      />
    </TresMesh>

    <!-- 脈衝環 -->
    <TresMesh
      ref="pulseRing"
      :position="[0, 0.05, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
      <TresRingGeometry :args="[5, 5.2, 64]" />
      <TresMeshBasicMaterial
        color="#00d4ff"
        :opacity="0.8"
        transparent
      />
    </TresMesh>
  </TresGroup>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { BufferGeometry, Float32BufferAttribute, DoubleSide } from 'three'

const gridLines = ref()
const pulseRing = ref()

// Shader uniforms
const uniforms = reactive({
  time: { value: 0 },
  gridScale: { value: 2.0 },
  glowColor: { value: [0, 0.83, 1] },
  fadeDistance: { value: 50 }
})

// Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDistance;

  void main() {
    vUv = uv;
    vPosition = position;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vDistance = length(worldPosition.xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment Shader
const fragmentShader = `
  uniform float time;
  uniform float gridScale;
  uniform vec3 glowColor;
  uniform float fadeDistance;

  varying vec2 vUv;
  varying vec3 vPosition;
  varying float vDistance;

  float grid(vec2 uv, float scale) {
    vec2 grid = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
    return min(grid.x, grid.y);
  }

  void main() {
    vec2 gridUV = vUv * gridScale;

    // 基礎網格
    float gridLine = grid(gridUV, 10.0);
    float gridStrength = 1.0 - min(gridLine, 1.0);

    // 距離衰減
    float distanceFade = 1.0 - smoothstep(0.0, fadeDistance, vDistance);

    // 時間動畫
    float pulse = sin(time * 2.0 + vDistance * 0.1) * 0.5 + 0.5;

    // 中心發光效果
    float centerGlow = 1.0 / (1.0 + length(vPosition.xz) * 0.1);

    // 組合所有效果
    float alpha = gridStrength * distanceFade * (0.3 + pulse * 0.2 + centerGlow * 0.5);

    vec3 color = glowColor * (1.0 + pulse * 0.5);

    gl_FragColor = vec4(color, alpha * 0.8);
  }
`

// 創建網格線條
function createGridLines() {
  const positions = []
  const gridSize = 100
  const gridDivisions = 50
  const step = gridSize / gridDivisions

  // 垂直線條
  for (let i = 0; i <= gridDivisions; i++) {
    const x = (i * step) - (gridSize / 2)
    positions.push(x, 0, -gridSize / 2)
    positions.push(x, 0, gridSize / 2)
  }

  // 水平線條
  for (let i = 0; i <= gridDivisions; i++) {
    const z = (i * step) - (gridSize / 2)
    positions.push(-gridSize / 2, 0, z)
    positions.push(gridSize / 2, 0, z)
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))

  return geometry
}

// 動畫循環
let animationId: number
const startTime = Date.now()

const animate = () => {
  const elapsed = (Date.now() - startTime) / 1000

  // 更新 shader 時間
  uniforms.time.value = elapsed

  // 脈衝環動畫
  if (pulseRing.value) {
    const scale = 1 + Math.sin(elapsed * 3) * 0.1
    pulseRing.value.scale.setScalar(scale)
    pulseRing.value.material.opacity = 0.8 - Math.sin(elapsed * 3) * 0.3
  }

  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  // 設置網格線條幾何體
  if (gridLines.value) {
    gridLines.value.geometry = createGridLines()
  }

  // 啟動動畫
  animate()
})

// 清理動畫
onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>