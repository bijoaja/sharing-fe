import { Article } from '../types/article';
import { ArticleCard } from './ArticleCard';
import { LoadingSpinner } from './LoadingSpinner';

interface ArticleListProps {
  articles: Article[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

export function ArticleList({
  articles,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: ArticleListProps) {
  if (isLoading) return <LoadingSpinner />;

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No articles yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
