import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import  {styles} from '@/components/Button/styles'

type Props = TouchableOpacityProps & {
  title: string
}

export function Button ({title, ...rest}: Props) {
  return (
    <>
     <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <Text style={styles.tittle}>{title}</Text>
     </TouchableOpacity>
    </>
  )
}