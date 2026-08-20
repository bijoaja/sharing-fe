import { create } from 'zustand';
import { Article, ArticleFormData } from '../types/article';
import * as articleService from '../services/articleService';
import { useErrorStore } from './errorStore';

interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  isLoading: boolean;

  fetchArticles: () => Promise<void>;
  fetchArticle: (id: number) => Promise<void>;
  saveArticle: (data: ArticleFormData, id?: number) => Promise<Article>;
  deleteArticle: (id: number) => Promise<void>;
  clearCurrent: () => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  currentArticle: null,
  isLoading: false,

  fetchArticles: async () => {
    set({ isLoading: true });
    try {
      const articles = await articleService.getArticles();
      set({ articles, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch articles';
      useErrorStore.setState({ error: message });
      set({ isLoading: false });
    }
  },

  fetchArticle: async (id) => {
    set({ isLoading: true });
    try {
      const article = await articleService.getArticle(id);
      set({ currentArticle: article, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch article';
      useErrorStore.setState({ error: message });
      set({ isLoading: false });
    }
  },

  saveArticle: async (data, id) => {
    set({ isLoading: true });
    try {
      let saved: Article;
      if (id) {
        saved = await articleService.updateArticle(id, data);
      } else {
        saved = await articleService.createArticle(data);
      }
      set({ isLoading: false });
      return saved;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save article';
      useErrorStore.setState({ error: message });
      set({ isLoading: false });
      throw error;
    }
  },

  deleteArticle: async (id) => {
    set({ isLoading: true });
    try {
      await articleService.deleteArticle(id);
      set((state) => ({
        articles: state.articles.filter((a) => a.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete article';
      useErrorStore.setState({ error: message });
      set({ isLoading: false });
    }
  },

  clearCurrent: () => set({ currentArticle: null }),
}));
