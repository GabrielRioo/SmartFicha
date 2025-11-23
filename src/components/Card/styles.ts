import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  info: {
    flex: 1,         
    marginRight: 8,
  },

  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 800,
  },

  day: {

  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 0,    
  }
})