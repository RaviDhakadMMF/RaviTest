import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import Stripe from 'react-native-stripe-api'
export default class StripPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            expMonth: '',
            expYear: '',
            cvc: '',
            animating: true,
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({
            animating: false
        }), 100)
    }  
    payment = () => {
        const apiKey = 'sk_test_ZuM41ks799dsO8jE8o2cl4G1';
        const client = new Stripe(apiKey);
        if (this.state.number == '') {
            Alert.alert('Please enter card number')
        } else if (this.state.expMonth == '') {
            Alert.alert('Please enter expMonth')
        } else if (this.state.expYear == '') {
            Alert.alert('Please enter expYear')
        } else if (this.state.cvc == '') {
            Alert.alert('Please enter Cvc')
        } else {
            console.log('Card number ',this.state.number)
            this.setState({ animating: true });
            client.createToken({
                number: this.state.number,
                exp_month: this.state.expMonth,
                exp_year: this.state.expYear,
                cvc: this.state.cvc,
                address_zip: '12345'
            }).then((res) => {
                if (res.id) {
                    Alert.alert('Success')
                }

                if (res.error.code) {
                    Alert.alert(res.error.message)
                }
                this.setState({ animating: false });
            }).catch((e) => {
                console.log('Error :', e.error)
                this.setState({ animating: false });
            })
        }  
        }
        render() {
            return (

                <View style={styles.container}>
 
                    <ScrollView >
                   
                        <View style={styles.container1}>
                        
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Credit Card No."
                                keyboardType='numeric'
                                onChangeText={TextInputValue => this.setState({ number: TextInputValue })}
                                underlineColorAndroid="transparent" />

                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Exp month"
                                keyboardType='numeric'
                                onChangeText={TextInputValue => this.setState({ expMonth: TextInputValue })}
                                underlineColorAndroid="transparent" />

                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Exp Year"
                                keyboardType='numeric'
                                onChangeText={TextInputValue => this.setState({ expYear: TextInputValue })}
                                underlineColorAndroid="transparent" />

                            <TextInput
                                style={styles.textInputStyle}
                                placeholder="Cvc"
                                keyboardType='numeric'
                                onChangeText={TextInputValue => this.setState({ cvc: TextInputValue })}
                                underlineColorAndroid="transparent" />

                            <TouchableOpacity onPress={this.payment}>
                            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'blue',height:50}}>
                                <Text  style={{fontSize:16,color:'white' }}> Add Card</Text>
                                </View>
                            </TouchableOpacity>
                            <ActivityIndicator style={styles.activityIndicator}
                        animating={this.state.animating}
                        color='#1e8af1'
                        size="large"/> 
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
        activityIndicator:{ 
            position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,alignItems: 'center',justifyContent: 'center'
    }
    });