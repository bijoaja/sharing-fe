import { useNavigate } from 'react-router-dom';
import { Article } from '../types/article';

interface ArticleListItemProps {
  article: Article;
}

function getExcerpt(text: string, length: number = 150): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

export function ArticleListItem({ article }: ArticleListItemProps) {
  const navigate = useNavigate();

  return (
    <article
      className="bg-surface-container-lowest dark:bg-surface-container-lowest rounded-lg border border-surface-variant dark:border-surface-variant p-gutter shadow-sm hover:shadow-elevated transition-shadow cursor-pointer"
      onClick={() => navigate(`/article/${article.id}`)}
      role="link"
    >
      {/* Title */}
      <h3
        className="text-headline-md font-semibold text-primary dark:text-primary-fixed hover:underline transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/article/${article.id}`);
        }}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-body-md text-on-surface dark:text-on-surface mt-2 leading-relaxed">
        {getExcerpt(article.content, 150)}
      </p>

      {/* Metadata */}
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        {/* Category Badge */}
        <div className="flex items-center gap-1">
          <span className="inline-block px-3 py-1 bg-secondary-container dark:bg-secondary-container text-on-secondary-container dark:text-on-secondary-container rounded-full text-label-caps font-semibold">
            {article.category}
          </span>
        </div>

        {/* Published Date */}
        <div className="flex items-center gap-2 text-body-sm text-on-surface-variant dark:text-on-surface-variant">
          <span className="material-symbols-outlined text-base">calendar_month</span>
          <time dateTime={article.created_date}>
            {new Date(article.created_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Status Badge */}
        <div className="ml-auto">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              article.status === 'publish'
                ? 'bg-primary-fixed/20 text-primary-fixed border border-primary-fixed/30'
                : article.status === 'draft'
                  ? 'bg-secondary-container text-on-secondary-container border border-secondary-container/50'
                  : 'bg-error-container text-on-error-container border border-error-container/50'
            }`}
          >
            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
          </span>
        </div>
      </div>
    </article>
  );
}
