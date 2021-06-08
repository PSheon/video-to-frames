/* TODO Migrate to ts */
import fs from "fs";
import path from "path";

import canvas from "canvas";

export default function (result, frameName): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const baseDirName = global.baseDirName;

    const original = await canvas.loadImage(
      path.join(baseDirName, "output", "stage-split", frameName),
    );

    const c = new canvas.Canvas(original.width, original.height);
    const ctx = c.getContext("2d");
    ctx.drawImage(original, 0, 0, c.width, c.height);
    const fontSize = Math.round((c.width * c.height) ** (1 / 2) / 50);
    ctx.lineWidth = 2;
    ctx.font = `${fontSize}px "Segoe UI"`;

    if (!result.keypoints) {
      resolve()
    }

    let color = "white";
    if (result.name === "detect") color = "lightcoral";
    if (result.name === "full") color = "lightblue";
    if (result.name === "upper") color = "lightgreen";
    ctx.strokeStyle = color;
    for (const pt of result.keypoints) {
      ctx.fillStyle = "black";
      ctx.fillText(
        `${Math.round(100 * (pt.score || 0))}% ${pt.part || pt.id}`,
        pt.position.x + 1,
        pt.position.y + 1,
      );
      ctx.fillStyle = color;
      ctx.fillText(
        `${Math.round(100 * (pt.score || 0))}% ${pt.part || pt.id}`,
        pt.position.x,
        pt.position.y,
      );
    }
    ctx.stroke();

    const connectParts = (parts) => {
      ctx.beginPath();
      for (let i = 0; i < parts.length; i++) {
        const part = result.keypoints.find((a) => a.part === parts[i]);
        if (part) {
          if (i === 0) ctx.moveTo(part.position.x, part.position.y);
          else ctx.lineTo(part.position.x, part.position.y);
        }
      }
      ctx.stroke();
    };

    connectParts([
      "leftEar",
      "leftEyeOutside",
      "leftEye",
      "leftEyeInside",
      "nose",
      "leftMouth",
      "rightMouth",
      "nose",
      "forehead",
      "nose",
      "rightEyeInside",
      "rightEye",
      "rightEyeOutside",
      "rightEar",
    ]);
    connectParts(["leftPalm", "leftWrist", "leftElbow", "leftShoulder"]);
    connectParts(["rightPalm", "rightWrist", "rightElbow", "rightShoulder"]);
    connectParts(["leftHip", "leftKnee", "leftAnkle", "leftHeel", "leftFoot"]);
    connectParts([
      "rightHip",
      "rightKnee",
      "rightAnkle",
      "rightHeel",
      "rightFoot",
    ]);
    connectParts([
      "leftHip",
      "midHip",
      "rightHip",
      "rightShoulder",
      "leftShoulder",
      "leftHip",
    ]);

    const outImage = path.resolve(
      baseDirName,
      "output",
      "stage-inference",
      frameName,
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
