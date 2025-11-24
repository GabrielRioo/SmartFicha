import { Dimensions, StyleSheet} from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    // zIndex menor que menu, maior que o resto
    zIndex: 900,
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    zIndex: 1000, // garante ficar acima do conteúdo
    alignItems: 'center', // deixar o botão centralizado (ajusta se precisar)
  },
  button: {
    width: '100%',
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#04211b',
    fontWeight: '700',
  },
  menu: {
    position: 'absolute',
    top: '100%',
    left: 16,
    right: 16,
    marginTop: 8,
    // width: Math.min(SCREEN_WIDTH * 0.95, 420),
    width: '100%',
    backgroundColor: '#0b1220',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
    overflow: 'hidden',
    elevation: 12,
    zIndex: 2000,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  itemText: {
    color: '#e2e8f0',
    fontSize: 15,
  },
})

