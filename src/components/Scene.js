import { render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
export const Scene=()=>{
    const mountRef= useRef(null)
    
    useEffect(()=>{
        // const mixer ;
        // const clips ;
        const currentMount= mountRef.current
        // const loader=new THREE.ImageLoader()
        // const loader=new FBXLoader()

        const renderer= new THREE.WebGLRenderer()
        const gltfLoader=new GLTFLoader()
        
        
        let loadedModel;
        let mixer;
        const clock=new THREE.Clock()

        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)
        const scene= new THREE.Scene()
        // const a=new THREE.AnimationAction(1,1,1,1)
        
        const camera= new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth/currentMount.clientHeight,
            0.01,
            1000
            )

        camera.position.set(5,2,10)
        // gltfLoader.load('./model/scene.gltf',(gltf)=>{
        //     loadedModel=gltf;
        //     const elapsedTime=clock.getElapsedTime()
        //     gltf.scene.position.set(0,1.7,Math.sin(elapsedTime))
        //     const gltfAnimations=gltf.animations
        //     scene.add(gltf.scene)
        //     mixer = new THREE.AnimationMixer(gltf.scene)
        //     // function update () {
        //     //     mixer.update( deltaSeconds );
        //     // }
        //     // const clips =mixer.animationsWalking
        //     console.log(gltfAnimations)
        //     // const delta = clock.getDelta();
        //     // mixer.update(delta);
        //     const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Idle' );
        //     const action = mixer.clipAction( clip );
        //     action.play();
        //     action.stop()
        //     const clip2 = THREE.AnimationClip.findByName( gltfAnimations, 'T Pose' );
        //     const action2 = mixer.clipAction( clip2 );
        //     action2.play();
        //     // gltfAnimations.forEach((clip)=>{
        //     //     const action=mixer.clipAction(clip)
        //     //     action.play()

        //     // })
        // },
        // ()=>{
        //     console.log("PROGRES")
        // },
        // ()=>{
        //     console.log("error")
        // })
        function light() {
            const ambientLight=new THREE.AmbientLight(0xffffff, 0.7)
            scene.add(ambientLight)
        
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
            scene.add(dirLight);
            // scene.add( new THREE.CameraHelper(dirLight.shadow.camera))
            const helper = new THREE.DirectionalLightHelper( dirLight);
            scene.add( helper );
        }
        light()
        gltfLoader.load('./model/Soldier.glb',(gltf)=>{
            // fbx.scale.setScalar(0.01);
            loadedModel=gltf
            const model =gltf.scene
            const gltfAnimations=gltf.animations

            model.traverse(function(child){
                if(child.isMesh) child.castShadow=true
                
            })

            scene.add(model)
            mixer=new THREE.AnimationMixer(model)
            // mixer.stopAllAction()
            console.log(gltfAnimations)
            const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Walk' );
            const action = mixer.clipAction( clip );
            action.play()



        })
        const orbit=new OrbitControls(camera,renderer.domElement)
        const axesHelper=new THREE.AxesHelper(5)
        scene.add(axesHelper)

        var arregloExtruir2=[];
        // arregloExtruir2.push(new THREE.Vector3(2, 7, 0));
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
        
       
        
       




        // arregloExtruir2.push(new THREE.Vector3(12, 0, 0));
        // arregloExtruir2.push(new THREE.Vector3(3, 11, 0));
        // arregloExtruir2.push(new THREE.Vector3(10, 11, 0));
        // arregloExtruir2.push(new THREE.Vector3(0, 15, 0));
        // arregloExtruir2.push(new THREE.Vector3(14, 15, 0));
        // arregloExtruir2.push(new THREE.Vector3(12, 7, 0));
        // arregloExtruir2.push(new THREE.Vector3(9, 5, 0));
       
        
        
        
        
        
        // arregloExtruir2.push(new THREE.Vector3(14, 5, 0));
        // arregloExtruir2.push(new THREE.Vector3(9, 5, 0));
      



        // arregloExtruir2.push(new THREE.Vector3(2, 7, 0));//coordenada del origen 
  
 
        var arregloExtruir = [];

        arregloExtruir.push(new THREE.Vector3(-2, 0, 0));
        arregloExtruir.push(new THREE.Vector3(-10, 0, 0));
        arregloExtruir.push(new THREE.Vector3(-10, 5, 0));
        arregloExtruir.push(new THREE.Vector3(-2, 0, 0));

     

        var formaExtruir = new THREE.Shape(arregloExtruir);
        // var arregloExtruir3 = [];
        // arregloExtruir3.push(new THREE.Vector3(108,0,0))
        // arregloExtruir3.push(new THREE.Vector3(141, 70,0));
        // arregloExtruir3.push(new THREE.Vector3(218, 78.3,0));
        // arregloExtruir3.push(new THREE.Vector3(162, 131,0));
        // arregloExtruir3.push(new THREE.Vector3(175, 205,0));
        // arregloExtruir3.push(new THREE.Vector3(108, 170,0));
        // arregloExtruir3.push(new THREE.Vector3(41.2, 205,0));
        // arregloExtruir3.push(new THREE.Vector3(55, 131,0));
        // arregloExtruir3.push(new THREE.Vector3(1, 78,0));
        // arregloExtruir3.push(new THREE.Vector3(75, 68,0));
        // arregloExtruir3.push(new THREE.Vector3(108, 0,0));
        // var formaExtruir3 = new THREE.Shape(arregloExtruir3);
        // const star3Geometry = new THREE.ExtrudeGeometry( formaExtruir3, arregloExtruir3 );
        // const star3Material = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,wireframe:false} );
        // const mesh3 = new THREE.Mesh( star3Geometry, star3Material ) ;
        // scene.add( mesh3 );

        const shape = new THREE.Shape();
        const drawStar=(cx,cy,spikes,outerRadius,innerRadius)=>{
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
            // gl.closePath();
            // gl.stroke();
        }
        drawStar(0, 0, 5, 10, 5)
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
        // scene.add( mesh );



        //extruir figura

        var datoExtruir={
            amount : 1,
            depth: 1,
            bevelEnabled:false,
            bevelSegments:7,
            bevelSize:1,
            steps:5,
            bevelThickness:1
        };
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
        var extrudeGeometria = new THREE.ExtrudeGeometry(formaExtruir,datoExtruir);
        var extrudeMaterial = new THREE.MeshBasicMaterial( { color: 0xD35400, wireframe:false } );
        var mallaExtruir = new THREE.Mesh(extrudeGeometria, extrudeMaterial); 
        var extrudeGeometria2 = new THREE.ExtrudeGeometry(formaExtruir2,datoExtruir2);
        var extrudeMaterial2 = new THREE.MeshBasicMaterial( { color: 0xD35400, wireframe:false } );
        var mallaExtruir2 = new THREE.Mesh(extrudeGeometria2, extrudeMaterial2); 
        scene.add(mallaExtruir2)
        scene.add(mallaExtruir)

        const cubeGeometry=new THREE.BoxGeometry() // first phase the geometry of the object
        const cubeMaterial=new MeshBasicMaterial({color:'red'}) // second phase material of the object
        const cube=new THREE.Mesh(cubeGeometry,cubeMaterial) //join the geometry and the material
        const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe:true} );
        const sphere = new THREE.Mesh( geometry, material );
        const planeGeometry = new THREE.PlaneGeometry( 20,20 );
        const texturaPlano = new THREE.TextureLoader().load('./model/floor.jpg');
        const materialPlano = new THREE.MeshBasicMaterial({ map: texturaPlano, side: THREE.DoubleSide });
        const plane=new THREE.Mesh(planeGeometry, materialPlano);
        // plane.position.x=0.5
        // const planeGeometry = new THREE.PlaneGeometry( 20,20 );
        // const texturaPlano = new THREE.TextureLoader().load('./model/floor.jpg');
        // const materialPlano = new THREE.MeshBasicMaterial({ map: texturaPlano, side: THREE.DoubleSide });
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
        
        // const animate = () => {
            
        //   };
        // animate();
        scene.add(plane);
        // scene.add(plane2);
        // scene.add(plane3)
        // scene.add(plane4)
        // scene.add(plane5)

        

        // scene.add(cube) //add object to scene
        scene.add( sphere );
        sphere.position.x=1.5;

        // loader.load('./model/floor.jpg')
        
        const gui=new dat.GUI()
        const options={
            sphereColor:0xffffff,
            cubeColor:0xffffff
        }
        

        
        const animate=()=>{
            const elapsedTime=clock.getElapsedTime()
            let mixerTime=clock.getDelta()
            mixerTime+=0.01
            cube.position.z=Math.sin(elapsedTime)
            // loadedModel.=Math.sin(mixerTime)
            if(loadedModel){
                loadedModel.scene.position.z-=mixerTime
            }
            // console.log(mixerTime)
            if(mixerTime>1){
                console.log(mixerTime)
                mixerTime=clock.start()
            }
            if(mixer){
                // mixer.map(m => m.update(elapsedTime));
                mixer.update(mixerTime)
                // console.log(clock.getDelta())
            }

                
            orbit.update()
            renderer.render(scene,camera)
            // requestAnimationFrame(animate)
        }
        // gui.addColor(options,'sphereColor').onChange(function(e){
        //     sphere.material.color.set(e)
        // })
        // gui.addColor(options,'cubeColor').onChange(function(e){
        //     cube.material.color.set(e)
        // })
        renderer.setAnimationLoop(animate)
        // animate()
        //clean up scene
        // console.log('noo')
        return()=>{
            currentMount.removeChild(renderer.domElement)
            // console.log('nssosso')    
        }
    })
    return(
        <div
            // className='Container3D'
            ref={mountRef}
            style={{width:'100%',height:'100vh'}}
        >

        </div>
    )
}