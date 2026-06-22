import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    backgroundColor: '#6925b8',
    borderRadius: 4
  },

  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titulo:{
    color: '#3f0088',
    fontSize: 22,
    fontWeight: '500',
    marginTop: '10%',
  },

  // Foto de Perfil
  photoUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    position:  'relative',
    marginVertical: 30
  },

  upload: {
    width: 200,
    height: 200,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    borderWidth: 1,
    borderColor: '#a460f1',
    overflow: 'hidden',
  },

  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  subtitulo: {
    fontSize: 16,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 10,
  },
 
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
  },

  btnPurple: {
    backgroundColor: '#6925b8', 
    width: '90%',
    height: 50,
    borderRadius: 35, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  txWhite: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
  },

  link: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },

  txGrey: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '400',
  },

  // Modal
  modalContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
    margin: 0,
  },

  modal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },

  modalSucesso: {
    width: '100%',
    height: 800,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
    margin: 0,
  },

  textsModal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: '20%'
  },

  buttonModal: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 15
  },

  txRed: {
    color: '#c04b4b',
    fontSize: 17,
    fontWeight: '400',
  },

  txButton: {
    color: '#717171',
    fontSize: 17,
    fontWeight: '400',
  },

});