import { useDeleteSpecializationMutation, useGetSpecializationsQuery } from "@/entities";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useSpecializations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchQuery = searchParams.get("title") || "";
  const sortOrder = searchParams.get("sort") || "asc";

  const { data, isLoading } = useGetSpecializationsQuery({
    limit: 5,
    title: searchQuery,
    page,
  });
  const limit = 5;
  const [deleteSpec, {isLoading: isDeleting}] = useDeleteSpecializationMutation();

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  const sortedData = useMemo(() => {
    const items = data?.data || [];
    return [...items].sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });
  }, [data?.data, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const handleSortChange = (newOrder: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sort: newOrder,
    });
  };

  const handleDeleteSelected = async (selectedId: number[]) => {
          if (selectedId.length === 0) return;
          
          if (window.confirm(`Вы уверены, что хотите удалить ${selectedId.length} специализаций?`)) {
              try {
                  await Promise.all(selectedId.map(id => deleteSpec(id).unwrap())); 
                  alert('Успешно удалено!');
              } catch (err) {
                  console.error('Ошибка удаления:', err);
                  alert('Не удалось удалить некоторые элементы');
              }
          }
      };
  return {
    sortedData,
    isLoading,
    searchQuery,
    setSearchParams,
    sortOrder,
    handleSortChange,
    page,
    totalPages,
    handlePageChange,
    handleDeleteSelected,
    isDeleting,
  };
};
