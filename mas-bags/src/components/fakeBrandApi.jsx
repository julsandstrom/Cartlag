const fakeBrandAPI = async (measurement) => {
  const brandSizing = {
    //Sweater or chest garments
    Zara: {
      Chest: { S: 50, M: 65, L: 80 },
      Waist: { S: 50, M: 80, L: 88 },
      Arms: { S: 88, M: 95, L: 102 },
      Shoulder: { S: 88, M: 95, L: 102 },
    },
    Adidas: {
      Chest: { XS: 76, S: 82, M: 88, L: 95 },
      Waist: { XS: 70, S: 78, M: 86, L: 94 },
      Arms: { XS: 86, S: 92, M: 100, L: 108 },
      Shoulder: { XS: 86, S: 92, M: 100, L: 108 },
    },
    Gant: {
      Chest: { S: 79, M: 86, L: 94 },
      Waist: { S: 74, M: 82, L: 90 },
      Arms: { S: 90, M: 97, L: 105 },
      Shoulder: { S: 90, M: 97, L: 105 },
    },
    Uniqlo: {
      Chest: { S: 78, M: 85, L: 92 },
      Waist: { S: 72, M: 80, L: 88 },
      Arms: { S: 88, M: 95, L: 102 },
      Shoulder: { S: 88, M: 95, L: 102 },
    },
    Nike: {
      Chest: { XS: 76, S: 82, M: 88, L: 95 },
      Waist: { XS: 70, S: 78, M: 86, L: 94 },
      Arms: { XS: 86, S: 92, M: 100, L: 108 },
      Shoulder: { XS: 86, S: 92, M: 100, L: 108 },
    },
    Puma: {
      Chest: { S: 79, M: 86, L: 94 },
      Waist: { S: 74, M: 82, L: 90 },
      Arms: { S: 90, M: 97, L: 105 },
      Shoulder: { S: 90, M: 97, L: 105 },
    },
    ///Jeans or Pants section, 3 brands
    Replay: {
      Hip: { S: 90, M: 97, L: 105 },
      Waist: { S: 74, M: 82, L: 90 },
      Legs: { 30: 32, M: 86, L: 94 },
    },
    Levis: {
      Hip: { S: 90, M: 97, L: 105 },
      Waist: { S: 74, M: 82, L: 90 },
      Legs: { S: 79, M: 86, L: 94 },
    },
    GAP: {
      Hip: { S: 90, M: 97, L: 105 },
      Waist: { S: 74, M: 82, L: 90 },
      Legs: { S: 79, M: 86, L: 94 },
    },
  };

  let matches = [];

  // Loop through each brand
  for (const brand in brandSizing) {
    let foundSize = null;

    // Loop through each body part the user has saved
    for (const part in measurement) {
      const userValue = measurement[part]?.value;

      if (userValue && brandSizing[brand][part]) {
        // Find closest match by checking each size
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

  return matches.length ? matches : ["No brand matches found"];
};
export default fakeBrandAPI;
