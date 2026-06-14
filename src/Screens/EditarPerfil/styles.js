import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  header: {
    width: '100%',
    height: 88,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 22,
    paddingTop: 8,
    gap: 36
  },

  buttonHeader: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  tituloHeader: {
    fontSize: 20,
    fontWeight: '500',
    color: '#6925b8'
  },

  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Foto de Perfil
  photoUpload: {
    alignItems: 'center',
    justifyContent: 'center',
    position:  'relative',
    marginVertical: 10
  },

  upload: {
    width: 180,
    height: 180,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    borderWidth: 3,
    borderColor: '#6925b8',
    overflow: 'hidden',
  },

  edit: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6925b8',
    borderRadius: '100%',
    position: 'absolute',
    bottom: 0,
    right: 5
  },
  // ----

  gridInputs: {
    width: '95%',
    minHeight: 400,
    marginVertical: '10%'
  },

  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#bbb',
    paddingLeft: 8,
    marginBottom: 8,
  },

  inputContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  input: {
    minWidth: 280,
    height: '100%',
    outlineStyle: 'none',
    fontSize: 15
  },

  buttonPurple: {
    width: '60%',
    height: 50,
    backgroundColor: '#6925b8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },

  textWhite: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff'
  },

  // Modal
  modalContainer: {
    width: '100%',
    height: 300,
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

  txPurple: {
    color: '#717171',
    fontSize: 17,
    fontWeight: '400',
  },
  
});