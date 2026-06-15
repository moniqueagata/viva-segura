import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    backgroundColor: '#F3F9F7',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  header: {
    width: '100%',
    height: 88,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 30
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4F1',
    padding: 10,
    borderRadius: 15,
  },

  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },

  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#43af86'
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
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8d5ff',
    shadowColor: '#6925b8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  fotoSolicitacao: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4B0082',
  },

  btnAceitar: {
    flex: 1,
    height: 38,
    backgroundColor: '#4B0082',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnRecusar: {
    flex: 1,
    height: 38,
    backgroundColor: '#ffeaea',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapPlaceholder: {
    width: '50%',
    height: 110,
    backgroundColor: '#E8E8E8',
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
    backgroundColor: '#4B0082',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  }
})