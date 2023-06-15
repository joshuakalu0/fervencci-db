import actionChecker from "../../../components/utiles_fun";
import { Catalog as Mcatalog } from "./catalogModel";
import { Measurement as Mmeasurement } from "./measurementModel";
import { Report as Mreport } from "./reportModel";
import { User as Muser } from "./userModel";
export const User = Muser;
export const Catalog = Mcatalog;
export const Report = Mreport;
export const Measurement = Mmeasurement;
export function Modelfind(table) {
  const Form = actionChecker(
    table,
    Muser,
    Mcatalog,
    Mmeasurement,
    Mreport,
    `invalid table type ${table}`
  );
  return Form;
}

// export { User, Measurement, Report, Catalog };
