import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
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
    gap: 33,
  },

  tituloHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6925b8',
  },

  scroll: {
    flex: 1,
    width: '100%',
  },

  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  // Data 
  coontainerData: {
    width: '100%',
    alignItems: 'center',
    marginVertical: '8%'
  },

  data: {
    fontSize: 15,
    fontWeight: '300',
    color: '#6925b8'
  },

  containerMensagem: {
    marginVertical: 5,
    maxWidth: '100%',       
  },

  // Balões de mensagem
  balao: {
    maxWidth: '100%',
    minHeight: 50,
    padding: 14,
    marginBottom: 10,
    borderRadius: 22,
    justifyContent: 'center'
  },

  balaoD: {
    backgroundColor: '#ab83eb',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },

  textWhite: {
    fontSize: 16,
    fontWeight: '300',
    color: '#fff'
  },

  balaoE: {
    backgroundColor: '#fafafa',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },

  textBlack: {
    fontSize: 16,
    fontWeight: '300',
    color: '#454545'
  },
  // ------

  // Hora 
  horario: {
    fontSize: 13,
    fontWeight: '300',
    color: '#999',
  },
  // -----

  inputBar:{
    width: '100%',
    height: 80,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 10
  },

  input: {
    width: '85%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    outlineStyle: 'none'
  },

  send: {
    width: 50,
    height: 50,
    backgroundColor: '#6925b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%'
  }

  
});