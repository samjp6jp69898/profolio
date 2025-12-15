<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

function handleSearch() {
    console.log('Searching for:', searchQuery.value)
}
</script>

<template>
    <div class="top-bar">
        <div class="command-line">
            <span class="prompt">JARVIS@SYS:~$</span>
            <input v-model="searchQuery" type="text" class="cmd-input" placeholder="enter_command..."
                @keyup.enter="handleSearch" />
            <div class="cursor"></div>
        </div>
        <div class="system-status">
            <span class="status-indicator"></span>
            <span>SYSTEM READY</span>
        </div>
    </div>
</template>

<style scoped>
.top-bar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
    border-bottom: 1px solid rgba(0, 212, 255, 0.1);
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.05) 0%, transparent 100%);
}

.command-line {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 600px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    color: var(--primary-cyan, #00d4ff);
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 212, 255, 0.3);
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: inset 0 0 10px rgba(0, 212, 255, 0.1);
}

.prompt {
    color: #0dbc79;
    margin-right: 10px;
    text-shadow: 0 0 5px #0dbc79;
}

.cmd-input {
    background: transparent;
    border: none;
    color: #fff;
    font-family: inherit;
    font-size: inherit;
    flex: 1;
    outline: none;
    text-transform: lowercase;
}

.cmd-input::placeholder {
    color: rgba(255, 255, 255, 0.2);
}

.cursor {
    width: 10px;
    height: 20px;
    background: var(--primary-cyan, #00d4ff);
    animation: blink 1s step-end infinite;
    margin-left: 5px;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.system-status {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Rajdhani', sans-serif;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0dbc79;
    box-shadow: 0 0 10px #0dbc79;
}
</style>
