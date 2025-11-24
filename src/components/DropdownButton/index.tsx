import { useState } from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, View, Text, Dimensions } from 'react-native'
import { styles } from '@/components/DropdownButton/styles'
import { ChevronDown } from 'lucide-react-native';

type Props = {
  title?: string;
  onSelectManual?: () => void;
  onSelectAI?: () => void;
};

export function DropdownButton({ title = 'Criar Novo Treino', onSelectManual, onSelectAI }: Props) {
  const [open, setOpen] = useState(false)

    function handleManual() {
    setOpen(false);
    onSelectManual?.();
  }

  function handleAI() {
    setOpen(false);
    onSelectAI?.();
  }

  return(
    <>
      {open && (
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => setOpen(prev => !prev)}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      </View>

      {open && (
          // Menu absoluto para não empurrar layout
          <View style={styles.menu}>
            <TouchableOpacity style={styles.item} onPress={handleManual}>
              <Text style={styles.itemText}>Criar manualmente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={handleAI}>
              <Text style={styles.itemText}>Gerar por IA</Text>
            </TouchableOpacity>
          </View>
        )}
    </>
  )
}
