/* シンプルなサンプル。球体２つ */
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  Color3,
} from "babylonjs";

var canvas: any = document.getElementById("renderCanvas");
var engine: Engine = new Engine(canvas, true);

var createScene = (): Scene => {
  var scene: Scene = new Scene(engine);

  var camera: ArcRotateCamera = new ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 2,
    2,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  var light1: HemisphericLight = new HemisphericLight(
    "light1",
    new Vector3(1, 1, 0),
    scene
  );

  // 色を設定。次のメッシュオブジェクトに反映させる
  var material = new StandardMaterial("material", scene);
  material.diffuseColor = new Color3(0, 0.88, 1);

  // 球体を作成。位置と色も指定
  var sphere1 = MeshBuilder.CreateSphere(
    "sphere1",
    { diameter: 2, segments: 8 },
    scene
  );
  sphere1.position = new Vector3(-2, 1, -1);
  sphere1.material = material;

  var sphere2: Mesh = MeshBuilder.CreateSphere(
    "sphere2",
    { diameter: 1 },
    scene
  );

  return scene;
};

var scene: Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
