import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  header: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 22,
    paddingTop: 22,
    gap: 20,
  },

  buttonExit: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fff",
    borderRadius: '100%',
    position: 'absolute',
    zIndex: 999,
    top: 30,
    left: 15,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingVertical: 22,
  },

  mapa:{
    flex: 1, 
    width: '100%',
    height: '100%',
    position: 'absolute'
  },

  painel:{
    width: '100%',
    height: 500,
    backgroundColor:'#fff',
    position:'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

});