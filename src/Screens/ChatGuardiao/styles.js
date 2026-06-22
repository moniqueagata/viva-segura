import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8
  },

  header: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  tituloHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#66b697',
  },

  scroll: {
    width: '100%'
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 22,
  },

  subtitle: {
    fontSize: 18,
    marginLeft: 16,
    marginTop: 5,
    color: "#6f6f6f",
  },
  
  chatCard: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F6', 
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative', 
  },
  
  avatarPlaceholder: {
    width: 57,
    height: 57,
    borderRadius: 32,
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
  },
  
  textContainer: {
    flex: 1,
    paddingLeft: 5, 
    justifyContent: 'center',
    gap: 3
  },

  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#66b697', 
  },
  
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93', 
    fontWeight: '400',
  },
  
  statusText: {
    position: 'absolute',
    top: 18,
    right: 18,
    fontSize: 13,
    color: '#AEAEB2',
  },
});