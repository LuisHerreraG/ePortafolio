import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
  private avatarCube!: THREE.Mesh;
  private torus!: THREE.Mesh;
  private controls!: OrbitControls;
  private logos: THREE.Mesh[] = [];
  private logosRadiuses: number[] = [];
  private logosAngles: number[] = [];

  constructor() {}

  ngOnInit() {
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    // Clean up by removing the resize event listener
    window.removeEventListener('resize', this.onWindowResize);
  }

  private initThree() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
    // this.cube
    this.avatarCube = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('luis-full.png')})
    );
    this.scene.add(this.avatarCube);
    // this.torus
    const geometryTorus = new THREE.TorusGeometry(10, 3, 16, 100);
    const materialTorus = new THREE.MeshBasicMaterial({color: 0xA9BBFF6F, wireframe: true});
    this.torus = new THREE.Mesh(geometryTorus, materialTorus);
    this.scene.add(this.torus);
    // ambientLight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    // directionalLight
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);
    // this.controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = false;
    // stars
    Array(200).fill(0).forEach(() => this.addStar());
    // logos
    this.addSVGMesh('angular-logo.svg', 0.01);
    this.addSVGMesh('flutter-logo.svg', 0.005, [4]);
    this.addSVGMesh('python-logo.svg', 0.05, [2, 3, 6]);
    this.addSVGMesh('ue4-logo.svg', 0.05);
    this.addSVGMesh('spring_boot-logo.svg', 0.025);
    this.addSVGMesh('vue-logo.svg', 0.007);
    this.addPNGMesh('react-logo.png', 1.5, 1.5, 0.05, 0x000000);
    this.addPNGMesh('docker-logo.png', 1.5, 1.5, 0.05, 0x1e63ee);
    this.addSVGMesh('my_sql-logo.svg', 0.005);
    this.addSVGMesh('dot_net-logo.svg', 0.003);
    this.addSVGMesh('cpp-logo.svg', 0.005);
    this.addSVGMesh('blender-logo.svg', 0.01, [], 0, 0);
    this.addSVGMesh('azure-logo.svg', 0.01);
    this.addSVGMesh('aws-logo.svg', 0.002);
    this.addPNGMesh('pytorch-logo.png', 1.5, 1.5, 0.05, 0x000000);

    // Add resize listener
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.torus.rotation.x += 0.01;
    this.torus.rotation.y += 0.01;
    this.logos.forEach((logo, index) => {
      this.logosAngles[index] += 0.01
      logo.position.x = this.logosRadiuses[index] * Math.cos(this.logosAngles[index]);
      logo.position.y = this.logosRadiuses[index] * Math.sin(this.logosAngles[index]);
    });
    this.renderer.render(this.scene, this.camera);
  }

  private addPNGMesh(url: string, width: number = 10, height: number = 10, depth: number = 2, color: number): void {
    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(9));
    // Load the PNG texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(url);
    // Create box geometry with given dimensions
    const geometry = new THREE.BoxGeometry(width, height, depth);
    // Create materials for each side of the box
    const materials = [
      new THREE.MeshBasicMaterial({ color: color }), // Right
      new THREE.MeshBasicMaterial({ color: color }), // Left
      new THREE.MeshBasicMaterial({ color: color }), // Top
      new THREE.MeshBasicMaterial({ color: color }), // Bottom
      new THREE.MeshBasicMaterial({ map: texture }), // Front
      new THREE.MeshBasicMaterial({ map: texture }), // Back
    ];
    // Create the mesh with the geometry and material
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(x, y, z);
    // Add mesh to the scene
    this.logos.push(mesh);
    this.logosRadiuses.push(Math.sqrt(x * x + y * y));
    this.logosAngles.push(Math.atan2(y, x));
    this.scene.add(mesh);
  }
  private addSVGMesh(url: any, scale: number = 1.0, indexRemove: number[] = [], offsetX: number = 0, offsetY: number = 0): void {
    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(9));
    const loader = new SVGLoader();
    loader.load(url, (data) => {  // Add the path to your SVG file
      const paths = data.paths;

      paths.forEach((path, index) => {
        const shapes = SVGLoader.createShapes(path);
        shapes.forEach((shape) => {
          if (indexRemove.includes(index)) {
            return;
          }
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 2,
            bevelEnabled: false,
          });

          const material = new THREE.MeshStandardMaterial({
            color: path.color || 0xff0000,  // Default color if path.color is undefined
            side: THREE.DoubleSide,  // Render both sides
            polygonOffset: true,
            polygonOffsetFactor: 1, // Adjust these values as needed
            polygonOffsetUnits: 1,
            flatShading: true,       // Reduce artifacts
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(scale, scale, scale); // Scale down to 10% of the original size
          mesh.position.set(x + offsetX, y + offsetY, z + index * 0.01); // Center the shape at the origin
          mesh.rotation.set(0, -Math.PI, -Math.PI); // Rotate the shape to face the camera
          this.logos.push(mesh);
          this.logosRadiuses.push(Math.sqrt((x + offsetX) * (x + offsetX) + (y + offsetY) * (y + offsetY)));
          this.logosAngles.push(Math.atan2(y, x));

          this.scene.add(mesh);
        });
      });
    });
  }

  private addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    this.scene.add(star);
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
