import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  card: {
    width: '100%',
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 8,
  },

 tituloCard: {
    fontSize: 16,
    fontWeight: 700,
    color: "#50198f",
  },

  numero: {
    color: "#999",
    fontSize: 15,
    fontWeight: 500,
  },

});