const moment = require("moment");

const formatDate = (date: string) => {
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;
