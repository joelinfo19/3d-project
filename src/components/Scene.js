import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MathUtils, MeshBasicMaterial, PMREMGenerator, Vector3 } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { coneObject, createFloor, createFloor2, cube, cubeInstanced, drawCunia, drawStar, light, mandelBrot, Star } from './Models'
import { CharacterControls } from './Controls'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils'
import { Sky } from 'three/examples/jsm/objects/Sky';
export const W = 'w'
export const A = 'a'
export const S = 's'
export const D = 'd'
export const SHIFT = 'shift'
export const DIRECTIONS = [W, A, S, D]
// import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
export const Scene=()=>{
    // const [key,useKey]=useState()
    const mountRef= useRef(null)
    const [isVisible,setIsVisible]=useState(false)
    // let bool=true;
    const handleButton=(e)=>{
       setIsVisible(false)

    

    }
    // console.log(key)
   


    useEffect(()=>{

        const currentMount= mountRef.current
        const renderer= new THREE.WebGLRenderer()
        const gltfLoader=new GLTFLoader()
        const gltfLoader2=new GLTFLoader()
        const clock=new THREE.Clock()
        let n = 0.2;
        let m = 0;


        
        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        const window=[currentMount.clientWidth,currentMount.clientHeight]
        currentMount.appendChild(renderer.domElement)
        const scene= new THREE.Scene()
        const camera= new THREE.PerspectiveCamera(
            60,
            currentMount.clientWidth/currentMount.clientWidth,
            0.01,
            1000
            )
        // const a=new THREE.AnimationAction(1,1,1,1)
        const orbit=new OrbitControls(camera,renderer.domElement)

        const axesHelper=new THREE.AxesHelper(5)


        let loadedModel;
        let mixer;
        let positionNewCubes=new THREE.Vector3()
        let characterControls
        let matrix = new THREE.Matrix4();
        camera.position.set(5,2,10)
       
      

        const [dirLight,ambientLight]  = light()  
        console.log(renderer.toneMapping)
        scene.add(ambientLight)
        scene.add(dirLight)
        //sphere
        // const geometrySphere = new THREE.SphereGeometry( 0.5, 32, 16 );
        // const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe:true} );
        // const sphere = new THREE.Mesh( geometrySphere, material );

        const [floor,floor2,...rest]=createFloor()
        const [floorTest]=createFloor2()
        const sky=new Sky()
        sky.scale.setScalar( 450000 );  
        scene.add( sky );
        const skyUniforms = sky.material.uniforms;
        skyUniforms['turbidity'].value = 10;
        skyUniforms['rayleigh'].value = 3;
        skyUniforms['mieCoefficient'].value = 0.005;
        skyUniforms['mieDirectionalG'].value = 0.04;
        // skyUniforms['exposure'].value = 0.1273;
        let sun = new THREE.Vector3();
        const parameters = {
            elevation: 1,
            azimuth: 170
        };
        function generateRandom(min, max) {
            var num = Math.floor(Math.random() * (max - min + 1)) + min;
            return (num === 1 || num ===0 ) ? generateRandom(min, max) : num;
        }
        
        // var test = generateRandom(1, 20)
        
        const pmremGenerator = new PMREMGenerator(renderer);
        
        const phi = MathUtils.degToRad(90 - parameters.elevation);
        const theta = MathUtils.degToRad(parameters.azimuth);
        let n1 = 0.2;
        let m1 = 0;
        sun.setFromSphericalCoords(1, phi, theta);
        sky.material.uniforms['sunPosition'].value.copy(sun);
        // scene.environment = pmremGenerator.fromScene(sky).texture;
        // water.material.uniforms['sunDirection'].value.copy(sun).normalize();
        // const Cube=cube()
        //fractal mandelBrot
        // const fractal=mandelBrot(currentMount.clientWidth/currentMount.clientHeight,window[0],window[1])
       
        const newCubeInstanced=cubeInstanced()
        const cubes=newCubeInstanced
        let dummy = new THREE.Object3D();
        
        for(let i=0; i<newCubeInstanced.count;i++){
            
            // const random=Math.random() * (13-2) + 2
            // newCubeInstanced.position.x=-3
            // // console.log(newCube.position.x)
            // // console.log(random)
            // newCubeInstanced.position.x-=((i* (random))/2)
            // newCubeInstanced.position.y=0.5
            // // newCube.position.z=-3
            
            // console.log(newCubeInstanced.position.x)
            
            var xStaticPosition = -5 * (i + 1)
            
            dummy.position.set(generateRandom(-20, 20), 0.7, generateRandom(-20, 20));
            dummy.updateMatrix();
            newCubeInstanced.setMatrixAt( i, dummy.matrix );
            // newCubeInstanced.getMatrixAt( i, matrix );
            // console.log(position.setFromMatrixPosition( matrix ))
            // console.log(newCubeInstanced[i].position.x)
            // console.log(cubes[i].position)
            // cubes[i]=newCubeInstanced
        }
       
        scene.add(newCubeInstanced)
        
        const newCube=cube()
        newCube.position.z = 5;
        newCube.position.x = 0;
        const newCube2=cube()
        newCube2.position.set(2,0.5,1)
        let cube1BB=new THREE.Box3(new THREE.Vector3(),new THREE.Vector3())
        cube1BB.setFromObject(newCube2)
        // console.log(cube1BB)
        scene.add(newCube)
        // scene.add(newCube2)
        // console.log(cubes[0])
        function anim(obj) {
     
         
          obj.position.x += n;
          obj.position.z += m;
          
          if (obj.position.x > 10) {
            obj.position.x -= 0.2;
            n = 0;
            m = 0.2;
            // console.log( obj.position.z)
          }
          if (obj.position.x < -10) {
            obj.position.x = -10;
            n = 0;
            m = -0.2;
          }
          if (obj.position.z > 10) {
            obj.position.z -= 0.2;
            n = -0.2;
            m = 0;
          }
          if (obj.position.z < -10) {
            obj.position.z = -10;
            n = 0.2;
            m = 0;
          }
          
        }
        function animCubes(obj) {
           
            for(let i=0; i<obj.count;i++){
                obj.getMatrixAt(i,matrix)  
                positionNewCubes.setFromMatrixPosition(matrix)
                positionNewCubes.x += n1;
                positionNewCubes.z += m1;
            
            if (positionNewCubes.x > 10) {
                positionNewCubes.x -= 0.2;
              n1 = 0;
              m1 = 0.2;
              // console.log( obj.position.z)
            }
            if (positionNewCubes.x < -10) {
                positionNewCubes.x = -10;
              n1 = 0;
              m1 = -0.2;
            }
            if (positionNewCubes.z > 10) {
                positionNewCubes.z -= 0.2;
              n1 = -0.2;
              m1 = 0;
            }
            if (positionNewCubes.z < -10) {
                positionNewCubes.z = -10;
              n1 = 0.2;
              m1 = 0;
            }
            matrix.setPosition( positionNewCubes );
            obj.setMatrixAt( i, matrix );
            obj.instanceMatrix.needsUpdate = true;
            }

            
          }
        let flag
        let model
        gltfLoader.load('./model/scene.gltf',(gltf)=>{
    
            // fbx.scale.setScalar(0.01);
            loadedModel=gltf
            model =gltf.scene
            const gltfAnimations=gltf.animations
            // model.scale.set(0.02,0.02,0.02)
            model.position.y=1.2

            model.traverse(function(child){
                if(child.isMesh) child.castShadow=true   
            })
            console.log(model.position)
            scene.add(model)
            mixer=new THREE.AnimationMixer(model)
            console.log(gltfAnimations)
            // const walk=keyboardPress()
            // console.log(movement)
            let action
            let action2
            const animationsMap = new Map()
            gltfAnimations.filter(a => a.name != 't-pose').forEach((a) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
        
            characterControls = new CharacterControls(model, mixer, animationsMap, orbit, camera,  'idle',cubes,cube1BB)
            flag=characterControls.flag
           
           
            
    
           
            
        })
        // gltfLoader2.load('./model/textures2/scene.gltf',(gltf)=>{
        //     const model =gltf.scene
        //      model.scale.set(1,1,1)
        //      model.position.y=3
        //      model.position.z=3
        //      console.log(model.position)
        //     scene.add(model)

        // })
 
            const color = 0xFFFFFF;
            const density = 0.1;
            // scene.fog = new THREE.FogExp2(color, density);
            const size = 50;
            const divisions = 50;
            
            const gridHelper = new THREE.GridHelper( size, divisions );
            scene.add( gridHelper );
            // let mesh;

            // const instances = 2;
            // const geometry = new THREE.InstancedBufferGeometry();
            // const vertexBuffer = new THREE.InterleavedBuffer( new Float32Array( [
			// 	// Front
			// 	- 1, 1, 1, 0, 0, 0, 0, 0,
			// 	1, 1, 1, 0, 1, 0, 0, 0,
			// 	- 1, - 1, 1, 0, 0, 1, 0, 0,
			// 	1, - 1, 1, 0, 1, 1, 0, 0,
			// 	// Back
			// 	1, 1, - 1, 0, 1, 0, 0, 0,
			// 	- 1, 1, - 1, 0, 0, 0, 0, 0,
			// 	1, - 1, - 1, 0, 1, 1, 0, 0,
			// 	- 1, - 1, - 1, 0, 0, 1, 0, 0,
			// 	// Left
			// 	- 1, 1, - 1, 0, 1, 1, 0, 0,
			// 	- 1, 1, 1, 0, 1, 0, 0, 0,
			// 	- 1, - 1, - 1, 0, 0, 1, 0, 0,
			// 	- 1, - 1, 1, 0, 0, 0, 0, 0,
			// 	// Right
			// 	1, 1, 1, 0, 1, 0, 0, 0,
			// 	1, 1, - 1, 0, 1, 1, 0, 0,
			// 	1, - 1, 1, 0, 0, 0, 0, 0,
			// 	1, - 1, - 1, 0, 0, 1, 0, 0,
			// 	// Top
			// 	- 1, 1, 1, 0, 0, 0, 0, 0,
			// 	1, 1, 1, 0, 1, 0, 0, 0,
			// 	- 1, 1, - 1, 0, 0, 1, 0, 0,
			// 	1, 1, - 1, 0, 1, 1, 0, 0,
			// 	// Bottom
			// 	1, - 1, 1, 0, 1, 0, 0, 0,
			// 	- 1, - 1, 1, 0, 0, 0, 0, 0,
			// 	1, - 1, - 1, 0, 1, 1, 0, 0,
			// 	- 1, - 1, - 1, 0, 0, 1, 0, 0
			// ] ), 8 );
            // const positions = new THREE.InterleavedBufferAttribute( vertexBuffer, 3, 0 );
			// geometry.setAttribute( 'position', positions );
            // const uvs = new THREE.InterleavedBufferAttribute( vertexBuffer, 2, 4 );
			// geometry.setAttribute( 'uv', uvs );
            // const indices = new Uint16Array( [
			// 	0, 2, 1,
			// 	2, 3, 1,
			// 	4, 6, 5,
			// 	6, 7, 5,
			// 	8, 10, 9,
			// 	10, 11, 9,
			// 	12, 14, 13,
			// 	14, 15, 13,
			// 	16, 17, 18,
			// 	18, 17, 19,
			// 	20, 21, 22,
			// 	22, 21, 23
			// ] );
            // geometry.setIndex( new THREE.BufferAttribute( indices, 1 ) );
            // const matrix = new THREE.Matrix4();
			// const offset = new THREE.Vector3();
			// const orientation = new THREE.Quaternion();
            // let x, y, z, w;

			// const materialc = new THREE.MeshBasicMaterial();
            // mesh = new THREE.InstancedMesh( geometry, materialc, instances );
            // const scale = new THREE.Vector3( 1, 1, 1 );

            // for ( let i = 0; i < instances; i ++ ) {

			// 	// offsets
    
			// 	x = Math.random() * 30 - 30;
			// 	y = 0.7;
			// 	z = Math.random() * 30 - 30;
            //     // x = 5;
			// 	// y =0.7;
			// 	// z = 5
                
			// 	offset.set( x, y, z ).normalize();
			// 	offset.multiplyScalar( 2 ); // move out at least 5 units from center in current direction
            //     console.log(offset.x)
            //     console.log(x)
			// 	offset.set( x + offset.x, y + offset.y, z + offset.z );
            //     console.log(x+offset.x)

                

			// 	matrix.compose( offset, orientation, scale );
            //     // console.log(matrix.values())
			// 	mesh.setMatrixAt( i, matrix );
            //     console.log(mesh.position)

			// }
           
            // scene.add( mesh );


        scene.add(axesHelper)
        scene.add(floorTest); 
        // for(let i; i<5;i++){
        //     const newCube=cube()
        //     newCube.position.x+=i
        //     // cubes[i]=newCube
        //     scene.add(newCube)
        //     console.log("cubes[i].position")

        // }
        //fractal mandelbrot
        // scene.add(fractal)
       
/* fractal Triangle 
        function drawLine(p0, p1, color="black") {
            const shape = new THREE.Shape();

            const extrudeSettings = {
                amount : 1,
                depth: 5,
                bevelEnabled:false,
                bevelSegments:7,
                bevelSize:0.1,
                bevelOffSet:1,
                steps:5,
                bevelThickness:1
            };
            shape.moveTo(p0.x,p0.y)
            shape.lineTo(p1.x,p1.y)
            const starGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
            const starMaterial = new THREE.MeshNormalMaterial( { color: 0xDDEAD5 ,wireframe:false} );
            const mesh = new THREE.Mesh( starGeometry, starMaterial ) ;
            scene.add(mesh)
        }

        function drawTriangle(p0, p1, p2) {
            drawLine(p0, p1)
            drawLine(p1, p2)
            drawLine(p2, p0)
        }

        function drawFract(p0, p1, p2, limit){
            if(limit > 0){
                const pA = {
                        x: p0.x + (p1.x - p0.x)/2,
                        y: p0.y - (p0.y - p1.y)/2
                    },
                    pB = {
                        x: p1.x + (p2.x - p1.x)/2,
                        y: p1.y - (p1.y - p2.y)/2
                    },
                    pC = {
                        x: p0.x + (p2.x - p0.x)/2,
                        y: p0.y
                    };

                drawFract(p0, pA, pC, limit-1);
                drawFract(pA, p1, pB, limit-1);
                drawFract(pC, pB, p2, limit-1);
            }
            else{
                drawTriangle(p0,p1,p2);
            }
        }
        // drawFract({x: -50, y:50},{x:0, y:120},  {x:50, y:50}, 6)
        */
    //     let cont=7;
    // for(let i = 0;i<7;i++){
    //     for(let j=i;j<cont;j++){
    //         for(let k=i;k<cont;k++){
    //             const newCube=cube()
    //             newCube.position.x+=j*1.2
    //             newCube.position.z+=k*1.2
    //             newCube.position.y=0.5
    //             newCube.position.y+=i*1.2
    //             console.log(newCube.position.y)
    //             scene.add(newCube)
    //         }
    //     }
    //     cont--
    // }
    // for(let i=0;i<20;i++){
    //     const cone=coneObject()
    //     cone.position.x+=i* Math.floor(Math.random() * 3) + -6
    //     cone.position.z+=i* Math.floor(Math.random() * 3) + -6
    //     scene.add(cone)
    // }
        // scene.add(floor2);
        // const star=drawStar(18.6,28.6,5,5,3)
        
        // const star=drawStar(0,0,5,5,3)        // star.rotation.x=0.01
        // star.position.set(3.6,6,3.6)
        // scene.add(star)
        // scene.add(newCube)
        // scene.add( sphere );
        // Cube.position.set(2,0.5,1)
        
        // scene.add(Cube)
        // scene.add(cube2)
        // scene.add(cube3)
        // console.log(Cube.position)
    
        

        // star.scale.set(0.2,0.2,0.2)
        // sphere.position.x=-1.5;
        // sphere.scale.set(0.2,0.2,0.2)
        // sphere.position.y=1.5;
        // sphere.position.z=1.5;
        
        const gui=new dat.GUI()
        const options={
            sphereColor:0xffffff,
            cubeColor:0xffffff
        }
        
        let map= new Map()
        map.set(W, 'w')
        map.set(A, 'a')
        map.set(S, 's')
        map.set(D, 'd')
        map.set(SHIFT, 'shift')
        document.addEventListener('keydown', (event) => {
            // keyDisplayQueue.down(event.key)
            if (event.shiftKey && characterControls) {
                characterControls.switchRunToggle()
            } else {
                (map )[event.key.toLowerCase()] = true
            }
        }, true);
        document.addEventListener('keyup', (event) => {
            // keyDisplayQueue.up(event.key);
            (map )[event.key.toLowerCase()] = false
        }, true);

        const animate=()=>{
            const elapsedTime=clock.getElapsedTime()
            // star.rotateY(0.1)
            let mixerUpdateDelta = clock.getDelta();
            // sphere.rotateY(0.004)
            // newCube.rotateY(0.004)
            // star.position.set(18.6,28.6,3.6)
            
            // let mixerTime=clock.getDelta()
            // mixerTime+=0.02
            // // cube.position.z=Math.sin(elapsedTime)
            // // loadedModel.=Math.sin(mixerTime)
            // // if(loadedModel){
            // //     loadedModel.scene.position.z-=mixerTime
            // // }
            // // console.log(mixerTime)
            // // if(mixerTime>1){
            // //     console.log(mixerTime)
            // //     mixerTime=clock.start()
            // // }
            // if(mixer){
            //     // mixer.map(m => m.update(elapsedTime));
            //     mixer.update(mixerTime)
            //     // console.log(clock.getDelta())
            // }
            // console.log(flag)
            anim(newCube)
            animCubes(newCubeInstanced)
            // if(newCubeInstanced){
            //     console.log(newCubeInstanced.getMatrixAt(0,matrix))
    
            // }
            for(let i=0;i<cubes.length;i++){
                // cubes[i].position.z=Math.sin(elapsedTime*3)*5
                // anim(cubes[i])
                // cubes[i].position.z+=i
                // cubes[i].position.x-=3*3
            }
           
            mixerUpdateDelta+=0.02
            if (characterControls) {
                // console.log(characterControls.flag)
                if(!characterControls.flag){
                    setIsVisible(true)
                }
                
                
                characterControls.update(mixerUpdateDelta, map);
                // model.position.x = clamp(model.position.x, -20, 25);
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

        return()=>{
            currentMount.removeChild(renderer.domElement)
            // console.log('nssosso')    
        }
    },[])
    return(

         <div
            // className='Container3D'
            ref={mountRef}
            style={{width:'100%',height:'100vh',display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}
            
        >
            <button id='end' style={{visibility:isVisible?'visible':'hidden'}} onClick={handleButton}>
                    Try again
            </button>
        </div>

       
        
    )
}