import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { Card } from '@/components/Card';
import { Exercise } from '@/app/Exercise';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.form}>
        <Button title='Criar Novo Treino'/>
      </View>

      <View style={styles.cards}>
        <Card title='Peito e triceps' weekDay='segunda-feira'/>

        <Exercise />
      </View>
      
    
    </View>
  );
}
