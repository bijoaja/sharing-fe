import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticleStore } from '../stores/articleStore';
import { LoadingSpinner } from '../components/LoadingSpinner';

type TabFilter = 'publish' | 'draft' | 'thrash';

export function Dashboard() {
  const navigate = useNavigate();
  const articles = useArticleStore((state) => state.articles);
  const isLoading = useArticleStore((state) => state.isLoading);
  const fetchArticles = useArticleStore((state) => state.fetchArticles);
  const deleteArticle = useArticleStore((state) => state.deleteArticle);

  const [activeTab, setActiveTab] = useState<TabFilter>('publish');

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const filteredArticles = articles.filter((article) => article.status === activeTab);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(id);
    }
  };

  const tabs: Array<{ id: TabFilter; label: string }> = [
    { id: 'publish', label: 'Published' },
    { id: 'draft', label: 'Drafts' },
    { id: 'thrash', label: 'Trashed' },
  ];

  const statusBadgeStyles = {
    publish: 'bg-primary-fixed/20 text-primary-fixed border border-primary-fixed/30',
    draft: 'bg-secondary-container text-on-secondary-container border border-secondary-container/50',
    thrash: 'bg-error-container text-on-error-container border border-error-container/50',
  };

  const badgeClasses = 'inline-block px-3 py-1 rounded-full text-label-caps font-semibold';

  return (
    <main className="pt-24 w-full flex-grow pb-16 px-margin-mobile md:pl-[284px] md:pr-margin-desktop max-w-[calc(1280px+260px)] mx-auto">
      {/* Header  */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-gutter gap-4">
        <div className="flex-1 w-full">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface dark:text-on-surface font-bold mb-2">
            Articles
          </h2>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-surface-variant dark:border-surface-variant overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 py-2 border-b-2 font-semibold text-body-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary dark:text-primary-fixed'
                    : 'border-transparent text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add New Button */}
        <button
          onClick={() => navigate('/article/new')}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-title-sm text-title-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-sm whitespace-nowrap w-full md:w-auto justify-center md:justify-start"
        >
          <span className="material-symbols-outlined text-sm">add</span> Add New
        </button>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-on-surface-variant text-body-md">No articles in this category</p>
        </div>
      ) : (
        /* Article Table */
        <div className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant dark:border-surface-variant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container dark:bg-surface-container-high text-on-surface dark:text-on-surface border-b-2 border-outline-variant dark:border-outline-variant text-label-caps font-semibold">
                  <th className="py-3 px-gutter">Title</th>
                  <th className="py-3 px-gutter hidden sm:table-cell">Category</th>
                  <th className="py-3 px-gutter hidden md:table-cell">Status</th>
                  <th className="py-3 px-gutter text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant dark:divide-surface-variant text-body-sm text-on-surface dark:text-on-surface">
                {filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors duration-200 ease-out group"
                  >
                    <td className="py-4 px-gutter font-medium">
                      <button
                        onClick={() => navigate(`/article/${article.id}`)}
                        className="text-primary dark:text-primary-fixed hover:underline truncate block max-w-[150px] md:max-w-none"
                      >
                        {article.title}
                      </button>
                      {/* Mobile: Show category and status inline */}
                      <div className="md:hidden text-body-sm text-secondary dark:text-secondary-fixed-dim mt-1">
                        {article.category}
                      </div>
                      <div className="md:hidden mt-1">
                        <span className={`${badgeClasses} ${statusBadgeStyles[article.status]}`}>
                          {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-gutter text-secondary dark:text-secondary-fixed-dim hidden sm:table-cell">
                      {article.category}
                    </td>
                    <td className="py-4 px-gutter hidden md:table-cell">
                      <span className={`${badgeClasses} ${statusBadgeStyles[article.status]}`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-gutter text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => navigate(`/article/${article.id}/edit`)}
                          className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-secondary dark:text-secondary-fixed-dim hover:text-error dark:hover:text-error transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-gutter py-4 border-t border-surface-variant dark:border-surface-variant bg-surface-container-lowest dark:bg-surface-container-lowest flex justify-between items-center">
            <div className="text-body-sm text-secondary dark:text-secondary-fixed-dim">
              Showing 1 to {filteredArticles.length} of {articles.length} results
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 border border-outline-variant text-on-surface dark:text-on-surface rounded-lg hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors disabled:text-outline-variant disabled:cursor-not-allowed text-body-sm font-semibold"
                disabled={filteredArticles.length === articles.length}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border border-outline-variant text-on-surface dark:text-on-surface rounded-lg hover:bg-surface-container-low dark:hover:bg-surface-container-high transition-colors disabled:text-outline-variant disabled:cursor-not-allowed text-body-sm font-semibold"
                disabled={filteredArticles.length === articles.length}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
