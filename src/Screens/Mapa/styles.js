import { StyleSheet, Dimensions} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal Topo -> cálculo de trajeto e compartilhamento
  modalContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 999,
  },

  modalTopo: {
    backgroundColor: '#fff',
    width: '100%',
    maxHeight: 190,
    borderRadius: 15,
    paddingHorizontal: 19,
    paddingVertical: 15,
    alignItems: 'flex-start',
    elevation: 8,
    shadowColor: '#0000008a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  
  contentModal: {
    width: '100%',
    paddingHorizontal: 8,
    gap: 5,
  },

  endereço: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6925b8',
  },

  kmTempo: {
    fontSize: 14,
    fontWeight: '500',
    color: '#aaa',
  },

  btnCompartilhar: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    lineHeight: 17
  } , 

  button: {
    width: 140,
    height: 40,
    backgroundColor: '#6925b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },

  txWhite: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff'
  },

  // Foto/Avatar -> guardiões
  avatar: {
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  // ---------

  content: {
    flex: 1,
    width: '100%',
  },

  circle: {
    width: 36,
    height: 36,
    backgroundColor: '#eee',
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#895ad4'
  },

  scroll: {
    width: '100%',
  },

  painel: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.50,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent:  'flex-start',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  contentPainel: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '4%',
    justifyContent: 'space-between',
    paddingBottom: 20
  },

  puxador: {
    width: '10%',
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7
  },

  inputContainer: {
    width: '84%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    gap: 10,
  },

  input: {
    width: '75%',
    height: 50,
    backgroundColor: 'transparent',
    paddingRight: 10,
    fontSize: 15,
    color: '#505050',
  },

  btnSearch: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6925b8',
    borderRadius: 19
  },

  // Foto de perfil
  photoUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    position:  'relative',
  },

  upload: {
    width: 50,
    height: 50,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    overflow: 'hidden'
  },

  lista: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10
  },

  card: {
    width: '100%',
    minHeight: 100,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 17,
    gap: 5
  },

  subtitulo: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6925b8',
  },

  nomeLocal: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6925b8',
  },

  // Navegação
  navegacao: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#6925b8',
    paddingBottom: 3,
    paddingHorizontal: 10
  },

  line: {
    height: 4,
    backgroundColor: '#ff80aa',
    borderRadius: 2,
    top: 0,
    left: 0,
    position: 'absolute',
  },

  buttonNav: {
    width: 66,
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

  // Modal -> seleção de guardiões
  overlayModal: {
    width: '100%',
    maxHeight: 460,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0,
    margin: 0,
  },

  modal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  modalSubtitulo: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454545',
    textAlign: 'center',
    marginVertical: '8%'
  },

  cardGuardiao: {
    width: '100%',
    height: 77,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 8,
    gap: 15
  },

  fotoGuardiao: {
    width: 57,
    height: 57,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    overflow: 'hidden'
  },

  nomeGuardiao: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888'
  },

  toogle: {
    width: 22,
    height: 22,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
  },

  btnConcluir: {
    width: 150,
    height: 45,
    backgroundColor: '#6925b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginVertical: '7%',
  },


});
