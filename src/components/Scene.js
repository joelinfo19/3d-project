import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { MeshBasicMaterial } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { createFloor, drawCunia, drawStar, light, Star } from './Models'
import { CharacterControls } from './Controls'
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
            console.log(gltfAnimations)
            // const walk=keyboardPress()
            // console.log(movement)
            let action
            let action2
            const animationsMap = new Map()
            gltfAnimations.filter(a => a.name != 'TPose').forEach((a) => {
                animationsMap.set(a.name, mixer.clipAction(a))
            })
        
            characterControls = new CharacterControls(model, mixer, animationsMap, orbit, camera,  'Idle')
            // document.addEventListener('keydown',(e)=>{
            //     // const clip1 = THREE.AnimationClip.findByName( gltfAnimations, 'Walk' )

            //     // action.reset()
            //     // action.play()
            //     if(e.key=='w'){
                    
            //         const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Run' )
            //         action = mixer.clipAction( clip );
            //         // action.stop()
            //         // action.reset()
            //         action.play()
            //     }
            //     if(e.key=='e'){
            //         action.stop()
            //         const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Walk' )
            //         action = mixer.clipAction( clip );
            //         // action.reset()
            //         action.play()

            //     }
                
            // },true)
               
            // document.addEventListener('keyup',(e)=>{
            //     action.stop()
            //     const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Idle' );
            //     action = mixer.clipAction( clip );
            //     action.play()
            //     // const clip2 = THREE.AnimationClip.findByName( gltfAnimations, 'TPose' );
            //     // action = mixer.clipAction( clip2 );
            //     // action.play()
            //     console.log(e)
                
            // },true)
            // const clip = THREE.AnimationClip.findByName( gltfAnimations, 'Idle' );
            // action = mixer.clipAction( clip );
            // action.play()
           
            
    
           
            
        })
 
        scene.add(axesHelper)
        scene.add(floor);
        // scene.add(floor2);

        // scene.add(Star())
        // scene.add(drawCunia())
        // scene.add( sphere );
        // sphere.position.x=1.5;
        
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
        }, false);
        document.addEventListener('keyup', (event) => {
            // keyDisplayQueue.up(event.key);
            (map )[event.key.toLowerCase()] = false
        }, false);
        
        const animate=()=>{
            const elapsedTime=clock.getElapsedTime()
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
            mixerUpdateDelta+=0.01
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