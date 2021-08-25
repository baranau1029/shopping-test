export function getNotNULLNumber(value: any) {
  const number = parseFloat(value);
  if (isNaN(number)) {
    return 0;
  }
  return number;
}

export function formatedNumber(amount: any) {
  const number = parseFloat(amount);
  if (isNaN(number)) {
    return '0.00';
  }
  return Number(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
