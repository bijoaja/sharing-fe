import { Article, getExcerpt, PostStatus } from '../types/article';

interface ArticleCardProps {
  article: Article;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const statusColors: Record<PostStatus, string> = {
  publish: 'bg-green-100 text-green-800',
  draft: 'bg-yellow-100 text-yellow-800',
  thrash: 'bg-red-100 text-red-800',
};

export function ArticleCard({
  article,
  onEdit,
  onDelete,
  onView,
}: ArticleCardProps) {
  const excerpt = getExcerpt(article.content);

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 flex-1">{article.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${statusColors[article.status]}`}>
          {article.status}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-2">{article.category}</p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{excerpt}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onView(article.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          View
        </button>
        <button
          onClick={() => onEdit(article.id)}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Updated: {new Date(article.updated_date).toLocaleDateString()}
      </p>
    </div>
  );
}
