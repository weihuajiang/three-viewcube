import {
    AmbientLight,
    BoxGeometry,
    GridHelper,
    Mesh,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PerspectiveCamera,
    PointLight,
    Scene,
    WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ObjectPosition, SimpleCameraControls, ViewCubeGizmo } from '../src'

let canvas: HTMLElement
let renderer: WebGLRenderer
let scene: Scene
let camera: PerspectiveCamera
let cameraControls :OrbitControls;

let viewCubeGizmo: ViewCubeGizmo;
let simpleCameraControls: SimpleCameraControls

let requestRepaint=false;

init()
paint()

function init() {
    canvas = document.querySelector(`canvas#scene`)!
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height, false)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    scene = new Scene()

    const ambientLight = new AmbientLight('white', 0.4)
    const pointLight = new PointLight('white', 20, 100)
    pointLight.position.set(-2, 2, 2)
    pointLight.castShadow = true
    pointLight.shadow.radius = 4
    pointLight.shadow.camera.near = 0.5
    pointLight.shadow.camera.far = 4000
    pointLight.shadow.mapSize.width = 2048
    pointLight.shadow.mapSize.height = 2048
    scene.add(ambientLight)
    scene.add(pointLight)

    const sideLength = 1
    const cubeGeometry = new BoxGeometry(sideLength, sideLength, sideLength)
    const cubeMaterial = new MeshStandardMaterial({
        color: '#f69f1f',
        metalness: 0.5,
        roughness: 0.7,
    })
    const cube = new Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.y = 0.5
    scene.add(cube)

    camera = new PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.aspect = width / height
    camera.position.set(2, 2, 5)

    cameraControls = new OrbitControls(camera, canvas)
    cameraControls.target = cube.position.clone()
    cameraControls.enableDamping = false
    cameraControls.autoRotate = false
    cameraControls.update()

    const gridHelper = new GridHelper(20, 20, 'teal', 'darkgray')
    gridHelper.position.y = -0.01
    scene.add(gridHelper)  

    window.addEventListener('resize', () => {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        paint()
    })

    simpleCameraControls = new SimpleCameraControls(camera)
    simpleCameraControls.setControls(cameraControls as any)      
    // Create viewcube gizmo
    viewCubeGizmo = new ViewCubeGizmo(camera, renderer, { pos: ObjectPosition.RIGHT_BOTTOM, dimension: 120 })
    viewCubeGizmo.addEventListener('change', event => {
        if(event.quaternion){
            simpleCameraControls.flyTo(event.quaternion);
        }
        paint();
    })
    cameraControls.addEventListener('change', ()=>{paint();});
}
function paint(){
    if(!requestRepaint){
        requestRepaint=true;
        requestAnimationFrame(animate);
    }
}
function animate() {
    requestRepaint=false;
    cameraControls.update()
    renderer.render(scene, camera)
    viewCubeGizmo.update()
    simpleCameraControls.update()
}
