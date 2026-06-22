import { StyleSheet } from 'react-native';

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
    paddingTop: 30,
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  subtitulo: {
    fontSize: 15,
    color: '#454545',
    textAlign: 'center',
    lineHeight: 20,
  },

  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#220b5c',
    marginBottom: 10,
    paddingLeft: 8
  },
  
  // Campo de senha
  campo: {
    width: '100%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 20,
    gap: 12,
  },

  campoIcone: {
    flexShrink: 0,
  },

  campoInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
  },

  requisitosLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6925b8',
    marginBottom: '5%',
  },

  requisitosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 33,
  },

  requisito: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  circuloOk: {
    backgroundColor: '#6925b8',
    borderColor: 'transparent',
  },

  requisitoTexto: {
    fontSize: 13,
    color: '#555',
    flexShrink: 1,
  },
  // Dica
  dica: {
    backgroundColor: '#f0eaff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  dicaTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#220b5c',
    marginBottom: 4,
  },

  dicaTexto: {
    fontSize: 13,
    color: '#7b6fa0',
    lineHeight: 20,
  },
  
  button: {
    backgroundColor: '#6925b8',
    height: 50,
    width: 130,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnSalvarDisabled: {
    opacity: 0.5,
  },

  btnSalvarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  btnCancelar: {
    color: '#bd3c3c',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});