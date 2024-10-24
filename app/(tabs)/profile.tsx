import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from '../../components/Themed'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

export default function Profile() {
  return (
    <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: '#272727'}}>
      <View>
        <View>
            <View>
                <Image source={{uri: 'https://picsum.photos/200'}} />
            </View>
            <View>
                <Text>Adebayo</Text>
            </View>
            <Text>ID 123456</Text>
            <View>
                <Text>Active</Text>
            </View>
        </View>
        <View>
            <View>
                <Text>Vehicle</Text>
            </View>
            <View>
                <Text>Personal</Text>
            </View>
        </View>
        <View>
            <View>
                <View>
                <MaterialCommunityIcons name="google-circles-communities" size={24} color="black" />
                    <Text>Make</Text>
                </View>
                <Text>GPZ</Text>
            </View>
            <View>
                <View>
                <Ionicons name="car-sport-outline" size={24} color="black" />
                    <Text>Model</Text>
                </View>
                <Text>SD 1200</Text>
            </View>
            <View>
                <View>
                <AntDesign name="calendar" size={24} color="black" />
                    <Text>Year</Text>
                </View>
                <Text>2023</Text>
            </View>
        </View>
        <View>
            <View>
            <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="black" />
                <Text>Community</Text>
            </View>
            <View>
            <AntDesign name="filetext1" size={24} color="black" />
                <Text>Documents</Text>
            </View>
        </View>
        <AntDesign name="tool" size={24} color="black" />
        <Feather name="help-circle" size={24} color="black" />
        <View>
            <View>
            <MaterialIcons name="history-edu" size={24} color="black" />
                <Text>Location History</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
        </View>
        <AntDesign name="customerservice" size={24} color="black" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})