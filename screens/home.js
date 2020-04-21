import React from 'react';

import {View, Button} from 'react-native';

import Footer from '../components/helpers/footer';
import Header from '../components/helpers/header';
import Project from '../components/project/project';

const Home = ({navigation}) => {
  return (
    <>
      <Header nav={navigation} />
      <View style={{marginTop: 60, marginBottom: 70, padding: 0}}>
        <Project nav={navigation} />
      </View>
      <Footer nav={navigation} />
    </>
  );
};

export default Home;
