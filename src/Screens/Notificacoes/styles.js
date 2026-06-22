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

  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  
});