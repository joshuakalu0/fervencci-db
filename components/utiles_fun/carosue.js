// import { useEffect, useState } from "react";
// export default function useCarose({ arr }) {
//   const [carosue, setcarosue] = useState(0);
//   const [value, setvalue] = useState("");
//   const a = [1, 2, 3, 3, 4, 4, 3, 9];
//   const obj = {
//     array: arr,
//     length: function () {
//       const len = this.array.length;
//       return len;
//     },
//     location: 0,
//     next: function (current) {
//       this.clear();
//       this.start(this.location + 1);
//     },
//     prev: function () {
//       this.clear();
//       this.start(this.location - 1);
//     },
//     stop: 0,
//     start: function (start = this.location) {
//       this.stop = setInterval(() => {
//         if (this.location == this.length()) {
//           this.location = 0;
//         }
//         this.location++;
//         return this.array[this.location];
//       }, 2000);
//     },
//     select: function (index) {
//       this.clear();
//       this.start(index);
//     },
//     clear: function () {
//       clearInterval(this.stop);
//     },
//   };
//   setcarosue(obj);
//   return carosue;
// }

export default class Carosue {
  constructor(list, setdata, setstop) {
    this.array = list;
    this.location = 0;
    this.length = this.array.length;
    this.stop = 0;
    this.setdata = setdata;
    this.setstop = setstop;
  }

  move(stop) {
    this.clear(stop);
    this.start(this.location + 1);
  }

  start() {
    if (this.stop !== 0) return;

    this.stop = setInterval(() => {
      if (this.location == this.length) {
        this.location = 0;
      }

      this.setdata(this.array[this.location]);
      this.location++;
    }, 2000);
    this.setstop(this.stop);
  }
  select(index, stop) {
    this.clear(stop);
    this.setdata(this.array[index]);
    this.location = index;
    let out = setTimeout(() => {
      this.move(index);
    }, 200);
  }
  clear(stop) {
    clearInterval(stop);
  }
}
