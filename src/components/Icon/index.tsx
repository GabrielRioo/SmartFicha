import {styles} from '@/components/Icon/styles'
import type { ReactNode } from 'react'
import {TouchableOpacity, Text} from 'react-native'

type IconProps = {
  children: ReactNode
  onPress?: () => void
}

export function Icon({children, onPress}: IconProps) {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}