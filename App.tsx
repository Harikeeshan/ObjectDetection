import { 
  StyleSheet, 
  Text, 
  View,
  Dimensions
} from 'react-native'
import {RNCamera} from 'react-native-camera';
import React, { useRef, useState } from 'react'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const App = () => {
  const [type, setType] = useState(RNCamera.Constants.Type.front);
  const [box, setBox] = useState(null)
  const cameraRef = useRef(null)
  const handlerFace = ({faces}) => {
    if (faces[0]) {
      setBox({
        boxs: {
          width: faces[0].bounds.size.width,
          height: faces[0].bounds.size.height,
          x: faces[0].bounds.origin.x,
          y: faces[0].bounds.origin.y,
          yawAngle: faces[0].yawAngle,
          rollAngle: faces[0].rollAngle,
        },
        rightEyePosition: faces[0].rightEyePosition,
        leftEyePosition: faces[0].leftEyePosition,
        bottomMouthPosition: faces[0].bottomMouthPosition
      });
    } else {
      setBox (null)
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref = {cameraRef}
        style = {styles.camera}
        type = {type}
        captureAudio = {false}
        onFacesDetected={handlerFace}
      />
      {box && (
        <>
          <View style= {styles.bound({
            width: box.boxs.width,
            height: box.boxs.height,
            x: box.boxs.x,
            y: box.boxs.y,
          })}>

          </View>
        </>
      )}
      
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'grey',
  },
  camera:{
    flexGrow: 1,

  },
  bound : ({width, height, x, y}) => {
    return {
      position: 'absolute',
      top: y,
      left: x,
      height,
      width,
      borderWidth: 5,
      borderColor: 'red',
      zIndex: 3000,
    }
  }
})