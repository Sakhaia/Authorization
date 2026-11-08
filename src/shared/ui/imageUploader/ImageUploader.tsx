import styles from './ImageUploader.module.css'; 
import preview from '../../../pages/profile/edit/assets/Unphoto.svg'; // Заглушка
import load from '../../../pages/profile/edit/assets/Gallery.svg'; // Иконка загрузки
import { useImageUpload } from '@/shared/lib/useImageUpload';
import { processFile } from '@/shared/helpers/processFile';

type Props = {
  value: string | null; // base64 (новое фото) или null
  defaultImageUrl?: string; // Старое фото с сервера (imageSrc)
  onChange: (value: string | null) => void; // Функция для react-hook-form
};

export const ImageUploader = ({ value, defaultImageUrl, onChange }: Props) => {
  const {
    fileInputRef,
    isDragging,
    handleDropzoneClick,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
  } = useImageUpload();


  const imageSrc = value === "" ? preview : (value || defaultImageUrl || preview);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await processFile(file); // Импортируй processFile
    onChange(base64);
  };

  const handleDelete = () => {
    onChange(""); // Отправляем пустую строку (удаление)
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
        <img src={imageSrc} className={styles.previewImg}/>
        {imageSrc !== preview && (
          <button type="button" onClick={handleDelete} className={styles.deleteBtn}>
            Удалить фото
          </button>
        )}
      </div>

      <div
        className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""}`}
        onClick={handleDropzoneClick}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, onChange)} // Передаем onChange из RHF
      >
        <img src={load} className={styles.loadImg} />
        <div className={styles.text}>
            <h4><span className={styles.click}>Кликини для изменения</span> или перетащи сюда картинку</h4>
            <p>
                JPG,PNG,JPEG (максимальный размер файла 150КБ)
                <br/>Рекомендуемый размер — 800×800 px
                <br/>Принимаем только квадратные картинки
            </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleFileChange}
          hidden
        />
      </div>
    </div>
  );
};