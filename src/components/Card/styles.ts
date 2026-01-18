import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e293b',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    marginTop: 12,

    borderBottomWidth: 4,
    borderColor: '#475569',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#475569'
  },

  info: {
    flex: 1,
    marginRight: 8,
  },

  title: {
    color: '#10b981',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 800,
  },

  day: {
    color: '#94a3b8'
  },

  container_description: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  upanddown: {
    gap: 2
  },

  serie: {
    color: '#94a3b8'
  },

  reps: {
    color: '#94a3b8'
  },

  description: {
    marginTop: 10
  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 0,    
  }
})