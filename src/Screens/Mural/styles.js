import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 22 },
  cabecalho: { width: '100%', height: 88, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, paddingTop: 30, marginBottom: 10 },
  titulo: { fontSize: 16, fontFamily: 'Poppins_700Bold', fontWeight: 'bold', color: '#6925b8' },
  buscaContainer: { width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, marginBottom: 25},
  buscaInput: { flex: 1, fontFamily: 'Poppins_400Regular', color: '#454545' },

filtrosWrapper: { marginHorizontal: -22, marginBottom: 14 },
  filtrosContainer: { paddingHorizontal: 22, gap: 10 },
  filtroChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#f4f2fa' },    filtroTexto: { fontSize: 12, fontFamily: 'Poppins_500Medium', color: '#666' },

  filtroChipAtivo: { backgroundColor: '#6925b8' },
  filtroTextoAtivo: { color: '#fff' },

  lista: { paddingBottom: 30, gap: 14 },
  card: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#eee', borderLeftWidth: 4, padding: 14 },
  cardEyebrow: { fontSize: 10, fontFamily: 'Poppins_700Bold', letterSpacing: 1 },
  cardTitulo: { fontSize: 16, fontFamily: 'Lora_600SemiBold', color: '#220049', lineHeight: 22, marginTop: 6, marginBottom: 10 },

  cardAssinatura: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  cardAvatar: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  cardAvatarTexto: { fontSize: 9, fontFamily: 'Poppins_700Bold' },
  cardAssinaturaTexto: { fontSize: 11, fontFamily: 'Poppins_400Regular', color: '#888' },
  cardAssinaturaPonto: { fontSize: 11, color: '#ccc' },

  cardAcoes: { flexDirection: 'row', gap: 18, borderTopWidth: 1, borderTopColor: '#f5f5f5', paddingTop: 10 },
  cardAcaoBtn: { padding: 2 },

  vazio: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80, gap: 12 },
  vazioTexto: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#aaa' },
  erroTexto: { fontSize: 14, fontFamily: 'Poppins_400Regular', color: '#993556', textAlign: 'center', marginTop: 30 },

  menuOverlay: { flex: 1, backgroundColor: 'hsla(0, 0%, 0%, 0.45)', flexDirection: 'row' },
  menuPainel: { width: '75%', height: '100%', backgroundColor: '#fff', padding: 22,},
  menuTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  menuTitulo: { fontSize: 25, fontFamily: 'Poppins_700Bold',  fontWeight: 'bold', color: '#6925b8' },
  menuFechar: { fontSize: 20, color: '#999' },
  menuSecao: { fontSize: 13, fontFamily: 'Poppins_500Medium', color: '#6925b8', marginTop: 10, marginBottom: 8 },
  menuItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  menuItemTexto: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: '#444' },
  menuVazio: { fontSize: 12, fontFamily: 'Poppins_400Regular', color: '#bbb' },


});