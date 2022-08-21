import * as THREE from 'three'
export const W = 'w'
export const A = 'a'
export const S = 's'
export const D = 'd'
export const SHIFT = 'shift'
export const DIRECTIONS = [W, A, S, D]

export class CharacterControls {

    model
    mixer
    animationsMap = new Map() // Walk, Run, Idle
    orbitControl
    camera

    // state
    toggleRun= true
    currentAction
    flag=true
    // temporary data
    walkDirection = new THREE.Vector3()
    rotateAngle = new THREE.Vector3(0, -1,0 ) //add -
    rotateQuarternion= new THREE.Quaternion()
    cameraTarget = new THREE.Vector3()
    
    
    // constants
    fadeDuration = 0.2
    runVelocity = 5
    walkVelocity = 2
    position= new THREE.Vector3(2,0.5,1) //position of danger cube
    // position.add()

    constructor(model,mixer, animationsMap,orbitControl, camera,currentAction) {
        this.model = model
        this.mixer = mixer
        this.animationsMap = animationsMap
        this.currentAction = currentAction
        this.animationsMap.forEach((value, key) => {
            if (key == currentAction) {
                value.play()
            }
        })
        this.orbitControl = orbitControl
        this.camera = camera
       
    
        this.updateCameraTarget(0,0)
    }

     switchRunToggle() {
        this.toggleRun = !this.toggleRun
    }
    hola(play){
        this.model.position.set(0,0,0)

    }

     update(delta, keysPressed) {
        const directionPressed = DIRECTIONS.some(key => keysPressed[key] == true)
        this.flag=true
        var play = '';
        if (directionPressed && this.toggleRun) {
            play = 'run'
        } else if (directionPressed) {
            play = 'walk'
        } else {
            play = 'idle'//idle
        }
        const newDistance=this.position.distanceToSquared(this.model.position)

        // console.log(play)
        if(newDistance<1){
            // console.log(newDistance)ss
            this.model.position.set(0,1.2,0)
            play='idle'
            this.flag=false
        }
        if (this.currentAction != play) {
            // console.log(this.currentAction)
            const toPlay = this.animationsMap.get(play)
            const current = this.animationsMap.get(this.currentAction)

            current.fadeOut(this.fadeDuration)
            toPlay.reset().fadeIn(this.fadeDuration).play();

            this.currentAction = play
            console.log(this.currentAction)
        }
        this.mixer.update(delta)
        
        
        if (this.currentAction == 'run' || this.currentAction == 'walk') {
            // calculate towards camera direction
            var angleYCameraDirection = Math.atan2(
                    (this.camera.position.x - this.model.position.x), 
                    (this.camera.position.z - this.model.position.z))
            // diagonal movement angle offset
            var directionOffset = this.directionOffset(keysPressed)

            // rotate model
            //add -
            this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, -angleYCameraDirection + directionOffset)
            // console.log(this.rotateQuarternion)
            this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

            // calculate direction
            this.camera.getWorldDirection(this.walkDirection)
            this.walkDirection.y = 0
            this.walkDirection.normalize()
            this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)

            // run/walk velocity
            
            let velocity = this.currentAction == 'run' ? this.runVelocity : this.walkVelocity

            // move model & camera
            //add -
            
            console.log(this.currentAction)
            if(newDistance<1){
                // console.log(newDistance)
                velocity=this.walkVelocity
                
            }
            const moveX = -this.walkDirection.x * velocity * delta   
            const moveZ = -this.walkDirection.z * velocity * delta
            this.model.position.x += moveX
            // this.model.position.y=1
            this.model.position.z += moveZ
            // console.log(this.position)
            // console.log(this.model.position)
            
            this.updateCameraTarget(moveX, moveZ)
    
        
        // this.mixer.update(delta)
        
        // if (this.currentAction == 'run' || this.currentAction == 'walk') {
        //     // calculate towards camera direction
        //     var angleYCameraDirection = Math.atan2(
        //             (this.camera.position.x - this.model.position.x), 
        //             (this.camera.position.z - this.model.position.z))
        //     // diagonal movement angle offset
        //     var directionOffset = this.directionOffset(keysPressed)

        //     // rotate model
        //     //add -
        //     this.rotateQuarternion.setFromAxisAngle(this.rotateAngle, -angleYCameraDirection + directionOffset)
        //     // console.log(this.rotateQuarternion)
        //     this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2)

        //     // calculate direction
        //     this.camera.getWorldDirection(this.walkDirection)
        //     this.walkDirection.y = 0
        //     this.walkDirection.normalize()
        //     this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset)

        //     // run/walk velocity
            
        //     let velocity = this.currentAction == 'run' ? this.runVelocity : this.walkVelocity

        //     // move model & camera
        //     //add -
            
        //     console.log(this.currentAction)
        //     if(newDistance<1){
        //         // console.log(newDistance)
        //         velocity=this.walkVelocity
                
        //     }
        //     const moveX = -this.walkDirection.x * velocity * delta   
        //     const moveZ = -this.walkDirection.z * velocity * delta
        //     this.model.position.x += moveX
        //     // this.model.position.y=1
        //     this.model.position.z += moveZ
        //     // console.log(this.position)
        //     // console.log(this.model.position)
            
        //     this.updateCameraTarget(moveX, moveZ)
        }
    }

     updateCameraTarget(moveX, moveZ) {
        // move camera
        this.camera.position.x += moveX
        this.camera.position.z += moveZ

        // update camera target
        this.cameraTarget.x = this.model.position.x
        this.cameraTarget.y = this.model.position.y + 1
        this.cameraTarget.z = this.model.position.z
        this.orbitControl.target = this.cameraTarget
    }

     directionOffset(keysPressed) {
        var directionOffset = 0 // w

        if (keysPressed[S]) { // change s by w
            if (keysPressed[A]) {
                directionOffset = Math.PI / 4 // w+a
            } else if (keysPressed[D]) {
                directionOffset = - Math.PI / 4 // w+d
            }
        } else if (keysPressed[W]) {  //change w by s
            if (keysPressed[A]) {
                directionOffset = Math.PI / 4 + Math.PI / 2 // s+a
            } else if (keysPressed[D]) {
                directionOffset = -Math.PI / 4 - Math.PI / 2 // s+d
            } else {
                directionOffset = Math.PI // s
            }
        } else if (keysPressed[A]) {
            directionOffset = Math.PI / 2 // a
        } else if (keysPressed[D]) {
            directionOffset = - Math.PI / 2 // d
        }

        return directionOffset
    }
}