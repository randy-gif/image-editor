import { useState } from 'react';

type Id = string;

const useId = (): Id => {
  const [idCounter, setIdCounter] = useState<number>(0);

  const generateRandomId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const idLength = 20;
    let randomId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  };

  const generateUniqueId = (): Id => {
    setIdCounter((prevCounter) => prevCounter + 1);
    const newIdCounter = idCounter + 1;
    return `id_${newIdCounter}_${generateRandomId()}`;
  };

  return generateUniqueId();
};

export default useId;
