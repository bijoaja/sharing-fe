import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticleStore } from '../stores/articleStore';
import { ArticleFormData, ArticleFormMode } from '../types/article';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function ArticleForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mode: ArticleFormMode = id ? 'edit' : 'create';

  const currentArticle = useArticleStore((state) => state.currentArticle);
  const isLoading = useArticleStore((state) => state.isLoading);
  const fetchArticle = useArticleStore((state) => state.fetchArticle);
  const saveArticle = useArticleStore((state) => state.saveArticle);

  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    content: '',
    category: '',
    status: 'draft',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id && !isNaN(Number(id))) {
      fetchArticle(Number(id));
    }
  }, [id, mode, fetchArticle]);

  useEffect(() => {
    if (mode === 'edit' && currentArticle) {
      setFormData({
        title: currentArticle.title,
        content: currentArticle.content,
        category: currentArticle.category,
        status: currentArticle.status,
      });
    }
  }, [currentArticle, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim() || formData.title.length < 20) {
      alert('Title is required (min 20 characters)');
      return false;
    }

    if (!formData.content.trim() || formData.content.length < 200) {
      alert('Content is required (min 200 characters)');
      return false;
    }

    if (!formData.category.trim() || formData.category.length < 3) {
      alert('Category is required (min 3 characters)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (status: 'publish' | 'draft') => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const articleId = id ? Number(id) : undefined;
      await saveArticle({ ...formData, status }, articleId);
      navigate('/');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (mode === 'edit' && isLoading) return <LoadingSpinner />;

  return (
    <main className="pt-24 w-full flex-grow pb-16 px-margin-mobile md:pl-[284px] md:pr-margin-desktop max-w-[calc(1280px+260px)] mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-primary hover:text-indigo-900 mb-6 font-medium text-body-sm md:text-body-md transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-3xl">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface font-bold mb-8">
          {mode === 'create' ? 'Create Article' : 'Edit Article'}
        </h1>

        <form
          className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-xl border border-surface-variant dark:border-surface-variant p-3 md:p-gutter space-y-6 shadow-sm"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-label-caps text-on-surface-variant dark:text-on-surface-variant mb-2 font-semibold">
              Title * (min 20 chars)
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              disabled={isSaving}
              placeholder="Enter article title"
              className="w-full px-4 py-3 border border-surface-variant dark:border-surface-variant rounded-lg text-body-md text-on-surface dark:text-on-surface placeholder-on-surface-variant dark:placeholder-on-surface-variant bg-surface-container-lowest dark:bg-surface-container-lowest focus:border-primary dark:focus:border-primary-fixed focus:outline-none focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary-fixed/10 disabled:bg-surface-container-low dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-label-caps text-on-surface-variant dark:text-on-surface-variant mb-2 font-semibold">
              Category * (min 3 chars)
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              disabled={isSaving}
              placeholder="e.g., Technology, Business, Lifestyle"
              className="w-full px-4 py-3 border border-surface-variant dark:border-surface-variant rounded-lg text-body-md text-on-surface dark:text-on-surface placeholder-on-surface-variant dark:placeholder-on-surface-variant bg-surface-container-lowest dark:bg-surface-container-lowest focus:border-primary dark:focus:border-primary-fixed focus:outline-none focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary-fixed/10 disabled:bg-surface-container-low dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant transition-all"
            />
          </div>


          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-label-caps text-on-surface-variant dark:text-on-surface-variant mb-2 font-semibold">
              Content * (min 200 chars)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              disabled={isSaving}
              rows={10}
              placeholder="Enter article content"
              className="w-full px-4 py-3 border border-surface-variant dark:border-surface-variant rounded-lg text-body-md text-on-surface dark:text-on-surface placeholder-on-surface-variant dark:placeholder-on-surface-variant bg-surface-container-lowest dark:bg-surface-container-lowest focus:border-primary dark:focus:border-primary-fixed focus:outline-none focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary-fixed/10 disabled:bg-surface-container-low dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant font-mono transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-surface-variant dark:border-surface-variant">
            <button
              type="button"
              onClick={() => handleSubmit('publish')}
              disabled={isSaving}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-primary/90 disabled:bg-surface-container-high dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              {isSaving ? 'Saving...' : 'Publish'}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit('draft')}
              disabled={isSaving}
              className="border border-surface-variant dark:border-surface-variant text-on-surface dark:text-on-surface px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-surface-container dark:hover:bg-surface-container disabled:bg-surface-container-low dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              {isSaving ? 'Saving...' : 'Draft'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={isSaving}
              className="border border-surface-variant dark:border-surface-variant text-on-surface dark:text-on-surface px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-surface-container dark:hover:bg-surface-container disabled:bg-surface-container-low dark:disabled:bg-surface-container-high disabled:text-on-surface-variant dark:disabled:text-on-surface-variant transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
