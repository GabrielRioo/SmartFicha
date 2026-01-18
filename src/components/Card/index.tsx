import { styles } from '@/components/Card/styles'
import { View, Text, TouchableOpacity } from 'react-native'
import { Trash2, SquarePen, Image } from 'lucide-react-native'
import { Icon } from '@/components/Icon'
import { ChevronUp, ChevronDown } from 'lucide-react-native';


type Props = {
  title: string
  weekDay?: string
  serie?: string
  reps?: string
  image?: boolean
  onPress?: () => void
  onPressImage?: () => void
  onPressEdit?: () => void
  onPressDelete?: () => void
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

export function Card({
  title,
  weekDay,
  serie,
  reps,
  image,
  onPress,
  onPressImage,
  onPressEdit,
  onPressDelete,
  onMoveUp,
  onMoveDown
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
          </View>

          <View style={styles.icons}>
            {image && (
              <Icon onPress={onPressImage}>
                <Image size={18} color="#c2c7ce" />
              </Icon>
            )}
            <Icon onPress={onPressEdit}>
              <SquarePen size={18} color="#c2c7ce" />
            </Icon>

            <Icon onPress={onPressDelete}>
              <Trash2 size={18} color="#c2c7ce" />
            </Icon>

          </View>
        </View>

        <View style={styles.description}>
          {
            weekDay && weekDay.trim() !== '' ? (
              <View style={styles.container_description}>
                <Text style={styles.day}>{weekDay}</Text>
                <View style={styles.upanddown}>
                  <TouchableOpacity onPress={onMoveUp}>
                    <ChevronUp size={25} color="#c2c7ce" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onMoveDown}>
                    <ChevronDown size={25} color="#c2c7ce" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.container_description}>
                <View>
                  <Text style={styles.serie}>
                    Séries:
                    <Text>{serie}</Text>
                  </Text>
                  <Text style={styles.reps}>
                    Repetições:
                    <Text>{reps}</Text>
                  </Text>
                </View>

                <View style={styles.upanddown}>
                  <TouchableOpacity onPress={onMoveUp}>
                    <ChevronUp size={25} color="#c2c7ce" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onMoveDown}>
                    <ChevronDown size={25} color="#c2c7ce" />
                  </TouchableOpacity>
                </View>
              </View>
            )
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}