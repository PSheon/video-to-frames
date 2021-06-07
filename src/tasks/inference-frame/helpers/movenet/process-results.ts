/* TODO Migrate to ts */
import { MOVE_NET_BODY_PARTS } from "../../../../constant";

export default function (res, img) {
  return new Promise((resolve) => {
    const data = res.arraySync();
    res.dispose();
    const kpt = data[0][0];
    const parts: any = [];
    for (let i = 0; i < kpt.length; i++) {
      const part = {
        id: i,
        label: MOVE_NET_BODY_PARTS[i],
        score: kpt[i][2],
        xRaw: kpt[i][0],
        yRaw: kpt[i][1],
        x: Math.trunc(kpt[i][1] * img.inputShape[1]),
        y: Math.trunc(kpt[i][0] * img.inputShape[0]),
      };
      parts.push(part);
    }

    resolve(parts);
  });
}
