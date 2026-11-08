import { type Specialization } from "@/entities"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { columns } from "../model/columns";
import styles from './SpecializationsTable.module.css'
import { SpecializationsToolbar } from "./SpecializationsToolbar";

type SpecializationsTableProps = {
    data: Specialization[];
    isLoading: boolean;
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    page: number;
    sortOrder: string;
    onSortChange: (newOrder: string) => void;
    onDeleteSelected: (id: number[]) => void;
    isDeleting: boolean;
}

export const SpecializationsTable = ({data, isLoading, searchQuery, setSearchQuery, page, sortOrder, onSortChange, onDeleteSelected, isDeleting}: SpecializationsTableProps) => {
    const [rowSelection, setRowSelection] = useState({}); // состояние для выделенных строк, {}-изначаьно ниче не выделено
    

    const tableColums = useMemo(() => columns(page), [page])

    const table = useReactTable({ // передаем данные 
        data: data, // с сервера
        columns: tableColums, // инструкцию
        state: {rowSelection}, // тек. сост галочек
        onRowSelectionChange: setRowSelection, // куда сохр сост галочек
        getCoreRowModel: getCoreRowModel(), // базовая логика строк
    })

    const selectedId = Object.keys(rowSelection)
        .map(index => data[Number(index)]?.id)
        .filter(Boolean) as number[];

    const handleDeleteClick = () => {
        onDeleteSelected(selectedId);
        setRowSelection({}); // Очищаем галочки после удаления
    };

    if (isLoading || isDeleting) return <span>...Загрузка</span>

    return (
        <div className={styles.wrapper}>
            <SpecializationsToolbar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onDelete={handleDeleteClick}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
            />
            <table className={styles.table}>
                <thead> 
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}> 
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className={styles.th}> 
                                    {header.isPlaceholder ? null : flexRender( 
                                        header.column.columnDef.header, header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody> 
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className={styles.trBody}>
                            {row.getVisibleCells().map((cell) => ( 
                                <td key={cell.id} className={styles.td}> 
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}