import { useEffect } from 'react';
import { useArticleStore } from '../stores/articleStore';
import { usePagination } from '../hooks/usePagination';
import { ArticleListItem } from '../components/ArticleListItem';
import { LoadingSpinner } from '../components/LoadingSpinner';

export function PreviewPage() {
  const articles = useArticleStore((state) => state.articles);
  const isLoading = useArticleStore((state) => state.isLoading);
  const fetchArticles = useArticleStore((state) => state.fetchArticles);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Filter published articles only
  const publishedArticles = articles.filter((article) => article.status === 'publish');

  // Pagination hook
  const pagination = usePagination(publishedArticles.length, 10);
  const displayedArticles = publishedArticles.slice(pagination.startIndex, pagination.endIndex);

  if (isLoading) return <LoadingSpinner />;

  return (
    <main className="pt-24 w-full flex-grow pb-16 px-margin-mobile md:pl-[284px] md:pr-margin-desktop max-w-[calc(1280px+260px)] mx-auto">
      {/* Hero Section */}
      <section className="mb-gutter">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface font-bold mb-2">
          Explore Our Articles
        </h1>
        <p className="text-body-md md:text-body-lg text-on-surface-variant dark:text-on-surface-variant">
          Discover latest insights and stories from our editorial team
        </p>
      </section>

      {/* Articles List */}
      {publishedArticles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-body-md text-on-surface-variant dark:text-on-surface-variant">
            No published articles yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-gutter">
            {displayedArticles.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-lg border border-surface-variant dark:border-surface-variant p-gutter shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 md:gap-gutter justify-between items-center">
              {/* Info Text */}
              <div className="text-body-sm text-on-surface-variant dark:text-on-surface-variant">
                Showing {pagination.startIndex + 1} to {pagination.endIndex} of{' '}
                {pagination.totalItems} articles
              </div>

              {/* Pagination Buttons */}
              <div className="flex gap-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
                {/* Previous Button */}
                <button
                  onClick={pagination.prevPage}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-2 border border-outline-variant text-on-surface dark:text-on-surface rounded-lg hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors disabled:text-outline-variant disabled:cursor-not-allowed text-body-sm font-semibold"
                >
                  ← Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => pagination.goToPage(pageNum)}
                        className={`min-w-[40px] px-2 py-2 rounded-lg font-semibold text-body-sm transition-all ${
                          pagination.currentPage === pageNum
                            ? 'bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed'
                            : 'border border-outline-variant text-on-surface dark:text-on-surface hover:bg-surface-container-low dark:hover:bg-surface-container-high'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={pagination.nextPage}
                  disabled={!pagination.hasNext}
                  className="px-3 py-2 border border-outline-variant text-on-surface dark:text-on-surface rounded-lg hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors disabled:text-outline-variant disabled:cursor-not-allowed text-body-sm font-semibold"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
