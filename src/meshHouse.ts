/* 公式サイトに予め用意されている家のメッシュを表示 */
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  Color3,
} from "babylonjs";

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

var createScene = (): Scene => {
  // シーンを作成
  var scene = new Scene(engine);

  // カメラ設定
  var camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 5, -10),
    scene
  );

  // カメラの初期位置
  camera.setTarget(Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // 光が反射する方向。Vector3はx,y,zの順に指定する。
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // 光の強さ、色のカスタマイズ
  light.intensity = 0.7;
  light.diffuse = new Color3(0.62, 0.58, 0.91);

  BABYLON.SceneLoader.ImportMeshAsync(
    // ["ground", "detached_house", "semi_house"], が含まれているメッシュ
    "",
    "https://assets.babylonjs.com/meshes/",
    "both_houses_scene.babylon"
  ).then((result) => {
    const house1 = scene.getMeshByName("detached_house");
    // house1.position.y = 2; // y 軸方向(↑)に +2
    const house2 = scene.getMeshByName("semi_house");
    // house2.position.y = 1;
  });

  return scene;
};

var scene: Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
