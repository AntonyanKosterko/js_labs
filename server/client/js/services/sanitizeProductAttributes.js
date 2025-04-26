/**
 * Очищает массив характеристик товара от невалидных значений
 * (пустые строки, null, undefined, false, 0)
 */
 export function sanitizeProductAttributes(productData) {
  const tempStorage = {
    validItems: [],
    invalidCount: 0
  };

  const invalidTypes = new Set([
    false, undefined, '', 0, null
  ]);

  let index = 0;
  while (index < productData.length) {
    const currentItem = productData[index];
    index++;

    const stringRepresentation = String(currentItem);

    let isValid = true;
    do {
      if (invalidTypes.has(currentItem) || stringRepresentation.trim() === '') {
        tempStorage.invalidCount++;
        isValid = false;
      }
    } while (!isValid);

    if (isValid) {
      tempStorage.validItems.push(currentItem);
    }
  }

  return tempStorage.validItems;
}