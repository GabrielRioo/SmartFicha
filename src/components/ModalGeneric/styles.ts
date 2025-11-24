import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
   backdrop: {
    flex: 1,
    backgroundColor: "#00000066",
   },

   center: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: '20%',
    alignItems: 'center',
   },

   modal: {
    width: '100%',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
   },

   title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#10b981',
    textAlign: 'center',
    marginBottom: 8
   },

   content: {
    marginBottom: 12,
   },

   footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
   },

   btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12
   },

    btnCancel: {
      backgroundColor: '#1f2937',
    },

    btnConfirm: {
      backgroundColor: '#10b981',
    },

    btnText: {
      color: '#cbd5e1',
    fontWeight: '600',
    },

    btnConfirmText: {
    color: '#04211b',
  },

})