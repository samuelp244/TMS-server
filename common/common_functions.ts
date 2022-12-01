export const getDateTime = () => {
  const currentTime = new Date();
  let currentOffset = currentTime.getTimezoneOffset();
  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  const date =
    ISTTime.getFullYear() +
    "-" +
    (ISTTime.getMonth() + 1) +
    "-" +
    ISTTime.getDate();
  const time =
    ISTTime.getHours() +
    ":" +
    ISTTime.getMinutes() +
    ":" +
    ISTTime.getSeconds();

  return date + " " + time;
};

export const generateKey = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
