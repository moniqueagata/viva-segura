import { StyleSheet } from "react-native";

export default StyleSheet.create({

  header: {
    width: '100%',
    height: 88,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 30,
  },

  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43af86',
    paddingLeft: 10
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

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 22,
  },

  scroll: {
    width: '100%',
  },

  // Card de solicitação
  cardSolicitacao: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d4ddda',
    borderRadius: 20,
    marginVertical: '5%',
    borderWidth: 1,
  },

  fotoSolicitacao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4B0082',
  },

  btnAceitar: {
    flex: 1,
    height: 38,
    backgroundColor: '#87D3B6',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnRecusar: {
    flex: 1,
    height: 38,
    backgroundColor: '#d13f3f',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Card de compartilhamento de rota
  cardRota: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d4ddda',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5faf8',
    padding: 10,
    borderRadius: 15,
  },

  fotoUsuaria: {
    width: 35,
    height: 35,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    borderWidth: 1,
    borderColor: '#318f7b',
    overflow: 'hidden'
  },

  mapPlaceholder: {
    width: '50%',
    height: 110,
    backgroundColor: '#ddd',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
  },

  button: {
    width: 150,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87D3B6',
    borderRadius: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  }
})