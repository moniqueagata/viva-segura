import React from "react";
import { Modal, View, Text, Pressable, FlatList, Linking } from "react-native";
import styles from "./styles";

export default function MenuLateral({ visivel, onFechar, favoritos, curtidas }) {
  return (
    <Modal visible={visivel} transparent animationType="fade" onRequestClose={onFechar}>
      <View style={styles.menuOverlay}>
        <View style={styles.menuPainel}>
          <View style={styles.menuTopo}>
            <Text style={styles.menuTitulo}>Meu mural</Text>
            <Pressable onPress={onFechar}>
              <Text style={styles.menuFechar}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.menuSecao}>♥ Favoritos ({favoritos.length})</Text>
          <FlatList
            data={favoritos}
            keyExtractor={(item) => "fav-" + item.id}
            style={{ maxHeight: 180 }}
            ListEmptyComponent={<Text style={styles.menuVazio}>Nenhuma notícia favoritada ainda.</Text>}
            renderItem={({ item }) => (
              <Pressable style={styles.menuItem} onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.menuItemTexto} numberOfLines={2}>{item.titulo}</Text>
              </Pressable>
            )}
          />

          <Text style={styles.menuSecao}>👍 Curtidas ({curtidas.length})</Text>
          <FlatList
            data={curtidas}
            keyExtractor={(item) => "like-" + item.id}
            style={{ maxHeight: 180 }}
            ListEmptyComponent={<Text style={styles.menuVazio}>Nenhuma notícia curtida ainda.</Text>}
            renderItem={({ item }) => (
              <Pressable style={styles.menuItem} onPress={() => Linking.openURL(item.link)}>
                <Text style={styles.menuItemTexto} numberOfLines={2}>{item.titulo}</Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}