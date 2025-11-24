import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    zIndex: 1000, // importante dentro do modal para ficar acima
    position: 'relative',

  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0b1220',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10
    // borderWidth: 1,
    // borderColor: '#1f2937',
  },
  inputDisabled: {
    opacity: 0.6,
  },
  inputText: {
    color: '#fff',
    // fontSize: 16,
  },
  placeholder: {
    color: '#94a3b8',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',     // aparece logo abaixo do input
    left: 0,
    right: 0,
    marginTop: 8,
    backgroundColor: '#0b1220',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
    maxHeight: 240,
    paddingVertical: 4,

     // sombras
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },

    // android: elevation e zIndex ajudam a garantir que fique acima
    elevation: 12,
    zIndex: 2000,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionText: {
    color: '#e2e8f0',
    // fontSize: 15,
  },
  sep: {
    height: 1,
    backgroundColor: '#0f172a',
  },
})