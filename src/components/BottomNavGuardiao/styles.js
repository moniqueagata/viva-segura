import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  navegacao: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#8ce2c1',
    paddingBottom: 3,
    paddingHorizontal: 10
  },

  line: {
    height: 4,
    backgroundColor: '#560192',
    borderRadius: 2,
    top: 0,
    left: 0,
    position: 'absolute',
  },

  buttonNav: {
    width: 80,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  textNav: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff'
  },

});
