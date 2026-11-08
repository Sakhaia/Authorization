import { SpecializationsTable } from "@/widgets/specializationsTable/ui/SpecializationsTable";
import styles from "./Specializations.module.css";
import { Pagination } from "@/shared/ui/pagination";
import { useSpecializations } from "../model/useSpecializations";

export const Specializations = () => {
  const {
    sortedData,
    isLoading,
    searchQuery,
    setSearchParams,
    sortOrder,
    handleSortChange,
    page,
    totalPages,
    handlePageChange,
    isDeleting,
    handleDeleteSelected,
  } = useSpecializations();

  return (
    <div className={styles.spec}>
      <SpecializationsTable
        data={sortedData}
        isLoading={isLoading}
        searchQuery={searchQuery}
        setSearchQuery={(val: string) => {
          setSearchParams({ title: val, page: "1" });
        }}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        page={page}
        isDeleting={isDeleting}
        onDeleteSelected={handleDeleteSelected}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
