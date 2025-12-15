export interface ContentItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    date: string;
    link?: string; // For the arrow action
    status?: 'completed' | 'in-progress' | 'archived';
}
