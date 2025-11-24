import { styles } from '@/components/DropdownWeek/styles';
import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const DAYS = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo'
];

type Props = {
  value?: string;
  placeholder?: string;
  onSelect?: (day: string) => void;
  disabled?: boolean;
}

export function DropdownWeek({ value, placeholder = 'Selecione um dia', onSelect, disabled}: Props) {
  const [open, setOpen] = useState(false);
  const selected = value ?? null;

  function handleSelect(day: string) {
    onSelect?.(day);
    setOpen(false);
  }

  return(
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.input, disabled && styles.inputDisabled]}
        onPress={() => !disabled && setOpen(prev => !prev)}
      >
        <Text style={[styles.inputText, !selected && styles.placeholder]}>
          {selected ?? placeholder}
        </Text>
        <ChevronDown size={18} color={'#cbd5e1'} />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <FlatList 
            data={DAYS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
            nestedScrollEnabled
          />
        </View>
      )}
    </View>
  )
}