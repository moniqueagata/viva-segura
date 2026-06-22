import axios from "axios";

export const CATEGORIAS = [
  { id: "todas", label: "Todas", emoji: "📰", cor: "#6925b8", corClara: "#f0eefb", query: '(violência OR direitos OR segurança OR campanha OR "saúde mental") mulher' },
  { id: "seguranca", label: "Alertas de Segurança", emoji: "🚨", cor: "#6925b8", corClara: "#f0eefb", query: '(golpe OR fraude OR "Defesa Civil" OR "alerta de segurança") mulher' },
  { id: "direitos", label: "Direitos da Mulher", emoji: "⚖️", cor: "#993556", corClara: "#fdeef4", query: '("Lei Maria da Penha" OR "medida protetiva" OR assédio OR "direitos da mulher")' },
  { id: "rede_apoio", label: "Rede de Apoio", emoji: "📍", cor: "#185fa5", corClara: "#e6f1fb", query: '("Delegacia da Mulher" OR "Ligue 180" OR abrigo OR "centro de acolhimento") mulher' },
  { id: "bem_estar", label: "Bem-estar e Saúde Mental", emoji: "❤️", cor: "#d4537e", corClara: "#fbeaf0", query: '("saúde mental" OR ansiedade OR trauma OR autoestima) mulher' },
  { id: "educacao", label: "Educação e Prevenção", emoji: "🎓", cor: "#854f0b", corClara: "#faeeda", query: '("segurança digital" OR "golpe online" OR autoproteção) mulher' },
  { id: "campanhas", label: "Campanhas e Eventos", emoji: "📢", cor: "#3b6d11", corClara: "#eaf3de", query: '("Outubro Rosa" OR "Dia Internacional da Mulher" OR "Agosto Lilás" OR campanha) mulher' },
];

const RSS2JSON_ENDPOINT = "https://api.rss2json.com/v1/api.json";

function montarUrlGoogleNews(query) {
  const params = `q=${encodeURIComponent(query)}&hl=pt-BR&gl=BR&ceid=BR:pt-BR`;
  return `https://news.google.com/rss/search?${params}`;
}

function tempoRelativo(dataPub) {
  if (!dataPub) return "";
  const diffMs = Date.now() - new Date(dataPub).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `há ${Math.max(diffMin, 1)} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `há ${diffH}h`;
  const diffDias = Math.floor(diffH / 24);
  return `há ${diffDias} dia${diffDias > 1 ? "s" : ""}`;
}

function leituraEstimada(titulo) {
  // Estimativa aproximada (não temos o corpo da notícia, só o título)
  const palavras = titulo.split(" ").length;
  const minutos = Math.max(1, Math.round(palavras / 8));
  return `leitura ${minutos} min`;
}

function iniciaisFonte(fonte) {
  if (!fonte) return "?";
  const partes = fonte.trim().split(" ").filter(Boolean);
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
  return (partes[0][0] + partes[1][0]).toUpperCase();
}

export async function buscarNoticias(categoriaId = "todas", termoBusca = "") {
  const categoria = CATEGORIAS.find((c) => c.id === categoriaId) || CATEGORIAS[0];
  const query = termoBusca ? `${categoria.query} ${termoBusca}` : categoria.query;
  const rssUrl = montarUrlGoogleNews(query);

  const response = await axios.get(RSS2JSON_ENDPOINT, {
    params: { rss_url: rssUrl },
  });

  if (response.data.status !== "ok") {
    throw new Error("Não foi possível carregar as notícias agora.");
  }

  return response.data.items.map((item, index) => {
    const partes = item.title.split(" - ");
    const titulo = partes.length > 1 ? partes.slice(0, -1).join(" - ") : item.title;
    const fonte = partes.length > 1 ? partes[partes.length - 1] : "Google Notícias";

    return {
      id: item.guid || String(index),
      titulo,
      fonte,
      iniciais: iniciaisFonte(fonte),
      tempo: tempoRelativo(item.pubDate),
      leitura: leituraEstimada(titulo),
      link: item.link,
      categoriaId: categoria.id,
      categoriaLabel: categoria.label,
      categoriaEmoji: categoria.emoji,
      cor: categoria.cor,
      corClara: categoria.corClara,
    };
  });
}