
export const getDateTime = () =>{
    const dateTime = new Date();
    const date = dateTime.getFullYear()+"-"+(dateTime.getMonth()+1)+"-"+dateTime.getDate();
    const time = dateTime.getHours()+":"+dateTime.getMinutes()+":"+dateTime.getSeconds();
    return date+" "+time; 
}