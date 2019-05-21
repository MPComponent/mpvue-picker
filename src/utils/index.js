const MIN_DATE = new Date(1900, 0, 1); // 最小支持日期 1990-01-01
const NOW_DATE = new Date(); // 当前日期

const transformDateToIndex = (ARG_DATE = NOW_DATE) => {
  let defaultDateIndex = [];
  defaultDateIndex.push(ARG_DATE.getFullYear() - MIN_DATE.getFullYear()); // 年
  defaultDateIndex.push(ARG_DATE.getMonth()); // 月
  defaultDateIndex.push(ARG_DATE.getDate() - 1); // 日
  return defaultDateIndex;
};

const getDatePickerIndex = pickerIndex => {
  let tempPickerIndex = [];
  // 支持传入 Date 对象
  /* eslint-disable-next-line */
  if (Object.prototype.toString.call(pickerIndex) === "[object Date]" && !isNaN(pickerIndex.getTime())) {
    tempPickerIndex = transformDateToIndex(pickerIndex);
  } else {
    tempPickerIndex = transformDateToIndex(new Date(`${pickerIndex[0]}-${pickerIndex[1]}-${pickerIndex[2]}`));
  }
  return tempPickerIndex;
};
export { transformDateToIndex, getDatePickerIndex };
