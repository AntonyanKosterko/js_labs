/**
 * Ищет 4 разных индекса w, x, y, z в массиве целых чисел,
 * чтобы максимизировать (nums[w]*nums[x]) - (nums[y]*nums[z]).
 */
 export function maxQualityDifference(nums) {
    let maxDiff = Number.NEGATIVE_INFINITY;
  
    for (let w = 0; w < nums.length; w++) {
      for (let x = w + 1; x < nums.length; x++) {
        for (let y = 0; y < nums.length; y++) {
          for (let z = y + 1; z < nums.length; z++) {
            if (w !== y && w !== z && x !== y && x !== z) {
              const diff = (nums[w] * nums[x]) - (nums[y] * nums[z]);
              if (diff > maxDiff) {
                maxDiff = diff;
              }
            }
          }
        }
      }
    }
  
    return maxDiff;
  }
  