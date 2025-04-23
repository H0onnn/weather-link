'use client';

import { Camera, User } from 'lucide-react';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface ProfileImageInputProps {
  name?: string;
  isDescriptionVisible?: boolean;
  defaultImage?: string;
}

const ProfileImageInput = ({
  name = 'profileImage',
  isDescriptionVisible = true,
  defaultImage,
}: ProfileImageInputProps) => {
  const { register, setValue } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const { ref, onChange, ...rest } = register(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onChange(e);

    setValue(name, file, { shouldValidate: true });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative cursor-pointer" onClick={handleClick}>
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {previewUrl ? (
            <Image src={previewUrl} alt="프로필 이미지" className="w-full h-full object-cover" width={96} height={96} />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              {defaultImage ? (
                <Image src={defaultImage} alt="프로필" className="w-full h-full object-cover" width={96} height={96} />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 shadow-md">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>
      {isDescriptionVisible && <p className="text-sm text-gray500 mt-2">프로필 이미지 추가</p>}
      <input
        type="file"
        className="hidden"
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        accept="image/*"
        onChange={handleImageChange}
        {...rest}
      />
    </div>
  );
};

export default ProfileImageInput;
