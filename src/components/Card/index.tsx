import { styles } from '@/components/Card/styles'
import { View, Text, TouchableOpacity } from 'react-native'
import { Trash2, SquarePen, Image } from 'lucide-react-native'
import { Icon } from '@/components/Icon'

type Props = {
  title: string
  weekDay?: string
  serie?: string
  reps?: string
}

export function Card({ title, weekDay, serie, reps }: Props) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>

          {
            weekDay && weekDay.trim() !== '' ? (
              <Text style={styles.day}>{weekDay}</Text>
            ) : (
              <>
                <Text style={styles.day}>Séries: {serie}</Text>
                <Text style={styles.day}>Repetições: {reps}</Text>
              </>
            )
          }
        </View>

        <View style={styles.icons}>
          <Icon>
            <Image size={18} color="black" />
          </Icon>
          <Icon>
            <SquarePen size={18} color="black" />
          </Icon>
          <Icon>
            <Trash2 size={18} color="black" />
          </Icon>
        </View>




      </View>


    </>
  )
}