export const generateRandomId = () => {
    const newId = `${Date.now().toString(36).toUpperCase()}${Math.floor(
      Math.random() * 123
    )}`;
  
    return newId;
  };