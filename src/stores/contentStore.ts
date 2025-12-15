import { defineStore } from 'pinia';
import type { ContentItem } from '@/types';

export const useContentStore = defineStore('content', {
    state: () => ({
        projects: [
            {
                id: 'p-001',
                title: 'Jarvis Protocol',
                description: 'Advanced AI assistant interface with voice recognition and holographic projection mapping. Built with Neural Networks and Vue.js.',
                tags: ['AI', 'Vue.js', 'Speech Rec'],
                date: '2024-12-01',
                status: 'in-progress'
            },
            {
                id: 'p-002',
                title: 'Mark LXXXV Armor',
                description: 'Nanotech-based defensive systems integration. Features auto-repair and adaptive shielding algorithms.',
                tags: ['Nanotech', 'Hardware', 'Defense'],
                date: '2024-11-15',
                status: 'completed'
            },
            {
                id: 'p-003',
                title: 'Arc Reactor Mini',
                description: 'Sustainable clean energy prototype. miniaturized fusion reactor capable of powering an entire city block.',
                tags: ['Energy', 'Physics', 'Prototype'],
                date: '2024-10-30',
                status: 'archived'
            }
        ] as ContentItem[],
        articles: [
            {
                id: 'a-001',
                title: 'The Future of Interfaces',
                description: 'Analyzing the shift from 2D screens to volumetric displays and spatial computing.',
                tags: ['Design', 'UX/UI', 'Future'],
                date: '2024-12-10'
            },
            {
                id: 'a-002',
                title: 'Neural Link Latency',
                description: 'Optimizing brain-computer interfaces for real-time suit control.',
                tags: ['Neuroscience', 'Optimization'],
                date: '2024-11-20'
            }
        ] as ContentItem[]
    }),

    getters: {
        allTags: (state) => {
            const tags = new Set<string>();
            state.projects.forEach(p => p.tags.forEach(t => tags.add(t)));
            state.articles.forEach(a => a.tags.forEach(t => tags.add(t)));
            return Array.from(tags).sort();
        },

        getProjectById: (state) => (id: string) => {
            return state.projects.find(p => p.id === id);
        }
    }
});
