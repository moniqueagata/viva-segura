import { StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  
  header: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
  },

  barra: {
    flex: 1,
    height: 8,
    backgroundColor: '#e7e7e7',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: '16%'
  },

  barraPurple: {
    height: '100%',
    width: '100%',
    backgroundColor: '#3fc8b3',
    borderRadius: 4,
    
  },

  logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22
  },

  subtitulo: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 10,
  },

  inputsContainer: {
    gap: 20,
    alignItems: 'center',
    width: '100%'
  },

  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,  
    marginTop: 10
  },

  btnPurple: {
    backgroundColor: '#3fc8b3', 
    width: '80%',
    height: 50,
    borderRadius: 35, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  txWhite: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },

});