export type PostStatus = 'publish' | 'draft' | 'thrash';

export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  status: PostStatus;
  created_date: string;
  updated_date: string;
}

export interface ArticleFormData {
  title: string;
  content: string;
  category: string;
  status?: PostStatus;
}

export type ArticleFormMode = 'create' | 'edit';

// Helper to generate excerpt from content
export function getExcerpt(content: string, length: number = 150): string {
  return content.substring(0, length).replace(/\s+$/, '') + (content.length > length ? '...' : '');
}
