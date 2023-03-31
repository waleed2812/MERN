const { parse } = require("path");

exports.toTitleCase = (str) => {
  try {
    return str
      .split(" ")
      .map((item) => item[0].toUpperCase() + item.substring(1))
      .join(" ");
  } catch (err) {
    console.error(err);
    return "N/A";
  }
};
exports.addOrAndComma = (array) => {
  try {
    if (!Array.isArray(array) || array.length < 0) return array;
    if (array.length === 1) return array[0];
    let string = "";
    array.forEach((item, index) => {
      if (typeof item !== "string") {
        return;
      } else if (index === array.length - 2) {
        string += item + " or ";
      } else if (index === array.length - 1) {
        string += item;
      } else {
        string += item + ", ";
      }
    });
    return string;
  } catch (err) {}
};
exports.removeExtension = (fileName) => parse(fileName).name;
