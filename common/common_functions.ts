export const getDateTime = () => {
  const dateTime = new Date();
  const date =
    dateTime.getFullYear() +
    "-" +
    (dateTime.getMonth() + 1) +
    "-" +
    dateTime.getDate();
  const time =
    dateTime.getHours() +
    ":" +
    dateTime.getMinutes() +
    ":" +
    dateTime.getSeconds();
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
