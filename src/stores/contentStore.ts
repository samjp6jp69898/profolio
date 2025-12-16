import { defineStore } from 'pinia';
import type { PanelItem } from '@/types';
import { supabase } from '@/lib/supabase';

export const useContentStore = defineStore('content', {
    state: () => ({
        projects: [] as PanelItem[],
        articles: [] as PanelItem[],
        home: [] as PanelItem[],
        loading: false,
        error: null as string | null,
    }),

    getters: {
        allTags: (state) => {
            const tags = new Set<string>();
            state.projects.forEach(p => p.tags?.forEach(t => tags.add(t)));
            state.articles.forEach(a => a.tags?.forEach(t => tags.add(t)));
            return Array.from(tags).sort();
        },

        getProjectById: (state) => (id: string) => {
            return state.projects.find(p => p.id === id);
        }
    },

    actions: {
        async fetchContent() {
            this.loading = true;
            this.error = null;
            try {
                // Fetch All Content
                const { data, error } = await supabase
                    .from('contents')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) throw error;

                if (data) {
                    this.projects = data.filter((item: PanelItem) => item.category === 'project');
                    this.articles = data.filter((item: PanelItem) => item.category === 'article');
                    this.home = data.filter((item: PanelItem) => item.category === 'home')
                        .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                }

            } catch (err: any) {
                console.error('Error fetching content:', err);
                this.error = err.message || 'Failed to load content';
            } finally {
                this.loading = false;
            }
        }
    }
});
