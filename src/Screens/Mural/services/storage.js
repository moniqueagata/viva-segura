import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_FAVORITOS = "@mural_favoritos";
const CHAVE_CURTIDAS = "@mural_curtidas";

async function obterLista(chave) {
  try {
    const dados = await AsyncStorage.getItem(chave);
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    console.log("ERRO AO LER STORAGE:", e);
    return [];
  }
}

async function salvarLista(chave, lista) {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(lista));
  } catch (e) {
    console.log("ERRO AO SALVAR STORAGE:", e);
  }
}

export const obterFavoritos = () => obterLista(CHAVE_FAVORITOS);
export const obterCurtidas = () => obterLista(CHAVE_CURTIDAS);

export async function alternarFavorito(noticia) {
  const lista = await obterFavoritos();
  const existe = lista.some((n) => n.id === noticia.id);
  const novaLista = existe ? lista.filter((n) => n.id !== noticia.id) : [...lista, noticia];
  await salvarLista(CHAVE_FAVORITOS, novaLista);
  return novaLista;
}

export async function alternarCurtida(noticia) {
  const lista = await obterCurtidas();
  const existe = lista.some((n) => n.id === noticia.id);
  const novaLista = existe ? lista.filter((n) => n.id !== noticia.id) : [...lista, noticia];
  await salvarLista(CHAVE_CURTIDAS, novaLista);
  return novaLista;
}