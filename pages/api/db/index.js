import actionChecker from "../../../components/utiles_fun";
// import { Catalog as Mcatalog } from "./catalogModel";
import { Gallery as Mgallery } from "./galleryModel";
import { Measurement as Mmeasurement } from "./measurementModel";
import { Report as Mreport } from "./reportModel";
import { User as Muser } from "./userModel";
export const User = Muser;
export const Catalog = Mgallery;
export const Report = Mreport;
export const Measurement = Mmeasurement;
export function Modelfind(table) {
  const Form = actionChecker(
    table,
    Muser,
    Mgallery,
    Mmeasurement,
    Mreport,
    `invalid table type ${table}`
  );
  return Form;
}

// export { User, Measurement, Report, Catalog };
