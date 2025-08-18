export const formatCurrency = (price) => {
  return Number(price).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });
};
