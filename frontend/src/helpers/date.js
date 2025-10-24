import {parse, formatISO, parseISO, format} from 'date-fns';

export function convertToISO(strDate) {
  const newDate = parse(strDate, 'dd/MM/yyyy', new Date());
  return formatISO(newDate)
}

export function displayDate(date){
  const newDate = parseISO(date);
  return format(newDate, 'PPPP');
}

export function convertToDDMMYYYY(isoDate){
  const newDate = new Date(isoDate);
  const formattedDate = format(newDate, 'dd/MM/yyyy');
  return formattedDate;
}
