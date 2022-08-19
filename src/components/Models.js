import * as THREE from 'three'



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
    const planeGeometry = new THREE.PlaneGeometry( 20,20 );
    const texturaPlano = new THREE.TextureLoader().load('./model/floor.jpg');
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
export const cube=()=>{
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color:  Math.random() * 0xffffff,wireframe:false} );
    const cube = new THREE.Mesh( geometry, material );
    return cube
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

