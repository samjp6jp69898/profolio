export interface PanelItem {
    id: string;
    title: string;
    summary: string;
    content?: string | null;
    category: 'project' | 'article' | 'home' | 'about';
    tags: string[];
    link: string; // For the arrow action
    status: 'completed' | 'in-progress' | 'archived';
    updated_at: string;
    created_at: string;
}
