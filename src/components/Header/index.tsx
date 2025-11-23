import { styles } from '@/components/Header/styles'
import { ArrowBigLeft } from 'lucide-react-native'
import { View, Text, TouchableOpacity } from 'react-native'

type Props = {
  showBack?: boolean
  onPress?: () => void
}

export function Header({ showBack = true, onPress }: Props) {
  return(
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity style={styles.back} onPress={onPress}>
          <ArrowBigLeft size={22} color="white" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} /> // mantém o título centralizado
      )}

      <Text style={styles.title}>SmartFicha</Text>

      <View style={{ width: 32 }} />
    </View>
  )
}