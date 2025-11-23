import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#1e293b',
    borderBottomWidth: 4,
    borderColor: '#10b981',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  title: {
    color: 'white',
    fontWeight: 800,
    fontSize: 32
  },

  back: {
    // borderWidth: 2,
    // borderColor: '#10b981',
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 4,
    marginBottom: 2,
  }
})