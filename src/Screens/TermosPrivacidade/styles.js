import { StyleSheet } from 'react-native';

const PURPLE = '#5B2D9E';
const PURPLE_LIGHT = '#EDE8F8';
const TEXT_GRAY = '#6B6B8A';
const WHITE = '#FFFFFF';
const BG = '#F9F8FE';

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

  scroll: {
    width: '100%',
  },

  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 22,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  subtitulo: {
    fontSize: 14,
    fontWeight: '300',
    color: '#454545',
    textAlign: 'center',
    marginBottom: 20
  },

  card: {
    width: '96%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 17,
    padding: 16,
  },

  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PURPLE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 2,
  },

  cardTextContainer: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 5,
    letterSpacing: 0.1,
  },

  cardDescription: {
    fontSize: 13,
    color: TEXT_GRAY,
    lineHeight: 19,
  },

  footer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 8,
    backgroundColor: BG,
  },

  backButtonMain: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  backButtonMainPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  backButtonMainText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

});