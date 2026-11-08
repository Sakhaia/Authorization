export const getPages = (totalPages: number, currentPage: number) => {
  const pages: (number | string)[] = []; // либо (123 | ...)
        for (let i = 1; i <= totalPages; i++) { // i - номер стр, до последней, на каждо шаге увеличиваем на +1
            if (
                i === 1 ||  // если это 1 стр
                i === totalPages || // если это посл стр
                (i >= currentPage - 1 && i <= currentPage + 1)) { // если на 5, показываем 456
                pages.push(i) // кладем
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...')
            }
        }
        return pages;
}


