/* TODO Migrate to ts */
import fs from "fs";
import path from "path";

import canvas from "canvas";

export default function (results, img): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const c = new canvas.Canvas(img.inputShape[1], img.inputShape[0]);
    const ctx = c.getContext("2d");
    const baseDirName = global.baseDirName;

    // load and draw original image
    const original = await canvas.loadImage(
      path.resolve(baseDirName, "output", "stage-split", img.frameName),
    );
    ctx.drawImage(original, 0, 0, c.width, c.height);
    const fontSize = Math.round((c.width * c.height) ** (1 / 2) / 80);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.font = `${fontSize}px "Segoe UI"`;

    // draw all detected objects
    for (const obj of results) {
      ctx.fillStyle = "black";
      ctx.fillText(
        `${Math.round(100 * obj.score)}% ${obj.label}`,
        obj.x + 1,
        obj.y + 1,
      );
      ctx.fillStyle = "white";
      ctx.fillText(
        `${Math.round(100 * obj.score)}% ${obj.label}`,
        obj.x,
        obj.y,
      );
    }
    ctx.stroke();

    const connectParts = (parts, color) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      for (let i = 0; i < parts.length; i++) {
        const part = results.find((a) => a.label === parts[i]);
        if (part) {
          if (i === 0) ctx.moveTo(part.x, part.y);
          else ctx.lineTo(part.x, part.y);
        }
      }
      ctx.stroke();
    };

    connectParts(["nose", "leftEye", "rightEye", "nose"], "#99FFFF");
    connectParts(["rightShoulder", "rightElbow", "rightWrist"], "#99CCFF");
    connectParts(["leftShoulder", "leftElbow", "leftWrist"], "#99CCFF");
    connectParts(["rightHip", "rightKnee", "rightAnkle"], "#9999FF");
    connectParts(["leftHip", "leftKnee", "leftAnkle"], "#9999FF");
    connectParts(
      ["rightShoulder", "leftShoulder", "leftHip", "rightHip", "rightShoulder"],
      "#9900FF",
    );

    // write canvas to jpeg

    const outImage = path.resolve(
      baseDirName,
      "output",
      "stage-inference",
      img.frameName,
    );
    const out = fs.createWriteStream(outImage);
    out.on("finish", () => {
      resolve();
    });
    out.on("error", (err) => {
      /* tslint:disable:no-console */
      console.log("err, ", err);
      /* tslint:enable:no-console */
      reject();
    });
    const stream = c.createJPEGStream({
      quality: 0.8,
      progressive: true,
      chromaSubsampling: true,
    });
    stream.pipe(out);
  });
}
