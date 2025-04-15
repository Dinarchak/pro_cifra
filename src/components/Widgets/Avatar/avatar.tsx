import style from "./.module.css";
import upload from "../../../static/upload_file.svg";
import { useEffect, useState, useRef } from 'react';

type AvatarType = {
    blob?: Blob,
    size: number,
    enabled: boolean,
    default_avatar?: string,
    updateAvatar?: (file: File) => Promise<void>
}

const Avatar: React.FC<AvatarType> = (props: AvatarType) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [blob_, setBlob] = useState<Blob | null>(props.blob ? props.blob : null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        console.log('Выбран файл:', file);
        setBlob(file);
        if (props.updateAvatar) {
            console.log("вызвал функцию")
            await props.updateAvatar(file);
        }
    }
  };

  useEffect(() => {
    setBlob(props.blob ? props.blob : null);
  }, [props.blob])

  useEffect(() => {
    if (blob_) {
        const url = URL.createObjectURL(blob_);
        setObjectUrl(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }
  }, [blob_]);

  return (
    <div className={style.container} style={{ height: `${props.size}rem`, width: `${props.size}rem` }}>
    <img className={props.enabled ? style.avatar : style.constAvatar} src={objectUrl ? objectUrl : props.default_avatar} alt="Аватар"/>
      {props.enabled && <>
      <img className={style.iconOverlay} src={upload} onClick={handleIconClick}/>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      /></>}
    </div>
  );
};

export default Avatar;