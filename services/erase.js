/**
 * Функция очищает массив от ложных значений: false, undefined, '', 0, null
 */
 export function erase(data) {
    return data.filter(Boolean);
  }
  