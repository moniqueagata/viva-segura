import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10
  },

  header: {
    height: 88,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 15
  },

  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  
  // Área de Mensagens
  chatArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatContent: {
    padding: 20,
  },
  bubble: {
    borderRadius: 25,
    marginBottom: 20,
    position: 'relative',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0D6FF', // Cor Lavanda da imagem
    borderBottomLeftRadius: 5,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#D7F5EC', // Cor Verde Água da imagem
    borderBottomRightRadius: 5,
  },
  // Pequenas pontas das bolhas (caudas)
  bubbleTailLeft: {
    position: 'absolute',
    bottom: 0,
    left: -5,
    width: 15,
    height: 15,
    backgroundColor: '#E0D6FF',
    borderBottomLeftRadius: 5,
    zIndex: -1,
  },
  bubbleTailRight: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    width: 15,
    height: 15,
    backgroundColor: '#D7F5EC',
    borderBottomRightRadius: 5,
    zIndex: -1,
  },
  // Digitando...
  typingBubble: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    width: 65,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 2.5,
  },
  // Footer com TextInput funcional
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#F9FAFB',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  plusIconButton: {
    marginLeft: 10,
  },
  plusIconText: {
    fontSize: 32,
    color: '#4B0082',
    fontWeight: '300',
  },
  sendCircleButton: {
    width: 55,
    height: 55,
    backgroundColor: '#87D3B6', // Verde água do botão
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sendIconArrow: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -4, // Ajuste para a seta subir um pouco como na imagem
  },
});