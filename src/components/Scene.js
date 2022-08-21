import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshBasicMaterial, Vector3 } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { coneObject, createFloor, createFloor2, cube, drawCunia, drawStar, light, mandelBrot, Star } from './Models'
import { CharacterControls } from './Controls'
import { scryRenderedComponentsWithType } from 'react-dom/test-utils'
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
        const clock=new THREE.Clock()
       


        
        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        const window=[currentMount.clientWidth,currentMount.clientHeight]
        currentMount.appendChild(renderer.domElement)
        const scene= new THREE.Scene()
        const camera= new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth/currentMount.clientWidth,
            0.01,
            1000
            )
        // const a=new THREE.AnimationAction(1,1,1,1)
        const orbit=new OrbitControls(camera,renderer.domElement)

        const axesHelper=new THREE.AxesHelper(5)


        let loadedModel;
        let mixer;
      
        let characterControls
        camera.position.set(5,2,10)
       
      

        const [dirLight,ambientLight]  = light()  
        scene.add(ambientLight)
        scene.add(dirLight)
        //sphere
        const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe:true} );
        const sphere = new THREE.Mesh( geometry, material );

        const [floor,floor2,...rest]=createFloor()
        const [floorTest]=createFloor2()
        // const Cube=cube()
        //fractal mandelBrot
        // const fractal=mandelBrot(currentMount.clientWidth/currentMount.clientHeight,window[0],window[1])
        const cubes=[]
        for(let i=0; i<5;i++){
            const newCube=cube()
            newCube.position.x=-2
            newCube.position.x-=i*2
            cubes[i]=newCube
            scene.add(newCube)
            // console.log(cubes[i].position)

        }
        // console.log(cubes[0])

        let flag
        gltfLoader.load('./model/scene.gltf',(gltf)=>{
    
            // fbx.scale.setScalar(0.01);
            loadedModel=gltf
            const model =gltf.scene
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
        
            characterControls = new CharacterControls(model, mixer, animationsMap, orbit, camera,  'idle',cubes)
            flag=characterControls.flag
           
           
            
    
           
            
        })
       
 
            const color = 0xFFFFFF;
            const density = 0.1;
            // scene.fog = new THREE.FogExp2(color, density);
          
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
        
        const star=drawStar(0,0,5,5,3)        // star.rotation.x=0.01
        star.position.set(3.6,6,3.6)
        // scene.add(star)
        // scene.add(newCube)
        scene.add( sphere );
        // Cube.position.set(2,0.5,1)
        
        // scene.add(Cube)
        // scene.add(cube2)
        // scene.add(cube3)
        // console.log(Cube.position)
    
        

        star.scale.set(0.2,0.2,0.2)
        sphere.position.x=-1.5;
        sphere.scale.set(0.2,0.2,0.2)
        sphere.position.y=1.5;
        sphere.position.z=1.5;
        
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
            star.rotateY(0.1)
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
            
            let mixerUpdateDelta = clock.getDelta();
            mixerUpdateDelta+=0.02
            if (characterControls) {
                // console.log(characterControls.flag)
                if(!characterControls.flag){
                    setIsVisible(true)
                }
                
                characterControls.update(mixerUpdateDelta, map);
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