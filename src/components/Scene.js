import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshBasicMaterial, Vector3 } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { createFloor, cube, drawCunia, drawStar, light, Star } from './Models'
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
    // let bool=true;
    const KeyboardPress=(e)=>{
       console.log(e.key)

    

    }
    // console.log(key)
   


    useEffect(()=>{
      
        const currentMount= mountRef.current
        const renderer= new THREE.WebGLRenderer()
        const gltfLoader=new GLTFLoader()
        const clock=new THREE.Clock()
       


        
        renderer.setSize(currentMount.clientWidth,currentMount.clientHeight)
        currentMount.appendChild(renderer.domElement)
        const scene= new THREE.Scene()
        const camera= new THREE.PerspectiveCamera(
            25,
            currentMount.clientWidth/currentMount.clientHeight,
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
        
            characterControls = new CharacterControls(model, mixer, animationsMap, orbit, camera,  'idle')

           
            
    
           
            
        })
 
        scene.add(axesHelper)
        scene.add(floor);
        
        // const group=new THREE.Group()
        // const geometr = new THREE.BoxGeometry( 5,5,5 );
        // const materia = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        // const maxCube = new THREE.Mesh(geometr, materia);
        // const cub
        let cont=7;
        const newCube=cube()
    for(let i = 0;i<7;i++){
        for(let j=i;j<cont;j++){
            for(let k=i;k<cont;k++){
                const newCube=cube()
                newCube.position.x+=j*1.2
                newCube.position.z+=k*1.2
                newCube.position.y=0.5
                newCube.position.y+=i*1.2
                console.log(newCube.position.y)
                scene.add(newCube)
            }
        }
        cont--
    }
        // scene.add(floor2);
        // const star=drawStar(18.6,28.6,5,5,3)
        
        const star=drawStar(0,0,5,5,3)        // star.rotation.x=0.01
        star.position.set(3.6,6,3.6)
        scene.add(star)
        // scene.add(newCube)
        scene.add( sphere );
        // scene.add(cube2)
                // scene.add(cube3)
        

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
            let mixerUpdateDelta = clock.getDelta();
            mixerUpdateDelta+=0.02
            if (characterControls) {
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
            style={{width:'100%',height:'100vh'}}
        >

        </div>
    )
}