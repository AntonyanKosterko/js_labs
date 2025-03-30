/**
 * Находит максимальную разницу между произведениями пар цен товаров
 * для выявления наиболее выгодных комбинаций для сравнения
 */
 export function findMaxPriceCombinationDifference(productPrices) {
  if (!Array.isArray(productPrices)) {
    console.warn('Цены товаров должны быть переданы массивом');
    return 0;
  }

  if (productPrices.length < 4) {
    console.warn('Для сравнения нужно минимум 4 товара');
    return 0;
  }

  let maxDiff = Number.NEGATIVE_INFINITY;

  const sortedPrices = [...productPrices].sort((a, b) => b - a);
  const maxProduct = sortedPrices[0] * sortedPrices[1];

  const minProduct = sortedPrices[sortedPrices.length - 1] * sortedPrices[sortedPrices.length - 2];

  return maxProduct - minProduct;
}