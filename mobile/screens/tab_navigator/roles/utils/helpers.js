//Função que separa uma data no formato yyyy-mm-dd, transforma em int ou então exibe a mesma data, só que no formato dd-mm-yyyy
export function formatDate (eventDate){
  const day = eventDate.slice(-2)
  const month = eventDate.slice(5, 7)
  const year = eventDate.slice(0, 4);
  return {
    day: day,
    month: month,
    year: year,
    intDay: parseInt(day),
    intMonth: parseInt(month),
    intYear: parseInt(year),
    formatted: day+'/'+month+'/'+year
  };
};

export function timeNow(){
  const date = new Date()
  return{
    day: (date.getDate()+1),
    month: date.getMonth()+1,
    year: date.getFullYear(),
    today: (date.getDate()+1)+' '+(date.getMonth()+1)+' '+date.getFullYear()
  }
}