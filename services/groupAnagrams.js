/**
 * Группирует слова-анаграммы, возвращая только группы из 2+ слов.
 */
 export function groupAnagrams(words) {
    const anagramMap = new Map();
  
    for (let word of words) {
      word = word.trim();
      if (!word) continue;
  
      const key = word.split('').sort().join('');
      if (!anagramMap.has(key)) {
        anagramMap.set(key, []);
      }
      anagramMap.get(key).push(word);
    }
  
    const result = [];
    for (let group of anagramMap.values()) {
      if (group.length >= 2) {
        group.sort();
        result.push(group);
      }
    }
  
    result.sort((a, b) => a[0].localeCompare(b[0]));
  
    return result;
  }
  