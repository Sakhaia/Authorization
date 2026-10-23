import { Card } from "@/shared/ui/card";
import styles from "./ProfilePhoto.module.css";
import preview from "../../assets/Unphoto.svg";
import load from "../../assets/Gallery.svg";
import { useProfilePhoto } from "../../model/useProfilePhoto";

export const ProfilePhoto = () => {
  const {
    field,
    handleDelete,
    isDragging,
    handleDropzoneClick,
    handleDrop,
    fileInputRef,
    handleFileChange,
    handleDragEnter,
    handleDragLeave,
  } = useProfilePhoto();

  return (
    <Card className={styles.photo}>
      <div className={styles.info}>
        <h3>Фото профиля</h3>
        <p>
          Поделитесь своими профиями
          <br />в других соц. сетях
        </p>
      </div>
      <div className={styles.group}>
        <div className={styles.preview}>
          <img src={field.value ?? preview} />
          <button
            type="button"
            onClick={handleDelete}
            className={styles.deletePhoto}
          >
            Удалить фото
          </button>
        </div>
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ""}`}
          onClick={handleDropzoneClick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <img src={load} />
          <h4>
            <span className={styles.change}>Кликини для изменения</span> или
            перетащи сюда фотографию
          </h4>
          <p>JPG,PNG,JPEG (не более 5мб)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            hidden
          />
        </div>
      </div>
    </Card>
  );
};
