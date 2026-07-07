import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6c27a8",
  },

  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 22,
    gap: 5,
  },

  card: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  fotoBox: {
    marginRight: 12,
  },

  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  status: {
    color: "#56CDA6",
    fontWeight: "600",
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#6c27a8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  info: {
    marginTop: 10,
    color: "#666",
    fontSize: 13,
  },

  actions: {
    flexDirection: "row",
    marginTop: 14,
    gap: 10,
  },

  btnSecundario: {
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6c27a8",
    alignItems: "center",
  },

  btnPrincipal: {
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: "#6c27a8",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },

  btnTextSec: {
    color: "#6c27a8",
    fontWeight: "bold",
  },
});