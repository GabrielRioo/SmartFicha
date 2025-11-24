import { Text, View } from 'react-native'
import { styles } from '@/app/Exercise/styles'
import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native'
import { Download } from 'lucide-react-native'

export function Exercise() {
  const navigation = useNavigation();
  
  return (
    <>
      <Header onPress={() => navigation.goBack()}/>

       <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title='Exportar' icon={<Download size={18} color={'white'}/>}/>
        </View>

        <View style={styles.buttonWrapper}>
          <Button title='Novo Exercicio' />
        </View>
      </View>

      <View style={styles.container}>
        <Card title='Rosca direta' serie='3' reps='12' />
        <Card title='Supino Reto' serie='3' reps='12' />
        <Card title='Cruxifixo inverso na barra' serie='3' reps='12' />
      </View>
    </>
  )
}