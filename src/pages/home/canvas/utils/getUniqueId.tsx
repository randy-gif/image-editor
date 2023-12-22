type Id = string;

const getUniqueId = () => {

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
    const date = new Date().toISOString().toString();
    let dateId = '';
    for (const char of date) {
      if (char !== '-' && char !== ':' && char !== '.') {
        dateId += char;
      }
    }
    return `${dateId}${generateRandomId()}`;
  };

  return generateUniqueId();
};

export default getUniqueId;
