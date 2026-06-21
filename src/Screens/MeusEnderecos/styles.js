import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffffff',
  },

  header: {
    backgroundColor: "#550FA4",
    width: '100%',
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 22,
    paddingTop: 22,
    gap: 20,
  },

  titulo: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingVertical: 22,
  },

  subtitulo: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 400,
    color: "#454545",
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: '10%'
  },

  button:{
    width: 140,
    height: 40,
    backgroundColor:"#550FA4",
    borderRadius:20,
    paddingHorizontal: 15,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },

  txWhite:{
    fontSize: 15,
    fontWeight: '500',
    color:'#fff',
  },
  

card: {

    flexDirection: "row",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
   
    width:'90%',
    height:190,
    marginLeft:'5%',
    marginTop:30,
  },

  mapa: {
    width: '50%',
    marginLeft:10,
    height: 150,
    backgroundColor: "#000000",
    borderRadius:5,
    marginTop:20,
  },



tituloCasa: {
    fontSize: 17,
    fontWeight: 700,
    color: "#6A0DAD",
    marginLeft:15,
    marginTop:25,
    width:'45%'
  },

  text: {
    fontSize: 15,
    color: "#888",
    marginTop: 5,
    marginLeft:15,
position:'absolute',
marginLeft:'57%',
marginTop:'16%',
width:'45%'
  },
  viewFlex:{
   flexDirection:'row', 
   justifyContent:'center',

  },
  imagemI:{
    width:12,
    height:12,
    marginTop:20,
    marginLeft:5,
  },
  pontos:{
    fontSize:30,
    color:'#B6B6B6',
    position:'absolute',
    bottom:10,
   right:30,

  },

});