import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { Link, Tabs, useFocusEffect, useNavigation } from 'expo-router';
import { Pressable, useColorScheme, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../../constants/Colors';
import React, { useEffect, useState } from 'react';

interface TabBarIconComponent {
  focused: boolean,
  screen: string,
  setFocus: React.ComponentState,
  color: string,
  name: React.ComponentProps<typeof Ionicons>['name'];
  label: string,
  altName: React.ComponentProps<typeof Ionicons>['name']
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{  }} {...props} />;
}

function TabBarIconComponent({focused, screen, setFocus, color, name, label, altName}: TabBarIconComponent){
//   useEffect(() => {
//   if(focused){
//   console.log(screen)
//   setFocus(screen)
//   }
// }, [focused])
useFocusEffect(
 React.useCallback(() => {
  setFocus(screen)
  console.log(color)

  return () => setFocus('')
 }, [])
)

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: focused == true ? '#0AB051' : 'transparent', justifyContent: 'center', borderRadius: 16, padding: focused ? 10 : 0, width: '100%'}}>
      <TabBarIcon name={focused ? altName : name} color={color} />
      {/* <Text>{focused ? 'focused' : 'not focused'}</Text> */}
      {focused ? <Text style={{marginLeft: 10, color: 'white', fontFamily: 'Poppins'}}>{label}</Text> : null}
    </View>
  )
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [focus, setFocus] = useState('')
  console.log(focus)
  return (
    <Tabs
      // tabBar={props => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingBottom: 20,
          height: 99,
          backgroundColor: '#454545'
        },
        tabBarInactiveTintColor: 'white',
        headerShown: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarItemStyle: {flex: focus == 'car' ? 1.5 : 1},
          // tabBarIconStyle: {flex: 4, flexDirection: 'row'},
          title: 'My Car',
          tabBarIcon: ({ color, focused }) => (<TabBarIconComponent label={'My Car'} altName={'car-sport'} name={'car-sport-outline'} color={color} focused={focused} screen={'car'} setFocus={setFocus} />),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="battery"
        options={{
          tabBarItemStyle: {flex: focus == 'battery' ? 1.5 : 1},
          title: 'Battery',
          tabBarIcon: ({ color, focused }) => <TabBarIconComponent label={'Battery'} altName={'ios-battery-half-sharp'} name={'ios-battery-half'} color={color} focused={focused} screen={'battery'} setFocus={setFocus} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarItemStyle: {flex: focus == 'map' ? 1.5 : 1},
          title: 'Map',
          tabBarIcon: ({ color, focused }) => <TabBarIconComponent label={'Map'} altName={'location'} name={'location-outline'} color={color} focused={focused} screen={'map'} setFocus={setFocus} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarItemStyle: {flex: focus == 'profile' ? 1.5 : 1},
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => <TabBarIconComponent label={'Profile'} altName={'person'} name={'person-outline'} color={color} focused={focused} screen={'profile'} setFocus={setFocus} />,
        }}
      />
    </Tabs>
  );
}
