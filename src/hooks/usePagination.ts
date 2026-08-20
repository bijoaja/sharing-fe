import { useState } from 'react';

interface UsePaginationResult {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination(totalItems: number, itemsPerPage: number = 10): UsePaginationResult {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (hasNext) goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (hasPrev) goToPage(currentPage - 1);
  };

  return {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
  };
}
