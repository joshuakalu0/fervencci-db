export function clickDisplay(model) {
  let display = [];
  Object.values(model).map((data, i) => {
    if (data["display"]) {
      display.push({
        name: Object.keys(model)[i],
        data,
        i,
      });
    }
  });
  return display;
}
function change(v) {
  f = v;
  n = v.length - 5;
  r = "x".repeat(n);
  z = v.slice(0, 5) + r;
  return z;
}

export function Createtable({ row }) {
  let length = row.length;
  let td = row.map((data, i) => {
    return <td key={i}>{data}</td>;
  });

  return <tr>{td}</tr>;
}

export default function actionChecker(
  target,
  first,
  second,
  third,
  fourth,
  errorString = "invalid value"
) {
  let Value = null;
  switch (target) {
    case "user":
      Value = first;
      break;
    case "catalog":
      Value = second;
      break;
    case "measurement":
      Value = third;
      break;
    case "report":
      Value = fourth;
      break;

    default:
      Value = null;
      throw new Error(`${errorString} : ${target}`);
      break;
  }
  return Value;
}
