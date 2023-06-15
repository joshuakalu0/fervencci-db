import axios from "axios";
import {
  measurement_data,
  measurement_initial,
  measurement_validationSchema,
} from "../../lib/form_data/measurement_data";
import {
  report_data,
  report_initial,
  report_validationSchema,
} from "../../lib/form_data/report_data";
import {
  catalog_data,
  catalog_initial,
  catalog_validationSchema,
} from "../../lib/form_data/catalog_data";
import {
  user_data,
  user_initial,
  user_validationSchema,
} from "../../lib/form_data/user_data";

export function pageIdentify(table) {
  const data = formObject(table);
  return data;
}
function formObject(table) {
  const formdata = {};
  switch (table[1]) {
    case "user":
      formdata.inituals = user_initial;
      formdata.data = user_data;
      formdata.schema = user_validationSchema;
      break;
    case "catalog":
      formdata.inituals = catalog_initial;
      formdata.data = catalog_data;
      formdata.schema = catalog_validationSchema;

      break;
    case "measurements":
      formdata.inituals = measurement_initial;
      formdata.data = measurement_data;
      formdata.schema = measurement_validationSchema;
      break;
    case "report":
      formdata.inituals = report_initial;
      formdata.data = report_data;
      formdata.schema = report_validationSchema;

      break;

    default:
      throw new Error(`invalid table name passed in ${table} `);
      break;
  }
  formdata.page = table[1];
  formdata.action = table[0];
  return formdata;
}
