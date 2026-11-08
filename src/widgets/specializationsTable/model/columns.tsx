import type { Specialization } from "@/entities";
import { createColumnHelper } from "@tanstack/react-table";
import action from '../assets/Popover.svg'
import copy from '../assets/Copy.svg'
import { ButtonLink } from "@/shared/ui/buttonLink";

const columnHelper = createColumnHelper<Specialization>(); // подсказки для полей 

export const columns = (page: number) => [
    // ЧЕКБОКС
    columnHelper.display({ // display - колонки, которых нет на сервере 
        id: 'select', // уник имя для колонки
        header: ({ table }) => ( // шапка таблицы (объект table)
            <input 
                type="checkbox" // главный чекбокс - выбрать всё
                checked={table.getIsAllPageRowsSelected()} // если все строки выделенф, этот чекбокс будет с галочкой
                onChange={table.getToggleAllPageRowsSelectedHandler()} // если нажать на этот чекбокс, выделятся всё
            />
        ),
        cell: ({ row }) => ( // то что будет в каждой строке табл (объект строк)
            <input 
                type="checkbox"
                checked={row.getIsSelected()} // если выделена, конкретная строка, ставим галочку
                disabled={!row.getCanSelect()} // еси строку нельзя выдлеить, откл чекбокс
                onChange={row.getToggleSelectedHandler()} // при клике на чекбокс, выделяем/снимаем только с этой строки
            />
        )
    }),
    // КАРТИНКИ
    columnHelper.accessor('imageSrc', {
        header: 'Картинка',
        cell: (info) => (
            <img 
            src={info.getValue()} 
            style={{width: 92, height: 92, borderRadius: '12px', objectFit: 'cover'}}/>
        ) 
    }),
    //НАЗВАНИЕ
    columnHelper.accessor('title', {
        header: 'Название',
        cell: (info) => (
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <span>{info.getValue()}</span>
                <ButtonLink
                link={`/specializations/${info.row.original.id}`}
                state={{fromPage: page}}
                linkText="Развернуть"
                style={{display: 'flex', justifyContent: 'flex-start', color: 'var(--black200)', fontSize: '12px', fontWeight: 400}}
                />
            </div>
        )
    }),
    // ОПИСАНИЕ
    columnHelper.accessor('description', {
        header: 'Описание',
        cell: (info) => {
            const text = info.getValue() || '';
            return (
                <span>{text.length > 60 ? `${text.substring(0, 60)}...` : text}</span>
            )
        }
    }),
    // 3 ТОЧКИ
    columnHelper.display({
        id: 'actions',
        header: '',
        cell: () => (
            <button type="button"><img src={action} /></button>
        )
    }),
    // СКОПИРОВАТЬ
    columnHelper.display({
        id: 'copy',
        header: '',
        cell: () => (
            <button type="button"><img src={copy} /></button>
        )
    })
];