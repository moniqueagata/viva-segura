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
  },

  subtitulo:{
    fontSize: 15,
    color: '#808080',
    textAlign: 'center',
    marginBottom: 10,
  },

  viewAtencao:{
    width:'90%',
    height: 70,
    flexDirection:'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor:'#f5effb',
    borderRadius: 8,
  },

  textAlerta:{
    fontSize: 13,
    color:'#510da0',
    fontWeight: 300,
    paddingHorizontal: 33,
  },
  
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
  },

  btnPurple: {
    backgroundColor: '#6925b8', 
    width: '80%',
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
 
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 5,
  },

   logo: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22
  },

  // Modal Sucesso
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

  modal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },

  textsModal: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: '20%'
  },

});