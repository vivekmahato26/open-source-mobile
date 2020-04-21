import React from 'react';

import {View, TextInput, Image} from 'react-native';

import {headerCss} from '../../constants/styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const header = (props) => {
  return (
    <>
      <View style={headerCss.container}>
    <TouchableWithoutFeedback onPress={() => props.nav.navigate('Login')} >

      <Image
        style={headerCss.profile}
        source={{
          uri:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABCUlEQVR4Ae3XAWbEUBCA4SIoggKCYrEoIAcoAvQ4RVEEsOgBFhDAQwFFURTBIugBiuKhKPYAi2D6o2Apm+clM8v8fABkMjzmwvM8z/Myt8YGA+KfHi0qmK3AFiPkHwe0Vj++h5wowFQdZKIWJqohCQ6ozvXvm9pChCTqoZ4gVTz3Ab6h3g8k0QD1AiTRBuo1kAQj1jDRK2SiLcxU4nPi81nAVOWJm+hQwGwNwtHrFNGhhud5Bitxh0cEDIhHdujwgAaXUG2FFh8YEw+aHe5RYbEavEMyGvGCGrN1jTfIzAKukLVb7CELibhBllbYQxb2lWsTzxAlT9oXF6B8sYkyH0Bm4gN4nud53i+TFga0z0JKSQAAAABJRU5ErkJggg==',
        }}
      />
      </TouchableWithoutFeedback>
        <TextInput style={headerCss.search} placeholder="Search" />
        <Image
        style={{...headerCss.profile,borderWidth:0}}
        source={{
          uri:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAA4UlEQVR4Ae3agQUCQBiG4RBCA7RRA4QAARqgQRoghEYIITRACCFAAzTE9QMQf5yk7p6Xb4EHd44bNJ0kScPYInaM3WPlz3eJbWLTT+BMYudYaXTb2DhW3SlWGt+hFmcZK51sVgO07whoXwP06AjoXgNUOhsgQIAAAeoZ6NcCBAgQIECA6ueaBwTIGQQIECBAgAC55gEBcgYBAgQIECBATQ0QIECAAAFqYDdA+XaA8s2rgHwiB3SJTQC97hpbxUbfeuytBx0GJw9OHpy89zjKcZTjKMfRexzlOMpx9Oc4kiTpCZz83rGbZIuuAAAAAElFTkSuQmCC',
        }}
      />
      </View>
      
    </>
  );
};

export default header;
