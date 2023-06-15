import actionChecker from "../components/utiles_fun";
import { catalog_display } from "./form_data/catalog_data";
import { measurement_display } from "./form_data/measurement_data";
import { report_display } from "./form_data/report_data";
import { user_display } from "./form_data/user_data";

export function display(table) {
  const form = actionChecker(
    table,
    user_display,
    catalog_display,
    measurement_display,
    report_display
  );
  return form;
}
