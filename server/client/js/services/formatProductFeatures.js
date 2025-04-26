/**
 * Формирует строку характеристик товара из массива, объединяя их через разделитель
 */
 export function formatProductFeatures(productFeatures, featureDelimiter) {
  if (!Array.isArray(productFeatures)) {
    console.warn('Характеристики товара должны быть переданы массивом');
    return '';
  }
  
  return productFeatures.join(featureDelimiter);
}