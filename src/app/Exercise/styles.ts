import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    height: '100%',
    paddingHorizontal: 16
  },

  title: {
    textAlign: 'center',
    backgroundColor: '#0f172a',
    color: 'white',
    paddingTop: 18,
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },

  buttons: {
    backgroundColor: '#0f172a',
    flexDirection: 'row',
    width: '100%',
    columnGap: 8,
    paddingHorizontal: 16
  },

  disabled: {
    backgroundColor: '#020617',
    opacity: 0.5,
    color: '#64748b',
    cursor: 'not-allowed' as any,
  },

  buttonWrapper: {
    flex: 1, 
  },

  cardsContainer: {
    gap: 12,
  },

  input: {
    width: '100%',
    backgroundColor: '#0b1220',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#1f2937',
    fontSize: 14,
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

  scrollContent: {
    paddingBottom: 40,
  },
  
  imagePreviewContainer: {
    width: 200,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    position: 'relative',
  },

  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  removeImageButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#000000aa',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeImageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})