import colors from './colors';

import {StyleSheet} from 'react-native';

const container = {
  flex: 1,
  width: 100,
  justifyContent: 'space-between',
  backgroundColor: colors.primary,
  padding: 20,
  margin: 10,
};

export const Form = StyleSheet.create({
  container: {
    ...viewShadow,
    flex: 0,
    flexDirection: 'column',
    padding: 20,
    margin: 20,
    marginTop: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    alignContent: 'center',
    backgroundColor: colors.secondary
  },
  imgContainer : {
    alignSelf: 'center',
    marginBottom: 20,
    borderColor: colors.like,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: colors.like,
    padding: 5,
  },
  img: {
    height: 50,
    width: 50,
    tintColor: colors.white
  },
  textInput: {
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom:10
  }
})

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignContent: 'center',
};
export const viewShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,

  elevation: 6,
};

const img = {
    height: 30,
    width: 30    
}

export const standard = StyleSheet.create({
  img,
  flexRow
})

export const line = StyleSheet.create({
  css: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
});
export const footerCss = StyleSheet.create({
  container: {
    ...container,
    ...flexRow,
    width: '100%',
    margin: 0,
    borderTopRightRadius: 5,
    position: 'absolute',
    bottom: 0,
    justifyContent:'space-around'
  },
  buttons: {
      ...img,
    tintColor: colors.actionButton
  }
});

export const headerCss = StyleSheet.create({
  container: {
    ...container,
    width: '100%',
    ...flexRow,
    padding: 10,
    margin: 0,
    position: 'absolute',
    top: 0,
    justifyContent: 'space-around',
  },
  profile: {
    ...img,
    tintColor: colors.actionButton,
    borderColor: colors.actionButton,
    borderRadius: 25,
    borderWidth: 2.5,
  },
  search: {
    flexDirection: 'row',
    height: 40,
    width: '60%',
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 20,
  },
});

export const projectCard = StyleSheet.create({
  container: {
    ...container,
    elevation: 3,
    width: '100%',
    backgroundColor: colors.secondary,
    ...viewShadow
  },
  title: {
    ...flexRow,
    padding: 10,
  },
  categoryContainer:{
      ...flexRow,
      justifyContent:'center',
      borderColor: colors.linkText,
      borderWidth: 2,
      borderRadius: 20,
      padding:5,
      alignContent:'flex-start',
      backgroundColor: colors.disabled
  },
  category: {
    color: colors.linkText,
    
  },
  categoryImg: {
      ...img,
      tintColor: colors.linkText,
      marginEnd: 5
  },
  tag: {
    ...flexRow,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagItem: {
    color: colors.linkText,
    paddingEnd: 10,
  },
  actions: {
    ...flexRow,
    justifyContent: 'space-evenly',
  },
  actionImg: {
    height: 40,
    width: 40,
    tintColor: colors.like,
  },
});
