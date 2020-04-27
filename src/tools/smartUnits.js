const weightUnit = {
  defaultUnit: "g",
  scale: new Map([
    ["g", 1],
    ["kg", 1000],
  ]),
};
const quantityUnit = {
  defaultUnit: "szt",
  scale: [],
};
const volumeUnit = {
  defaultUnit: "l",
  scale: new Map([
    ["ml", 0.001],
    ["l", 1],
  ]),
};
const units = [weightUnit, quantityUnit, volumeUnit];

Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

function normalizeEntryUnit(entry) {
  for (let i = 0; i < units.length; i++) {
    if (entry.unit.includes(units[i].defaultUnit)) {
      return {
        ...units[i],
        value: units[i].scale.get(entry.unit) * parseFloat(entry.quantity),
      };
    }
  }
  return null;
}

export const alreadyExistsInCart = (cartEntry, cart) => {
  for (let i = 0; i < units.length; i++) {
    let unit = units[i].defaultUnit;
    if (cartEntry.unit.includes(unit)) {
      const filtered = cart.filter(
        (entry) =>
          entry.unit.includes(unit) && entry.productId === cartEntry.productId
      );
      if (filtered.length > 0) {
        return filtered[0];
      }
    }
  }
  return null;
};

export const evaluateBestUnit = (oldEntry, newEntry) => {
  const oldType = normalizeEntryUnit(oldEntry);
  const newType = normalizeEntryUnit(newEntry);
  const scale = oldType.scale;
  let newValue = oldType.value + newType.value;
  let unit = oldType.unit;
  for (let [candidateUnit, multiplier] of scale.entries()) {
    let candidate = newValue / parseFloat(multiplier);
    if (candidate.countDecimals() > 1 || candidate < 1) {
      break;
    }
    unit = candidateUnit;
    newValue = candidate;
  }
  return {
    uid: oldEntry.uid,
    productId: oldEntry.productId,
    unit,
    quantity: newValue,
  };
};
