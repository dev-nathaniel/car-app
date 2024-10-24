import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MapView, { LatLng, Polyline } from 'react-native-maps'
import BottomSheet, { BottomSheetTextInput, useBottomSheetInternal } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location'
import { useFocusEffect } from 'expo-router'
import axios from 'axios'


const GOOGLE_MAPS_APIKEY = 'AIzaSyAQ7F3uA0z_MVcwIHwDtfJfeY9iNbWTbyY'
const public_token = 'pk.eyJ1Ijoib2xvd29hIiwiYSI6ImNsZjNyMndhcTBnNm8zcm50cmFkZzI1NXAifQ.sUHuNAw9DIe1ATZcaV_ETg'
const map_id = 'a5c876dd7305d527'
export const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]
export default function Map() {
  const {width, height} = Dimensions.get('window')
  const mapView = useRef<MapView>(null)
  const bottomSheetRef = useRef<BottomSheet>(null)
  // const {shouldHandleKeyboardEvents} = useBottomSheetInternal()
  const snapPoints = useMemo(() => ['8%', '25%', '50%'], [])
  // snapPoints[2] = '40%'
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  const [origin, setOrigin] = useState({latitude: 37.3317876, longitude: -122.0054812})
  const [destination, setDestination] = useState({latitude: 37.771707, longitude: -122.4053769})
  const [region, setRegion] = useState({latitude: 37.771707, longitude: -122.4053769, latitudeDelta: 0.0922, longitudeDelta: 0.0922 * width/height})
  const [location, setLocation] = useState<Location.LocationObject>()
  const [errorMsg, setErrorMsg] = useState<string>()
  const [pathCoordinates, setPathCoordinates] = useState<LatLng[]>()

  // useEffect(() => {
  //   return () => {
  //     shouldHandleKeyboardEvents.value = false
  //   }
  // }, [shouldHandleKeyboardEvents])

  // const handleOnFocus = useCallback(
  //   (args: any) => {
  //     shouldHandleKeyboardEvents.value = true
  //   },
  //   [shouldHandleKeyboardEvents]
  // )

  // const handleOnBlur = useCallback(
  //   (args: any) => {
  //     shouldHandleKeyboardEvents.value = false
  //   },
  //   [shouldHandleKeyboardEvents]
  // )

  useFocusEffect(useCallback(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return;
      }

      let location = await Location.getCurrentPositionAsync()
      setLocation(location)
      // console.log('test')
    })()
    // console.log('test2')
  }, []))

  useFocusEffect(useCallback(() => {
    (async () => {
      try {
      const res = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${location?.coords.longitude},${location?.coords.latitude};-1.11755,52.62632;${location?.coords.longitude},${location?.coords.latitude}?geometries=geojson&access_token=${public_token}`)
      const geometry = res.data.routes[0].geometry
      const coords = geometry.coordinates.map(([longitude, latitude]: Array<number>) => ({longitude, latitude}))
      setPathCoordinates(coords)
      console.log(location?.coords)
      mapView.current?.fitToCoordinates(coords, {
        edgePadding: {
          right: (width/20),
          bottom: (height/20),
          left: (width/20),
          top: (height/20)
        }
      })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [location]))
  return (
    <View style={styles.container}>
      <MapView customMapStyle={mapStyles} provider='google' showsMyLocationButton userInterfaceStyle='dark' showsUserLocation initialCamera={location && location.coords.heading ? {center: {latitude: location?.coords.latitude, longitude: location?.coords.longitude}, heading: location?.coords.heading, pitch: 1, zoom: 16, altitude: 1500} : undefined} style={styles.map} ref={mapView} >
        {location ? <MapViewDirections
          origin={{latitude: location?.coords.latitude, longitude: location?.coords.longitude}}
          destination={{latitude: location.coords.latitude, longitude: location.coords.longitude}}
          waypoints={[{latitude: 52.62632, longitude: -1.11755}]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          precision='high'
          strokeColor='#0AB051'
          onReady={result => {
            console.log(result.legs[0].steps.length)
            mapView.current?.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: (width/20),
                bottom: (height/20),
                left: (width/20),
                top: (height/20)
              }
            })
          }}
        /> : null}
        {/* {pathCoordinates ?
        <Polyline
          coordinates={pathCoordinates}
          strokeColor='hotpink'
          strokeWidth={4}
          strokeColors={[
            'hotpink',
            'blue',
            'red',
            'brown',
            'yellow',
            'purple',
            'green',
            'black',
            'orange',
            'hotpink',
            'blue',
            'red',
            'brown',
            'yellow',
            'purple',
            'green',
            'black',
            'orange',
            'hotpink',
            'blue',
          ]}
        /> : null
        } */}
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleStyle={{backgroundColor: 'transparent', display: 'none'}}
        backgroundStyle={{ borderRadius: 30, backgroundColor: '#454545'}}
        handleIndicatorStyle={{backgroundColor: 'white'}}
        style={{borderRadius: 30}}
      >
        <View style={styles.contentContainer}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 32}}>Route</Text>
          <View style={{marginTop: 16}}>
            <View style={{backgroundColor: 'white', padding: 16, borderRadius: 20}}>
              <TextInput editable={false} placeholder='Your Location' placeholderTextColor={'black'} />
            </View>
            <View style={{backgroundColor: 'white', padding: 16, borderRadius: 20, marginTop: 16}}>
              {/* <TextInput onFocus={handleOnFocus} onBlur={handleOnBlur} placeholder='Where to?' placeholderTextColor={'black'} /> */}
              <BottomSheetTextInput placeholder='Where to?' placeholderTextColor={'black'} />
            </View>
            <View style={{position: 'absolute', padding: 10, backgroundColor: '#0AB051', borderRadius: 100, right: '10%', top: '20%'}}>
            <Ionicons name="swap-vertical" size={36} color="white" />
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 32
    // alignItems: 'center',
  }
})