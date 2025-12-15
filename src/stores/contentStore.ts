import { defineStore } from 'pinia';
import type { ContentItem } from '@/types';
import { supabase } from '@/lib/supabase';

export const useContentStore = defineStore('content', {
    state: () => ({
        projects: [] as ContentItem[],
        articles: [] as ContentItem[],
        home: [] as ContentItem[],
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
                // Fetch Projects
                const { data: projectsData, error: projectsError } = await supabase
                    .from('projects')
                    .select('*')
                    .order('date', { ascending: false });

                if (projectsError) throw projectsError;
                if (projectsData) this.projects = projectsData;

                // Fetch Articles
                const { data: articlesData, error: articlesError } = await supabase
                    .from('articles')
                    .select('*')
                    .order('date', { ascending: false });

                if (articlesError) throw articlesError;
                if (articlesData) this.articles = articlesData;

                // Fetch Home Updates
                const { data: homeData, error: homeError } = await supabase
                    .from('home')
                    .select('*')
                    .order('updated_at', { ascending: false });

                if (homeError) throw homeError;
                if (homeData) this.home = homeData;

            } catch (err: any) {
                console.error('Error fetching content:', err);
                this.error = err.message || 'Failed to load content';
            } finally {
                this.loading = false;
            }
        }
    }
});
