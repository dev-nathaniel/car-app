import { StyleSheet, Text, View } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import EditScreenInfo from '../../components/EditScreenInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView, Text, View } from '../../components/Themed';

export default function Battery() {
  return (
    <SafeAreaView style={{backgroundColor: '#272727', flex: 1, padding: 16}}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 24}}>
          <View style={{backgroundColor: '#0AB051', borderRadius: 50, padding: 10}}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
          </View>
          <Text style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'white', fontFamily: 'Poppins', fontSize: 20}}>Battery</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
          <View>
            <View style={{borderColor: 'white', borderWidth: 2, width: 50, height: 100, borderRadius: 16, flexDirection: 'row', padding: 2}}>
              <View style={{position: 'absolute', top: -6, left: 18, width: '25%', height: 4, backgroundColor: 'white'}}></View>
              <View style={{backgroundColor: '#0AB051', width: '100%', height: '80%', alignSelf: 'flex-end', borderRadius: 12, borderTopRightRadius: 24, borderTopLeftRadius: 20}}></View>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', marginBottom: 8}}>Battery Health</Text>
            <Text style={{color: 'white', marginBottom: 8, fontSize: 48, fontFamily: 'Poppins'}}>85%</Text>
            <Text style={{color: 'white'}}>Last Charge 1 Week Ago</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 12, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#313131', marginTop: 32, borderRadius: 14}}>
          <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 16}}>Battery Status</Text>
          <Text style={{color: '#0AB051', fontFamily: 'Poppins', fontSize: 16}}>Healthy</Text>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 12, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#313131', marginTop: 16, borderRadius: 14}}>
          <Text style={{color: 'white', fontFamily: 'Poppins', fontSize: 16}}>Average Range</Text>
          <Text style={{color: '#0AB051', fontFamily: 'Poppins', fontSize: 16}}>212 kms</Text>
        </View>
        <View style={{marginTop: 16, paddingHorizontal: 24, paddingVertical: 12, backgroundColor: '#313131', borderRadius: 16}}>
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 50, padding: 4}}>
            <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 14, paddingVertical: 18, backgroundColor: '#0AB051', borderRadius: 50}}><Text style={{color: 'white'}}>Last 7 Days</Text></View>
            <View style={{flex: 1, alignItems: 'center'}}><Text>Last 30 Days</Text></View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 16}}>
            <View>
              <Text style={{color: 'white'}}>Total Charged</Text>
              <Text style={{color: 'white', marginTop: 8, fontSize: 30}}>185Units</Text>
            </View>
            <View>
              <Text style={{color: 'white'}}>Total Spent</Text>
              <Text style={{color: 'white', marginTop: 8, fontSize: 30}}>$2094</Text>
            </View>
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
