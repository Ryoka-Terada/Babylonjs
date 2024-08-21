/* ０から家を作るサンプル */
import * as BABYLON from "babylonjs";

var canvas: any = document.getElementById("renderCanvas");
var engine: BABYLON.Engine = new BABYLON.Engine(canvas, true);

/**
 * シーンを作成
 */
var sceneInit = (): BABYLON.Scene => {
  var scene = new BABYLON.Scene(engine);
  scene = setCamera(scene);
  scene = setLight(scene);
  return scene;
};

/**
 * カメラ設定
 */
var setCamera = (scene: BABYLON.Scene): BABYLON.Scene => {
  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new BABYLON.Vector3(0, 5, -20),
    scene
  );
  // カメラの初期位置
  camera.setTarget(BABYLON.Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  return scene;
};

/**
 * ライト設定
 */
var setLight = (scene: BABYLON.Scene): BABYLON.Scene => {
  // 光が反射する方向。Vector3はx,y,zの順に指定する。
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // 光の強さ、色のカスタマイズ
  light.intensity = 0.7;
  light.diffuse = new BABYLON.Color3(1, 1, 0.5);

  return scene;
};

var isBgm: boolean = false;
let bgm;
/**
 * BGM設定
 */
var setBgm = (): void => {
  // クリックでケルトっぽい音楽流す
  document.getElementById("renderCanvas").addEventListener("click", () => {
    if (!bgm) {
      bgm = new BABYLON.Sound("fuenone", "../static/fuenone.mp3", scene, null, {
        loop: true,
        autoplay: true,
      });
    }
    if (isBgm) {
      bgm.stop();
    } else {
      bgm.play();
    }
    isBgm = !isBgm;
  });
};

/**
 * 家を作る
 */
var makeHouse = (
  boxName: string,
  roofName: string,
  boxMat: BABYLON.StandardMaterial,
  roofMat: BABYLON.StandardMaterial,
  positionX: number,
  rotationY: number
): void => {
  const box = BABYLON.MeshBuilder.CreateBox(boxName, {});
  box.scaling = new BABYLON.Vector3(2, 1.5, 3); // 固定
  box.position = new BABYLON.Vector3(positionX, 0.75, 0);
  box.rotation.y = BABYLON.Tools.ToRadians(rotationY);
  box.material = boxMat;
  const roof = BABYLON.MeshBuilder.CreateCylinder(roofName, {
    diameter: 1.2,
    height: 1.2,
    tessellation: 3,
  }); // 固定
  roof.scaling = new BABYLON.Vector3(1.2, 1.7, 4); // 固定
  roof.rotation.z = BABYLON.Tools.ToRadians(90); // 固定
  roof.rotation.y = BABYLON.Tools.ToRadians(rotationY);
  roof.position = new BABYLON.Vector3(positionX, 1.8, 0);
  roof.material = roofMat;
};

/* シーンを作成 */
var createScene = (): BABYLON.Scene => {
  var scene = sceneInit();

  // 地面
  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseTexture = new BABYLON.Texture(
    "../static/concrete.jpg",
    scene
  );
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 15,
    height: 15,
  });
  ground.material = groundMat;

  // 壁紙
  const boxMat = new BABYLON.StandardMaterial("boxMat");
  boxMat.diffuseTexture = new BABYLON.Texture("../static/woodChip.jpg", scene);
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );

  // 家
  makeHouse("box1", "roof1", boxMat, roofMat, 0, -45);
  makeHouse("box2", "roof2", boxMat, roofMat, 3.5, 45);
  makeHouse("box3", "roof3", boxMat, roofMat, -3.5, 45);

  // setBgm();

  return scene;
};

var scene: BABYLON.Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
