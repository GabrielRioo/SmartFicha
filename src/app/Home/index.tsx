import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../../components/Button';
import { styles } from './styles';
import { Card } from '@/components/Card';
import { Exercise } from '@/app/Exercise';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@/components/Header';
import { useState } from 'react';
import { ModalGeneric } from '@/components/ModalGeneric';
import { DropdownWeek } from '@/components/DropdownWeek';
import { DropdownButton } from '@/components/DropdownButton';

export default function Home() {
  const [showNewFicha, setShowNewFicha] = useState(false)
  const [fichaName, setFichaName] = useState('');
  const [openManualModal, setOpenManualModal] = useState(false);
  const [openAIModal, setOpenAIModal] = useState(false);
  const [day, setDay] = useState<string | undefined>();
  const navigation = useNavigation();

  function handleCreateFicha() {
    // salva a ficha (chamada API, supabase, state, etc)
    console.log('Criar ficha:', fichaName);
    setFichaName('');
    setShowNewFicha(false);
  }

  function handleCreateManual() {
    // salva manualmente
    console.log('Criar manual:', { fichaName, day });
    setFichaName('');
    setDay(undefined);
    setOpenManualModal(false);
  }

  function handleGenerateAI() {
    // chamada de IA (ex: API) e depois fecha
    console.log('Gerar por IA...');
    // exemplo: chamar API e depois fechar:
    setOpenAIModal(false);
  }

  return (
    <>
      <Header showBack={false} />

      <View style={styles.container}>
        <View style={styles.header}></View>

        <View style={styles.form}>
          {/* <Button title='Criar Novo Treino' onPress={() => setShowNewFicha(true)} /> */}
          <DropdownButton
            title="Criar Novo Treino"
            onSelectManual={() => setOpenManualModal(true)}
            onSelectAI={() => setOpenAIModal(true)}
          />
        </View>

        <View style={styles.cards}>
          <Card title='Peito e triceps' weekDay='segunda-feira' onPress={() => navigation.navigate('Exercise' as never)} />
        </View>

        {/* Modal Manual */}
        <ModalGeneric
          visible={openManualModal}
          title="Criar Treino Manual"
          onClose={() => setOpenManualModal(false)}
          onConfirm={handleCreateManual}
          confirmLabel="Criar"
          cancelLabel="Fechar"
        >
          <TextInput
            placeholder="Nome da ficha"
            placeholderTextColor="#94a3b8"
            value={fichaName}
            onChangeText={setFichaName}
            style={{ backgroundColor: '#0b1220', padding: 12, borderRadius: 8, color: '#fff', marginBottom: 8 }}
          />

          <DropdownWeek
            value={day}
            onSelect={(d) => setDay(d)}
            placeholder="Escolha o dia do treino"
          />

          {/* aqui você pode usar o DropdownWeek que criamos antes para escolher dia */}
          {/* <DropdownWeek value={day} onSelect={setDay} /> */}
        </ModalGeneric>

        {/* Modal IA */}
        <ModalGeneric
          visible={openAIModal}
          title="Gerar Treino por IA"
          onClose={() => setOpenAIModal(false)}
          onConfirm={handleGenerateAI}
          confirmLabel="Gerar"
          cancelLabel="Fechar"
        >
          {/* Conteúdo do modal IA: opções, prompt, nível, etc */}
          <TextInput
            placeholder="Objetivo (ex: hipertrofia, resistência)"
            placeholderTextColor="#94a3b8"
            style={{ backgroundColor: '#0b1220', padding: 12, borderRadius: 8, color: '#fff', marginBottom: 8 }}
          />
          {/* mais parâmetros */}
        </ModalGeneric>
      </View>
    </>
  );
}
