function getRandomId(ids: (number | undefined)[]):number {
    const filteredIds = ids.filter(num => num !== undefined) as number[];
    const randomId = () => {
      const id = Math.floor(Math.random() * 10000);
  
      if (!filteredIds.some((item)=> item === id)) {
        return id;
      }
  
      return randomId(); // Recursively try again if ID already exists
    };
  
    return randomId();
};
  export default getRandomId;