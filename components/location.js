import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, Button, SafeAreaView, Alert, AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import DialogInput from 'react-native-dialog-input';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import enviarData from '../until/sendLoc'
export default class Localizacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: '',
            latitud: '',
            longitud: '',
            fecha: '',
            errorMessage: null,
            isDialogVisible: true,
          };
        this.capturar = this.capturar.bind(this)
        this._getLocationAsync = this._getLocationAsync.bind(this)
    }
    datosPersistente=async(x)=>{
      try { 
        await AsyncStorage.setItem ('data', x);
         
      } catch (error) { 
        // Error al recuperar los datos 
        console.log (error.message); 
      } 
    }
    getDatosPersistente=async()=>{ 
      let data = ''; 
      try { 
        data = await AsyncStorage.getItem ('data').then( res => console.log(res))
        console.log(data)
      } catch (error) { 
        // Error al recuperar los datos 
        console.log (error.message); 
      }
      return longitud; 
    }
    deleteDatos=async()=>{
      try {
        await AsyncStorage.removeItem('data').then(res => console.log('data eliminada'));
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }

  
  componentDidMount=async()=>{
        
        let date = await new Date().getDate();
        let month = await new Date().getMonth() + 1;
        let year = await new Date().getFullYear();       
        this.setState({
            fecha: `Dia :${date}, Mes: ${month}, Año: ${year}`
        })
       
       }


  usuario=async(x)=>{
        await this.setState({
          usuario: x,
          isDialogVisible: false,
        })       
        
      }
  capturar() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {

      setInterval( () => {
        this._getLocationAsync();
        
    },2000);
       
    }
  }
 se
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ 
      latitud: location["coords"]["latitude"],
      longitud: location["coords"]["longitude"]
     });
    
    
  
    
  };
  usuariocap(){
      return `Hola ${this.state.usuario} por favor presiona UBICACIÓN`
  }
enviar(){
  const url = 'http://192.168.100.38:4000/contenido'
  const data = JSON.stringify({
      latitud: this.state.latitud,
      longitud:this.state.longitud,
      usuario: this.state.usuario,
      fecha: this.state.fecha,
    })
    enviarData(data, url)
    this.datosPersistente(data)
    this.getDatosPersistente()
    this.deleteDatos()
    
}
  render() {
    
    return (
        <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      <Button
          title="ubicación"
          onPress={() => {this.capturar()}}
        />
        <Text>{this.usuariocap()}</Text>
        <Text style={styles.paragraph}>Tu latitud actual es: {JSON.stringify(this.state.latitud)}</Text>
        <Text style={styles.paragraph}>Tu longitud actual es: {JSON.stringify(this.state.longitud)}</Text>
    <Text>{this.state.fecha}</Text>
    <Button
          title="enviardatos"
          onPress={() => {this.enviar()}}
        />
      </View>
      <DialogInput isDialogVisible={this.state.isDialogVisible}
            title={'Ingresa tu usuario'}
           
            hintInput ={"Brayan"}
            submitInput={ (inputText) => {this.usuario(inputText)} }
            
            >
</DialogInput>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
}});