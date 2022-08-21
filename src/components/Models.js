import * as THREE from 'three'

var parameters = {
    a: 1.01,
    b: 0.01,
    c: 0.01,
    d: 0.01,
    e: 0.01,
    f: 0.01
  }
var camera, scene, renderer;
var geometry, material, mesh;
var uniforms;
var zoom = 4.0;
// var offset = new THREE.Vector2(-2.0*aspect, -2.0);

export const Star=()=>{
    var arregloExtruir2=[];
    arregloExtruir2.push(new THREE.Vector3(6, 9, 0));
    arregloExtruir2.push(new THREE.Vector3(4, 6, 0));
    arregloExtruir2.push(new THREE.Vector3(1, 5, 0));
    arregloExtruir2.push(new THREE.Vector3(3, 3, 0));
    arregloExtruir2.push(new THREE.Vector3(2.5, 0, 0));
    arregloExtruir2.push(new THREE.Vector3(6, 2, 0));
    arregloExtruir2.push(new THREE.Vector3(9.5, 0, 0));
    arregloExtruir2.push(new THREE.Vector3(9, 3, 0));
    arregloExtruir2.push(new THREE.Vector3(11, 5, 0));
    arregloExtruir2.push(new THREE.Vector3(8, 6, 0));
    arregloExtruir2.push(new THREE.Vector3(6, 9, 0));
    var formaExtruir2 = new THREE.Shape(arregloExtruir2);
        //extruir figura
        var datoExtruir2={
            amount : 1,
            depth: 1,
            bevelEnabled:false,
            bevelSegments:7,
            bevelSize:1,
            steps:5,
            bevelThickness:1
        };
    var extrudeGeometria2 = new THREE.ExtrudeGeometry(formaExtruir2,datoExtruir2);
    var extrudeMaterial2 = new THREE.MeshBasicMaterial( { color: 0xD35400, wireframe:false } );
    var mallaExtruir2 = new THREE.Mesh(extrudeGeometria2, extrudeMaterial2); 
    return mallaExtruir2
}
export const drawCunia=()=>{
    var arregloExtruir = [];

    arregloExtruir.push(new THREE.Vector3(-2, 0, 0));
    arregloExtruir.push(new THREE.Vector3(-10, 0, 0));
    arregloExtruir.push(new THREE.Vector3(-10, 5, 0));
    arregloExtruir.push(new THREE.Vector3(-2, 0, 0));

 

    var formaExtruir = new THREE.Shape(arregloExtruir);
    
    var datoExtruir={
        amount : 1,
        depth: 1,
        bevelEnabled:false,
        bevelSegments:7,
        bevelSize:1,
        steps:5,
        bevelThickness:1
    };
    var extrudeGeometria = new THREE.ExtrudeGeometry(formaExtruir,datoExtruir);
    var extrudeMaterial = new THREE.MeshBasicMaterial( { color: 0xD35400, wireframe:false } );
    var mallaExtruir = new THREE.Mesh(extrudeGeometria, extrudeMaterial); 
    return mallaExtruir
}
export const drawStar=(cx,cy,spikes,outerRadius,innerRadius)=>{
    const shape = new THREE.Shape();

    let rot=Math.PI/2*3
  
    let x=cx
    let y=cy
    
    const circle=Math.PI/spikes
    shape.moveTo(cx,cy-outerRadius)
    for(let i=0;i<spikes;i++){
        x=cx+Math.cos(rot) * outerRadius
        y=cy+Math.sin(rot)*outerRadius
        shape.lineTo(x,y)
        rot+=circle
        x=cx+Math.cos(rot) * innerRadius
        y=cy+Math.sin(rot)*innerRadius
        shape.lineTo(x,y)
        rot+=circle
    }
    shape.lineTo(cx, cy - outerRadius)
    const extrudeSettings = {
        amount : 1,
        depth: 1,
        bevelEnabled:false,
        bevelSegments:7,
        bevelSize:1,
        bevelOffSet:-4,
        steps:5,
        bevelThickness:1
    };
    const starGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const starMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,wireframe:false} );
    const mesh = new THREE.Mesh( starGeometry, starMaterial ) ;
    return mesh
    // gl.closePath();
    // gl.stroke();
}

export const createFloor=()=>{
    const planeGeometry = new THREE.PlaneGeometry( 40,40 );
    const texturaPlano = new THREE.TextureLoader().load('./model/grass.jpg');
    const materialPlano = new THREE.MeshBasicMaterial({ map: texturaPlano, side: THREE.DoubleSide });
    const plane=new THREE.Mesh(planeGeometry, materialPlano);
    const plane2=new THREE.Mesh(planeGeometry, materialPlano);
    const plane3=new THREE.Mesh(planeGeometry, materialPlano);
    const plane4=new THREE.Mesh(planeGeometry, materialPlano);
    const plane5=new THREE.Mesh(planeGeometry, materialPlano);
    plane.rotation.x=Math.PI/2
    plane2.position.z=-10
    plane2.rotation.x=Math.PI
    plane3.rotation.y=Math.PI/2
    plane3.position.x=-10
    plane4.position.z=10
    plane5.rotation.y=Math.PI/2
    plane5.position.x=10

    return [plane,plane2,plane3,plane4,plane5]
}


export const createFloor2=()=>{
    const planeGeometry = new THREE.PlaneGeometry( 100,100 );
    const texturaPlano = new THREE.TextureLoader().load('./model/grass.jpg');
    const materialPlano = new THREE.MeshPhongMaterial({ map: texturaPlano, side: THREE.DoubleSide,color:0x293721 });
    const plane=new THREE.Mesh(planeGeometry, materialPlano);
    plane.rotation.x=Math.PI/2
    return [plane]
}
export const cube=()=>{
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color:  Math.random() * 0xffffff,wireframe:false} );
    const cube = new THREE.Mesh( geometry, material );
    return cube
}
export const coneObject=()=>{
    const geometry = new THREE.ConeGeometry( 3, 10, 28 );
    const material = new THREE.MeshPhongMaterial( {color: 0x2D6A0A } );
    const cone = new THREE.Mesh( geometry, material );
    return cone
}
export const light=()=>{
    const ambientLight=new THREE.AmbientLight(0xffffff, 0.7)
    // scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(- 60, 100, - 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = - 50;
    dirLight.shadow.camera.left = - 50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;
    return [dirLight,ambientLight]
}
function fragmentShader(){
    return `
  precision highp float;
  uniform vec2 res;
  uniform float aspect;
  uniform float zoom;
  uniform vec2 offset;
  // gui parameters
  uniform vec3 pset1;
  uniform vec3 pset2;
  vec2 cm (vec2 a, vec2 b){
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + b.x*a.y);
  }
  vec2 conj (vec2 a){
    return vec2(a.x, -a.y);
  }
  float mandelbrot(vec2 c){
    float alpha = 1.0;
    vec2 z = vec2(0.0 , 0.0);
    vec2 z_0;
    vec2 z_1;
    vec2 z_2;
    for(int i=0; i < 200; i++){  // i < max iterations
      z_2 = z_1;
      z_1 = z_0;
      z_0 = z;
      float x_0_sq = z_0.x*z_0.x;
      float y_0_sq = z_0.y*z_0.y;
      vec2 z_0_sq = vec2(x_0_sq - y_0_sq, 2.0*z_0.x*z_0.y);
      float x_1_sq = z_1.x*z_1.x;
      float y_1_sq = z_1.y*z_1.y;
      vec2 z_1_sq = vec2(x_1_sq - y_1_sq, 2.0*z_1.x*z_1.y);
      // the recurrence equation
      z = pset1.x*z_0_sq + c + pset1.y*z_1_sq
      + pset1.z*cm(z_1_sq, z_2) + pset2.x*cm(z_1_sq, z_0)
      + pset2.y*cm(z_2, z_0) + pset2.z*cm(z_1, z_2);
      float z_0_mag = x_0_sq + y_0_sq;
      float z_1_mag = x_1_sq + y_1_sq;
      if(z_0_mag > 12.0){
        float frac = (12.0 - z_1_mag) / (z_0_mag - z_1_mag);
        alpha = (float(i) - 1.0 + frac)/200.0; // should be same as max iterations
        break;
      }
    }
    return alpha;
  }
  void main(){ // gl_FragCoord in [0,1]
    vec2 uv = zoom * vec2(aspect, 1.0) * gl_FragCoord.xy / res + offset;
    float s = 1.0 - mandelbrot(uv);
    vec3 coord = vec3(s, s, s);
    gl_FragColor = vec4(pow(coord, vec3(5.38, 6.15, 3.85)), 1.0);
  }
    `
  }
function updateUniforms(){
uniforms['pset1']['value'] = new THREE.Vector3(parameters['a'], parameters['b'], parameters['c']);
uniforms['pset2']['value'] = new THREE.Vector3(parameters['d'], parameters['e'], parameters['f']);
}
  
export const mandelBrot=(aspect,innerWidht,innerHeight)=>{
    var offset = new THREE.Vector2(-2.0*aspect, -2.0);
    uniforms = {
        res: {type: 'vec2', value: new THREE.Vector2(innerWidht, innerHeight)},
        aspect: {type: 'float', value: aspect},
        zoom: {type:'float', value: zoom},
        offset: {type:'vec2', value: offset},
        pset1: {type:'vec3', value: new THREE.Vector3(parameters['a'], parameters['b'], parameters['c'])},
        pset2: {type:'vec3', value: new THREE.Vector3(parameters['d'], parameters['e'], parameters['f'])}
      };
    
      geometry = new THREE.PlaneBufferGeometry(50, 50);
      material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
      });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0,25,0)
      return mesh
}
function drawLine(p0, p1, color="black") {
    const shape = new THREE.Shape();

    const extrudeSettings = {
        amount : 1,
        depth: 1,
        bevelEnabled:false,
        bevelSegments:7,
        bevelSize:1,
        bevelOffSet:-4,
        steps:5,
        bevelThickness:1
    };
    shape.moveTo(p0.x,p0.y)
    shape.lineTo(p1.x,p1.y)
    const starGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    const starMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,wireframe:false} );
    const mesh = new THREE.Mesh( starGeometry, starMaterial ) ;
    // ctx.strokeStyle = color;
    // ctx.lineWidth = 1;
}
export const triangle=()=>{

    // return mallaExtruir2
}