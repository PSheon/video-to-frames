<p align="center">
  <img src=".github/assets/EfficientPose.jpg" weight="100%" alt="efficient pose" />
  <img src=".github/assets/movenet.jpg" weight="100%" alt="move net" />
</p>
<h3 align="center">🎬 影片分割 + 🏃圖片肢體偵測 工具</h3>
<p align="center">幫你分割影片或圖片，並自動偵測其中的肢體位置資訊.</p>

<p align="center">
  <a href="https://codecov.io/gh/PSheon/video-to-frames">
    <img src="https://codecov.io/gh/PSheon/video-to-frames/branch/master/graph/badge.svg?token=35W6VGXODX"/>
  </a>
  <a href="https://github.com/PSheon/video-to-frames/actions/workflows/node.yml">
    <img alt="Node.js CI" src="https://github.com/PSheon/video-to-frames/actions/workflows/node.yml/badge.svg">
  </a>
  <a href="https://github.com/PSheon/video-to-frames/actions/workflows/doxker.yml">
    <img alt="Docker CI" src="https://github.com/PSheon/video-to-frames/actions/workflows/doxker.yml/badge.svg">
  </a>
</p>

---

### 可使用模型

1. PoseNet

   - posenet

2. Efficient Pose

   - efficientpose-i-lite
   - efficientpose-ii-lite
   - efficientpose-iv

3. MoveNet

   - movenet-lightning
   - movenet-thunder

4. Blaze Pose

   - blazepose-full
   - blazepose-upper

---

## 設定運行環境

### 1. 安裝專案

```bash
git clone git@github.com:PSheon/video-to-frames.git
```

### 2. 調整設定，位置在 `config` 下

測試用： `development.js`

專案用：`production.js`

```bash
cp config/default.js config/production.js
```

### 3. 將設定的影片放到相對應的位置

**_預設使用 `input` 資料夾下的 `sample.mp4`_**

### 4. 使用工具

<details>
  <summary>Options 1. 使用 Node.js 本地開發</summary>

安裝 Node.js 相依套件

```bash
npm install
```

開始開發

```bash
npm run dev
```

</details>
<details>
  <summary>Options 2. 使用 Docker 建立本地容器</summary>

建立本地容器與第一次建立容器

```bash
npm run docker:build && npm run docker:init
```

容器被建立後可直接執行

```bash
npm run docker:run
```

</details>
<details>
  <summary>Options 3. 使用 Node.js 建立專案版本</summary>

安裝相依套件並編譯 TS

```bash
npm install && npm run build
```

```bash
npm run start
```

</details>

---

## 可設定內容說明

<div markdown="block" style="overflow-x: scroll;white-space: nowrap;">

| 設定名稱                                | 說明                 | 型別    | 預設值                  | 規範                                                                                                                                                                                                     |
| --------------------------------------- | -------------------- | ------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DELETE_PREVIOUS_OUTPUT                  | 是否保留前一次的結果 | Boolean | `true`                  |                                                                                                                                                                                                          |
| INPUT_FILEPATH                          | 輸入文件的資料夾路徑 | String  | `input`                 |                                                                                                                                                                                                          |
| INPUT_FILENAME                          | 輸入文件的名稱       | String  | `sample.mp4`            | 文件必須是 圖片 或 影片 格式                                                                                                                                                                             |
| SPLIT_FRAME_IMAGE_PREFIX                | 分割出來的圖片前綴   | String  | `frame`                 |                                                                                                                                                                                                          |
| INPUT_VIDEO_START_TIME                  | 開始推理影片的時間   | String  | `0.0`                   | 只有在輸入文件是影片格式時生效                                                                                                                                                                           |
| INPUT_VIDEO_DURATION                    | 推理時間的長度       | String  | `30.0`                  | 只有在輸入文件是影片格式時生效                                                                                                                                                                           |
| INPUT_VIDEO_FRAME_SAMPLING              | 分割影像的每秒採樣率 | Number  | `10`                    | 只有在輸入文件是影片格式時生效                                                                                                                                                                           |
| MODEL_NAME                              | 使用的模型名稱       | String  | `efficientpose-ii-lite` | 可用模型："posenet" \|<br>"efficientpose-i-lite" \|<br>"efficientpose-ii-lite" \|<br>"efficientpose-iv" \|<br>"movenet-lightning" \|<br>"movenet-thunder" \|<br>"blazepose-full" \|<br>"blazepose-upper" |
| POSENET_INFERENCE_FLIP_HORIZONTAL       | 是否翻轉輸入影像     | Boolean | `false`                 | 只有在模型是"posenet"時生效                                                                                                                                                                              |
| EFFICIENTPOSE_MODEL_MIN_SCORE_THRESHOLD | 最低信心閥值         | Number  | `0.45`                  | 只有在模型是"efficientpose"時生效                                                                                                                                                                        |
| BLAZEPOSE_MODEL_MIN_SCORE_THRESHOLD     | 最低信心閥值         | Number  | `0.3`                   | 只有在模型是"blazepose"時生效                                                                                                                                                                            |

</div>
