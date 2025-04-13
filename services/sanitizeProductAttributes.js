/**
 * Функция очищает массив от ложных значений: false, undefined, '', 0, null
 */
 export function sanitizeProductAttributes(data) {
    return data.filter(Boolean);
  }
  