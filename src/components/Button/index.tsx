import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import  {styles} from '@/components/Button/styles'
import type { ReactNode } from 'react'

type Props = TouchableOpacityProps & {
  title: string
  icon?: ReactNode
}

export function Button ({title, icon, ...rest}: Props) {
  return (
    <>
     <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest}>
      <Text style={styles.tittle}>{icon} {title}</Text>
     </TouchableOpacity>
    </>
  )
}