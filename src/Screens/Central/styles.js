import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 30,
    gap: 33
  },

  tituloHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6925b8',
  },

  scroll: {
    width: '100%',
  },

  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 22,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  tituloContainer: {
    width: '95%',
    marginTop: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#220049',
  },

  searchInput: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: '5%',
    paddingLeft: 18,
    paddingRight: 8
  },

  input: {
    width: '75%',
    outlineStyle: 'none',
  },

  btnEnviar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#6925b8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chat: {
    width: 230,
    height: 50,
    backgroundColor: '#6925b8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    gap: 10,
    marginVertical: '5%'
  },

  textChat: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff'
  },

  session: {
    width: '100%',
    minHeight: 200,
    gap: 16,
    marginVertical: 8,
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 9,
    color: '#220049',
    paddingLeft: 4,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
    paddingLeft: 5
  },

  categoria: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6925b8'
  },

  cardButtons: {
    width: '100%',
    paddingHorizontal: 8,
    gap: 5
  },

  button: {
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  textFaq: {
    fontSize: 16,
    fontWeight: '400',
    color: '#404040',
    lineHeight: 22
  },

  linha: {
    width: '100%',
    height: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 11,
  },

  textResposta: {
    fontSize: 15,
    fontWeight: '300',
    color: '#999',
    lineHeight: 22,
    paddingLeft: 18,
    marginVertical: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    gap: 12,
  },

  modalIcone: {
    fontSize: 40,
  },

  modalTitulo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#220049',
  },

  modalTexto: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },

  modalBotao: {
    marginTop: 8,
    backgroundColor: '#6925b8',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },

  modalBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});