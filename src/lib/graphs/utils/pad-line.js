/**
 * Created on 8/15/16.
 */
const {sqrt, pow} = Math;
export default function padLine(x1, y1, x2, y2, pad1 = 0, pad2 = 0) {
  // const theta = atan((y1 - y2), (x1 - x2));
  const len = sqrt(pow(y2 - y1, 2) + pow(x2 - x1, 2));
  const sin = (y2 - y1) / len;
  const cos = (x2 - x1) / len;
  x1 -= cos * pad1;
  y1 -= sin * pad1;
  x2 += cos * pad2;
  y2 += sin * pad2;
  return {
    x1, x2, y1, y2
  };
}
