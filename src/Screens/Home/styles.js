import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
    paddingTop: 8,
  },

  header: {
    width: '100%',
    height: 88,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 30,
  },

  upload: {
    width: 47,
    height: 47,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    overflow: 'hidden'
  },

  textHeader:{
    fontSize: 16,
    fontWeight: '700',
    color: "#550fa4",
    paddingLeft: 10,
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingVertical: 22,
    gap: 5,
  },
 
  subtitulo:{
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 20,
    textAlign:'center',
    color: '#724d9c',
  },

  // Botão SOS
  buttonSos: {
    backgroundColor: '#fff',
    width: 175,
    height: 175,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#ff8da9",
    marginVertical: '4%',
  }, 

  circle: {
    backgroundColor: "#ff8da9",
    width: 160,
    height: 160,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: 'center',
  },
  // -------

  desc: {
    fontSize: 13, 
    color: "#888", 
    textAlign: "center", 
    marginVertical: '3%', 
    lineHeight: 18
  },
    
  button: {
    backgroundColor: 'transparent',
    width: '85%',
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 22,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection:'row',
    gap: 12,
  },

  // Navegação
  navegacao: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#6925b8',
    paddingBottom: 3,
    paddingHorizontal: 10
  },

  line: {
    height: 4,
    backgroundColor: '#ff80aa',
    borderRadius: 2,
    top: 0,
    left: 0,
    position: 'absolute',
  },

  buttonNav: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  textNav: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff'
  },
});