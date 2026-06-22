import { StyleSheet, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    backgroundColor: "#550FA4",
    width: '100%',
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 22,
    paddingTop: 22,
    gap: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingVertical: 22,
  },

  scroll: {
   width: '100%', 
  },

  mapa:{
    flex: 1, 
    width: '100%',
  },

  pinFixoContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1,
  },

  // Painel
  painel:{
    width: '100%',
    height: SCREEN_HEIGHT * 0.80,    
    backgroundColor:'#fff',
    position:'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 100,
  },

  puxador: {
    width: '10%',
    height: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },

  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 18,
    paddingRight: 5,
    marginVertical: '5%',
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
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6925b8',
    borderRadius: 30
  },

  card: {
    width: '100%',
    height: 77,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: '5%',
    paddingHorizontal: 12,
  },

  icone: {
    width: 58,
    height: 58,
    backgroundColor: '#faf7fd',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  listaTitulo: {
    width: '100%',
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },

  cardTitulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#550FA4',
  },

  cardSubtitulo: {
    fontSize: 12,
    color: '#888',
  },

  miniCard: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6,
    shadowColor: '#0000008a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  miniCardTexto: {
    flex: 1,
    fontSize: 13,
    color: '#555',
    marginRight: 10,
  },

  miniCardBtn: {
    backgroundColor: '#6925b8',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  miniCardBtnTexto: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    zIndex: 100,
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 22,
    paddingBottom: 30,
    gap: 8
  },

  modalTitulo: {
    fontSize: 16,
    color: '#454545',
    fontWeight: '500',
    marginVertical: '4%',
    paddingLeft: 5,
  },

  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  chipAtivo: {
    borderColor: '#6925b8',
  },

  chipTexto: {
    fontSize: 13,
    color: '#999',
  },

  chipTextoAtivo: {
    color: '#6925b8',
    fontWeight: '500',
  },

  modalInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },

  btnConcluir: {
    backgroundColor: '#6925b8',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  btnConcluirTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  modalCancelar: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },

});