import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,Alert, TouchableOpacity,Image } from 'react-native';
import { GoogleSignin, GoogleSigninButton  } from 'react-native-google-signin';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
export default class SignUpPage extends Component {

    constructor(props){
        super(props);
    }
    componentDidMount() {
         GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
            console.log('Play service error1 : - ' + "success")
        }).catch((err) => {
            console.log('Play service error2 : - ' + err.code, err.message)
        })
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: "44728210582-f9lvp2c5lsh5mm182a2o083htn6gbj6u.apps.googleusercontent.com"
        });
    }
    //********************* GOOGLE LOGIN ***************************** */
   
    googleAuth = () => {
        
        GoogleSignin.signIn().then((user) => {
            Alert.alert('Success :- '+user)
            console.log('user token google ,', JSON.stringify(user))
        }).catch((err) => {
            Alert.alert('Error :- '+err)
            console.log('WRONG SIGNIN', err);
        }).done();
    }

    //******************F ACEBOOK LOGIN *************************** */
    _fbAuth = () => {
           LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
            if (result.isCancelled) {
                console.log('Login was cancelled ');  
                Alert.alert('Login was cancelled') 
            } else {

                AccessToken.getCurrentAccessToken().then((data) => {
                    const { accessToken } = data
                    Alert.alert('Login was Success ' )
                    console.log('Login accessToken123 : - ' + accessToken);
                   
                }).catch((err) => {
                    console.log('WRONG SIGNIN', err);
                    console.log('WRONG SIGNIN : - ' + err);
                })
            }
        }, function (error) {
            console.log('An error occured: ' + error);
        })
    }

    stripePage=()=>{
        this.props.navigation.navigate('StripPageScreen')   
    }
    render() {
        return (

            <View style={styles.container}>


                <ScrollView >
                    <View style={styles.container1}>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Name"
                            onChangeText={TextInputValue => this.setState({ full_name: TextInputValue })}
                            underlineColorAndroid="transparent" />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Contact No."
                            keyboardType='numeric'
                            onChangeText={TextInputValue => this.setState({ full_name: TextInputValue })}
                            underlineColorAndroid="transparent" />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="DOB"
                            onChangeText={TextInputValue => this.setState({ full_name: TextInputValue })}
                            underlineColorAndroid="transparent" />

                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="Email"
                            onChangeText={TextInputValue => this.setState({ full_name: TextInputValue })}
                            underlineColorAndroid="transparent" />


                        <GoogleSigninButton
                            style={{ width: 192, height: 48 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.googleAuth}
                             />

                              <TouchableOpacity onPress={this._fbAuth}>
                        <Image style={{ width: 50, height: 50, marginLeft: 1 }} source={require('../src/img/fbicon.png')} />
                    </TouchableOpacity>

                     <TouchableOpacity onPress={this.stripePage}>
                     <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'blue',height:50}}>
                      <Text style={{fontSize:16,color:'white' }}> STRIPE</Text>
                  </View>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container1: {
        marginTop: 40, marginLeft: 15, marginRight: 15
    },
    textInputStyle: {
        borderColor: '#e7e9ea',
        borderWidth: 1,
        backgroundColor: '#ffffff',
        paddingLeft: 15, marginTop: 15, height: 50
    },

});