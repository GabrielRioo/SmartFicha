import {StyleSheet} from 'react-native'
 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0f172a'
  },

  header: {},

  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 12
  },

  cards: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
    marginTop: 21
  },

  scrollContent: {
    gap: 8,            // se sua versão RN não suportar 'gap', o espaçamento vem via margin nos inputs/rows
    width: '100%',
    paddingBottom: 120
  },

  input: {
    backgroundColor: '#0b1220',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1f2937',
    fontSize: 14,
  },

  full: {
    width: '100%',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },

  half: {
    flex: 1,
  },

  // espaçamentos para substituir gap entre colunas (compatível com mais versões RN)
  rightGap: {
    marginRight: 8,
  },
  leftGap: {
    marginLeft: 8,
  },
})