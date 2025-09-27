export interface Book {
    id: string;
    thumbnail: string;
    title: string;
    authors: string[];
    description?: string;
    notes?: string;
    tags?: string[];
};