// const weightUnit = {
//   defaultUnit: "g",
//   scale: new Map([
//     ["g", 1],
//     ["kg", 1000],
//   ]),
// };
// const quantityUnit = {
//   defaultUnit: "szt",
//   scale: new Map([["szt", 1]]),
// };
// const volumeUnit = {
//   defaultUnit: "l",
//   scale: new Map([
//     ["ml", 0.001],
//     ["l", 1],
//   ]),
// };
// const units = [weightUnit, quantityUnit, volumeUnit];
//
// const enumToUnitMapper = new Map([
//   ["GRAMS", "g"],
//   ["LITERS", "l"],
//   ["PIECES", "szt"],
// ]);
//
// export const mapToUnit = (enumValue) => {
//   return enumToUnitMapper.get(enumValue);
// };
//
// export const mapToEnum = (unitValue) => {
//   for (let [enumV, unitV] of enumToUnitMapper.entries()) {
//     if (unitValue.includes(unitV)) {
//       return enumV;
//     }
//   }
// };
//
// Number.prototype.countDecimals = function () {
//   if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
//   return this.toString().split(".")[1].length || 0;
// };
//
// function normalizeEntryUnit(entry) {
//   for (let i = 0; i < units.length; i++) {
//     if (entry.unit.includes(units[i].defaultUnit)) {
//       return {
//         ...units[i],
//         value: units[i].scale.get(entry.unit) * parseFloat(entry.quantity),
//       };
//     }
//   }
//   return null;
// }
//
// export const alreadyExistsInCart = (cartEntry, cart) => {
//   for (let i = 0; i < units.length; i++) {
//     let unit = units[i].defaultUnit;
//     if (cartEntry.unit.includes(unit)) {
//       const filtered = cart.find((entry) => {
//         return (
//           mapToUnit(entry.unit).includes(unit) &&
//           entry.product._links.self.href.replace(/{.*}/, "") ===
//             cartEntry.product
//         );
//       });
//       if (filtered) {
//         return filtered;
//       }
//     }
//   }
//   return null;
// };
//
// export const evaluateBestUnit = (oldEntry, newEntry = {}) => {
//   const oldType =
//     mapToUnit(oldEntry.unit) !== undefined
//       ? normalizeEntryUnit({ ...oldEntry, unit: mapToUnit(oldEntry.unit) })
//       : normalizeEntryUnit(oldEntry);
//   let newValue = oldType.value;
//   if (Object.keys(newEntry).length !== 0) {
//     const newType = normalizeEntryUnit(newEntry);
//     newValue += newType.value;
//   }
//   const startValue = newValue;
//   const scale = oldType.scale;
//   let unit = oldType.defaultUnit;
//   for (let [candidateUnit, multiplier] of scale.entries()) {
//     let candidate = startValue / multiplier;
//     if (candidate.countDecimals() > 1 || candidate < 1) {
//       break;
//     } else {
//       unit = candidateUnit;
//       newValue = candidate;
//     }
//   }
//   return {
//     ...oldEntry,
//     unit,
//     quantity: newValue,
//   };
// };
//
// export const getAvailableUnits = () => {
//   let availableUnits = [];
//   for (let unitType of units) {
//     for (let key of unitType.scale.keys()) {
//       availableUnits.push(key);
//     }
//   }
//   return availableUnits;
// };
//
// export const prepareObjectForDatabase = (cartEntry) => {
//   const normalizedEntry = normalizeEntryUnit(cartEntry);
//   return {
//     ...cartEntry,
//     unit: mapToEnum(normalizedEntry.defaultUnit),
//     quantity: normalizedEntry.value,
//   };
// };
