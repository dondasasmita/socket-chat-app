// Create a function to generate location
const generateLocationMessage = (from, latitude, longitude) => {
  return {
    from: from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports.generateLocationMessage = generateLocationMessage;
