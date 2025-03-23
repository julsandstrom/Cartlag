const fakeBrandAPI = async (measurement) => {
  const brandSizing = {
    Zara: {
      Chest: { S: 92, M: 100, L: 108, XL: 116 },
      Waist: { S: 80, M: 88, L: 96, XL: 104 },
      Arms: { S: 60, M: 63, L: 66, XL: 69 },
      Shoulder: { S: 44, M: 46, L: 48, XL: 50 },
    },
    Gant: {
      Chest: { XS: 88, S: 96, M: 104, L: 112, XL: 120 },
      Waist: { XS: 76, S: 84, M: 92, L: 100, XL: 108 },
      Arms: { XS: 58, S: 61, M: 64, L: 67, XL: 70 },
      Shoulder: { XS: 42, S: 44, M: 46, L: 48, XL: 50 },
    },
    Adidas: {
      Chest: { S: 90, M: 98, L: 106, XL: 114 },
      Waist: { S: 78, M: 86, L: 94, XL: 102 },
      Arms: { S: 59, M: 62, L: 65, XL: 68 },
      Shoulder: { S: 43, M: 45, L: 47, XL: 49 },
    },

    // Jeans & Pants Section
    Replay: {
      Hip: { 30: 94, 32: 100, 34: 106, 36: 112 },
      Waist: { 30: 76, 32: 81, 34: 86, 36: 91 },
      Legs: { 30: 76, 32: 81, 34: 86, 36: 91 },
    },
    Levis: {
      Hip: { 28: 92, 30: 97, 32: 102, 34: 107 },
      Waist: { 28: 74, 30: 79, 32: 84, 34: 89 },
      Legs: { 28: 74, 30: 79, 32: 84, 34: 89 },
    },
    GAP: {
      Hip: { 28: 91, 30: 96, 32: 101, 34: 106 },
      Waist: { 28: 73, 30: 78, 32: 83, 34: 88 },
      Legs: { 28: 73, 30: 78, 32: 83, 34: 88 },
    },
  };
  let matches = [];

  for (const brand in brandSizing) {
    let foundSize = null;

    for (const part in measurement) {
      const userValue = measurement[part]?.value;

      if (userValue && brandSizing[brand][part]) {
        for (const size in brandSizing[brand][part]) {
          if (userValue <= brandSizing[brand][part][size]) {
            foundSize = size;
            break;
          }
        }
      }
    }

    if (foundSize) {
      matches.push(`${brand}: ${foundSize}`);
    }
  }

  return matches.length ? matches : ["No brand matches found."];
};
export default fakeBrandAPI;
