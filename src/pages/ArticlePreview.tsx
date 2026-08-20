import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticleStore } from '../stores/articleStore';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function ArticlePreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id || isNaN(Number(id))) {
    return (
      <div className="pt-24 md:pl-[284px] px-margin-mobile md:px-margin-desktop flex items-center justify-center min-h-screen">
        <div className="text-center text-error">Invalid article ID</div>
      </div>
    );
  }

  const currentArticle = useArticleStore((state) => state.currentArticle);
  const isLoading = useArticleStore((state) => state.isLoading);
  const fetchArticle = useArticleStore((state) => state.fetchArticle);

  useEffect(() => {
    fetchArticle(Number(id));
  }, [id, fetchArticle]);

  if (isLoading) return <LoadingSpinner />;

  if (!currentArticle) {
    return (
      <div className="pt-24 md:pl-[284px] px-margin-mobile md:px-margin-desktop flex items-center justify-center min-h-screen">
        <div className="text-center text-on-surface-variant">Article not found</div>
      </div>
    );
  }

  const badgeClasses = 'px-3 py-1 rounded-full text-label-caps font-semibold border';
  const statusColor = {
    publish: `${badgeClasses} bg-primary-fixed/20 text-primary-fixed border-primary-fixed/30`,
    draft: `${badgeClasses} bg-secondary-container text-on-secondary-container border-secondary-container/50`,
    thrash: `${badgeClasses} bg-error-container text-on-error-container border-error-container/50`,
  };

  return (
    <main className="pt-24 w-full flex-grow pb-16 px-margin-mobile md:pl-[284px] md:pr-margin-desktop max-w-[calc(1280px+260px)] mx-auto">
      <button
        onClick={() => navigate('/')}
        className="text-primary hover:text-indigo-900 mb-6 font-medium text-body-sm md:text-body-md transition-colors"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-3xl">
        <article className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-xl border border-surface-variant dark:border-surface-variant p-3 md:p-gutter shadow-sm">
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-surface-variant dark:border-surface-variant">
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface font-bold flex-1">
                {currentArticle.title}
              </h1>
              <span className={`${statusColor[currentArticle.status]} whitespace-nowrap`}>
                {currentArticle.status.charAt(0).toUpperCase() + currentArticle.status.slice(1)}
              </span>
            </div>

            <div className="flex gap-6">
              <div>
                <p className="text-label-caps text-on-surface-variant dark:text-on-surface-variant font-semibold">Category</p>
                <p className="text-body-md text-on-surface dark:text-on-surface">{currentArticle.category}</p>
              </div>
              <div>
                <p className="text-label-caps text-on-surface-variant dark:text-on-surface-variant font-semibold">Updated</p>
                <p className="text-body-md text-on-surface dark:text-on-surface">
                  {new Date(currentArticle.updated_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-8">
            <p className="text-body-md text-on-surface dark:text-on-surface leading-relaxed whitespace-pre-wrap">
              {currentArticle.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-8 border-t border-surface-variant dark:border-surface-variant">
            <button
              onClick={() => navigate(`/article/${currentArticle.id}/edit`)}
              className="bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-on-primary-fixed-variant dark:hover:bg-on-primary-fixed-variant active:scale-[0.98] transition-all"
            >
              Edit Article
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-surface-variant dark:border-surface-variant text-on-surface dark:text-on-surface px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-surface-container dark:hover:bg-surface-container transition-colors"
            >
              Back
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
