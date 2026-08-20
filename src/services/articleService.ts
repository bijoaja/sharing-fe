import { Article, ArticleFormData } from '../types/article';
import { gatewayService } from './gatewayService';

const ARTICLE_ENDPOINT = '/article';

interface ListArticlesResponse {
  success: boolean;
  message: string;
  data: Article[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

interface ArticleResponse {
  success: boolean;
  message: string;
  data: Article;
}

export async function getArticles(limit: number = 10, offset: number = 0): Promise<Article[]> {
  const response = await gatewayService.get<ListArticlesResponse>(
    `${ARTICLE_ENDPOINT}/${limit}/${offset}`
  );
  return response.data;
}

export async function getArticle(id: string | number): Promise<Article> {
  const response = await gatewayService.get<ArticleResponse>(`${ARTICLE_ENDPOINT}/${id}`);
  return response.data;
}

export async function createArticle(data: ArticleFormData): Promise<Article> {
  const response = await gatewayService.post<ArticleResponse>(ARTICLE_ENDPOINT, {
    ...data,
    status: data.status || 'draft',
  });
  return response.data;
}

export async function updateArticle(
  id: string | number,
  data: ArticleFormData
): Promise<Article> {
  const response = await gatewayService.patch<ArticleResponse>(
    `${ARTICLE_ENDPOINT}/${id}`,
    data
  );
  return response.data;
}

export async function deleteArticle(id: string | number): Promise<void> {
  await gatewayService.delete<void>(`${ARTICLE_ENDPOINT}/${id}`);
}
