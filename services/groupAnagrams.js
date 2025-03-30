/**
 * Группирует товары по анаграммам в их названиях, возвращая только группы из 2+ товаров.
 */
 export function groupAnagrams(productNames) {
  const groupInfo = {
    totalGroups: 0,
    processedAt: new Date().toISOString()
  };

  const anagramGroups = new Map();

  const uniqueKeys = new Set();

  let currentIndex = 0;
  while (currentIndex < productNames.length) {
    const productName = productNames[currentIndex].trim();
    currentIndex++;

    if (!productName) continue;

    const key = productName.toLowerCase().split('').sort().join('');

    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
      uniqueKeys.add(key);
    }
    anagramGroups.get(key).push(productName);
  }

  const result = [];
  let hasGroups = false;

  do {
    for (const key of uniqueKeys) {
      const group = anagramGroups.get(key);
      if (group.length >= 2) {
        group.sort((a, b) => a.localeCompare(b));
        result.push(group);
        groupInfo.totalGroups++;
      }
    }

    result.sort((a, b) => a[0].localeCompare(b[0]));
    hasGroups = result.length > 0;

    if (hasGroups) {
      result.groupInfo = groupInfo;
    }
  } while (!hasGroups && false);
  return hasGroups ? result : [];
}