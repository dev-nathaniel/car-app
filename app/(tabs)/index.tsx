import { StyleSheet, Text, View } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Text, View } from '../../components/Themed';
import { useGLTF } from '@react-three/drei/core/useGLTF'
import modelPath from '../../assets/images/tesla.glb'
import { Canvas, useFrame, MeshProps } from '@react-three/fiber/native';
import { Suspense, useRef } from 'react';
import MapView from 'react-native-maps';
import { mapStyles } from './map';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function Model(props) {
  const gltf = useGLTF(modelPath)
  const mesh = useRef(null)
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta
  })
  return <mesh ref={mesh}>
    <primitive {...props} scale={0.014} object={gltf.scene} />
  </mesh>
}

export default function TabOneScreen() {
  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={{ flex: 1, backgroundColor: '#272727', padding: 16 }}>
      <Canvas style={{ flex: 0.85 }}>
        <ambientLight />
        {/* <mesh>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh> */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
      <View style={{ flex: 2 }}>
        <View style={{ backgroundColor: '#313131', borderRadius: 10, flexDirection: 'row', height: 150, padding: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 16 }}>Charging Station</Text>
            <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome5 name="charging-station" size={50} color="white" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 16 }}>VVA Station</Text>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 8 }}>100 feet road, Coimbatore</Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 16 }}>
                  <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 16, marginRight: 8 }}>2kms</Text>
                  <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 10 }}>(10Min)</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <MapView userInterfaceStyle='dark' customMapStyle={mapStyles} provider='google' style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <View style={{ backgroundColor: '#313131', borderRadius: 10, padding: 10, flex: 0.8 }}>
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins' }}>Battery</Text>
            <Text style={{ color: 'white', marginTop: 8 }}>Last charge 1w ago</Text>
            <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <View style={{ borderColor: 'white', borderWidth: 2, width: 50, height: 100, borderRadius: 16, flexDirection: 'row', padding: 2 }}>
                  <View style={{ position: 'absolute', top: -6, left: 18, width: '25%', height: 4, backgroundColor: 'white' }}></View>
                  <View style={{ backgroundColor: '#0AB051', width: '100%', height: '80%', alignSelf: 'flex-end', borderRadius: 12, borderTopRightRadius: 24, borderTopLeftRadius: 20 }}></View>
                </View>
              </View>
              <View style={{ marginLeft: 16, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 20 }}>212km</Text>
                <View style={{ marginVertical: 6, height: 3, backgroundColor: 'white', width: '100%', borderRadius: 10 }}></View>
                <View style={{ backgroundColor: '#404040', width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 8, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 30 }}>
                  <Text style={{ color: 'green' }}>Good</Text>
                </View>
                <Text style={{ color: 'white', fontFamily: 'Poppins', fontSize: 24 }}>85%</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <View style={{ backgroundColor: '#313131', borderRadius: 10, padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Weather</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center'}}>
                <View>
                  <View style={{ borderRadius: 100, width: 50, height: 50, backgroundColor: 'yellow' }}></View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: 'white', fontFamily: 'Poppins'}}>Sunny</Text>
                  <View>
                    <Text style={{color: 'white', fontFamily: 'Poppins'}}>Coimbatore</Text>
                  </View>
                  <Text style={{color: 'white', fontSize: 24, fontFamily: 'Poppins'}}>32c</Text>
                </View>
              </View>
            </View>
            <View style={{backgroundColor: '#313131',padding: 10, borderRadius: 10, marginTop: 10}}>
              <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 16}}>Total Distance</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <MaterialCommunityIcons name="steering" size={40} color="white" />
                <View style={{marginLeft: 10}}>
                  <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 16}}>17,439.8 KM</Text>
                  <View>
                    <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 10}}>Check Milage</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: '#313131', padding: 6, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{backgroundColor: '#0AB051', paddingVertical: 15, paddingHorizontal: 24, borderRadius: 50}}>
            <Text style={{color: 'white', fontFamily: 'Poppins'}}>Locked</Text>
          </View>
          <View style={{paddingRight: 16}}>
            <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 12}}>Swipe Right to unlock</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
