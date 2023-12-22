function makeDummyData(count = 100) {
    const users = [];
  
    for (let i = 1; i <= count; i++) {
      const user = {
        uid: `user_${i}`,
        name: `User ${i}`,
        age: getRandomInt(18, 99),
      };
  
      users.push(user);
    }
  
    return users;
  }
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  module.exports = makeDummyData;
  