import { styles } from '@/components/ModalGeneric/styles'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

type Props = {
  title: string
  visible: boolean
  onClose: () => void
  onConfirm?: (e?: GestureResponderEvent) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  children?: React.ReactNode;
  showFooter?: boolean;
}

export function ModalGeneric({
  title,
  visible,
  onClose,
  onConfirm,
  confirmLabel = "Confirmar",
  cancelLabel = 'Cancelar',
  children,
  showFooter = true
}: Props) {
  return(
    <Modal visible={visible} transparent animationType='fade' statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.center}>
        <View style={styles.modal}>
          {title ? <Text style={styles.title}>{title}</Text> : null}

          <View style={styles.content}>
            {children}
          </View>

          {showFooter ? (
            <View style={styles.footer}>
              <TouchableOpacity style={[styles.btn, styles.btnCancel]} onPress={onClose}>
                <Text style={styles.btnText}>{cancelLabel}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnConfirm]}
                onPress={(e) => { onConfirm?.(e); }}
              >
                <Text style={[styles.btnText, styles.btnConfirmText]}>{confirmLabel}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  )
}