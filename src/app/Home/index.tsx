import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { Card } from '@/components/Card';
import { Exercise } from '@/app/Exercise';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/Header';

export default function Home() {
  const navigation = useNavigation();

  return (
    <>
      <Header showBack={false} />

      <View style={styles.container}>
        <View style={styles.header}></View>

        <View style={styles.form}>
          <Button title='Criar Novo Treino' />
        </View>

        <View style={styles.cards}>
          <Card title='Peito e triceps' weekDay='segunda-feira' onPress={() => navigation.navigate('Exercise' as never)} />
        </View>


      </View>
    </>
  );
}
