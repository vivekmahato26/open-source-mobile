import React, {Component} from 'react';
import {View, Text, TextInput, Image, Button, ScrollView} from 'react-native';

import {Form, standard} from '../../constants/styles';
import colors from '../../constants/colors';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <>
        <View
          style={{
            ...standard.flexRow,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: colors.primary,
          }}>
          <Text style={{color: colors.white}}>LOGIN</Text>
        </View>
        <ScrollView>
          <View style={Form.container}>
            <View style={Form.imgContainer}>
              <Image
                style={Form.img}
                source={{
                  uri:
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACgUlEQVR4Ae3cAWQjQRiG4cNiERyKoCgKgACCIAAcoIDgEMChKA5BEUBQBIcAFrAoCiiCYHEACIJFEBRFEQR/XwQUs9bsdpLM9/IAKL5qp/3JD6WUUuoMusYY//CMAuXRCjnmGOEKqoF+YoIVrIYDXnGPFDVTKf7iHeZphzESkKrqF7awhq3RhyM1gbXogN/4kuogg32TGRKoYznsm81A6hEWhn4c3cFqeMMCd+jj5miAETJ81Pyd0I/5jf9W4yn5BwmqSvFY4wm7RoLomsKq4AUd1K2LAlYFY0RVF3tYhSfP784UOazCDimi6QlW4RlNlKKAVbhHNG1gDht00FRdvMMcXhFFvSDPw+rn7gFX0f+7ARu0UVr1RMUIF98LzGGKtspgDnNcfP9hDgO01QjmkOPi28IcrtFWA5jDChefubXaDcyh1ADn+PU1gAbQABpAA2gADaABNIAG0AC3mKJACTtzJZaYoIuTLcEMB9iF2uMBJ1eCJSwSGU6qOSwyDyd14YrQHl0EbwGL1ATBK2GRWiJ4FrHyDAbQH44aQANoAA2gATSABtAAGkADaAANoAE0gAbQABqgmZuz/81WA/jfnN03Ww0Q4Oacoak0AM3D3Ww1QC/szVYDLMLebDVAGfZmqwFC32w1gIetBvBv5zFAoQH8yzwGmGoA/4YeH1F5qwGaKQ/4qYgagDpY13x+JhoAaKoOcliFORKQBkDjDZF9eR2VWKAHZxogfBpAA2gADaABNIAG0AAaQANoAA2gATSABtAAHmmAiG0RvB0sUgWCl8EiNUXwhrD4OG7OAcphkZkhUI6bbQSavTkHuNmetAA35/ZvtueqjZuzUkoppZRSSn0CzbsUo5qyTqkAAAAASUVORK5CYII=',
                }}
              />
            </View>
            <TextInput
              style={Form.textInput}
              placeholder="E-mail"
              onChange={e => this.setState({email: e.nativeEvent.text})}
              value={this.state.email}
            />
            <TextInput
              style={Form.textInput}
              placeholder="Password"
              textContentType="password"
              onChange={e => this.setState({password: e.nativeEvent.text})}
              value={this.state.password}
            />
            <Button title="Login" color={colors.like} />
            <View
              style={{
                padding: 10,
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <Text onPress={() => this.props.navigation.navigate('Register')}>
                Don't have an account? Register
              </Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

export default Login;
