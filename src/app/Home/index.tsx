import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';

type TrainingCard = {
  id: string;
  title: string;
  weekDay: string;
  imageUri?: string | null;
};

export default function Home() {
  const [cards, setCards] = useState<TrainingCard[]>([
    { id: '1', title: 'Peito e tríceps', weekDay: 'Segunda-feira', imageUri: null },
    { id: '2', title: 'Costas e bíceps', weekDay: 'Quarta-feira', imageUri: null },
  ]);

  const [selectedCard, setSelectedCard] = useState<TrainingCard | null>(null);

  // modais
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [openManualModal, setOpenManualModal] = useState(false);
  const [openAIModal, setOpenAIModal] = useState(false);

  // estados
  const [fichaName, setFichaName] = useState('');
  const [day, setDay] = useState<string | undefined>();

  // estados para edição
  const [editTitle, setEditTitle] = useState('');
  const [editWeekDay, setEditWeekDay] = useState('');

  const [showNewFicha, setShowNewFicha] = useState(false)
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

  function handleOpenImageModal(card: TrainingCard) {
    setSelectedCard(card);
    setShowImageModal(true);
  }

  async function handleReplaceImage() {
    if (!selectedCard) return;

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permissão negada", 'Ative o acesso à galeria para substituir a imagem.')
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setCards(prev =>
        prev.map(item =>
          item.id === selectedCard.id ? { ...item, imageUri: uri } : item
        )
      );

      // atualiza selectedCard também
      setSelectedCard(prev => (prev ? { ...prev, imageUri: uri } : prev));
    }
  }

  function handleOpenEditModal(card: TrainingCard) {
    setSelectedCard(card);
    setEditTitle(card.title)
    setEditWeekDay(card.weekDay);
    setShowEditModal(true);
  }

  function handleSaveEdit() {
    if (!selectedCard) return;

    setCards(prev =>
      prev.map(item =>
        item.id === selectedCard.id
          ? { ...item, title: editTitle, weekDay: editWeekDay }
          : item
      )
    );

    setShowEditModal(false);
    setSelectedCard(null);
  }

  function handleDeleteCard(card: TrainingCard) {
    Alert.alert(
      'Excluir treino',
      `Tem certeza que deseja excluir "${card.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setCards(prev => prev.filter(item => item.id !== card.id));
          },
        },
      ]
    );
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
          {cards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              weekDay={card.weekDay}
              image={false}
              onPress={() => navigation.navigate('Exercise' as never)}
              onPressImage={() => handleOpenImageModal(card)}
              onPressEdit={() => handleOpenEditModal(card)}
              onPressDelete={() => handleDeleteCard(card)}
            />
          ))}
          {/* <Card title='Peito e triceps' weekDay='segunda-feira' onPress={() => navigation.navigate('Exercise' as never)} /> */}
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
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: '100%' }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 100} // ajuste conforme header
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* Objetivo ocupa toda a largura */}
              <TextInput
                placeholder="Objetivo (ex: hipertrofia, resistência)"
                placeholderTextColor="#94a3b8"
                style={[styles.input, styles.full]}
              />

              {/* Linha: Idade | Gênero */}
              <View style={styles.row}>
                <TextInput
                  placeholder="Idade"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  style={[styles.input, styles.half, styles.rightGap]}
                />

                <TextInput
                  placeholder="Gênero"
                  placeholderTextColor="#94a3b8"
                  style={[styles.input, styles.half, styles.leftGap]}
                />
              </View>

              {/* Linha: Treino por quantos dias? | Nível de treino */}
              <View style={styles.row}>
                <TextInput
                  placeholder="Dias de treino"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  style={[styles.input, styles.half, styles.rightGap]}
                />

                <TextInput
                  placeholder="Nível de treino"
                  placeholderTextColor="#94a3b8"
                  style={[styles.input, styles.half, styles.leftGap]}
                />
              </View>

              {/* Se quiser outros campos (ex: observações) */}

            </ScrollView>
          </KeyboardAvoidingView>
          {/* mais parâmetros */}
        </ModalGeneric>

        <ModalGeneric
          visible={showImageModal && !!selectedCard}
          title={selectedCard?.title ?? 'Imagem do Treino'}
          onClose={() => {
            setShowImageModal(false);
            setSelectedCard(null);
          }}
          showFooter={false}
        >
          {
            selectedCard?.imageUri ? (
              <Image
                source={{ uri: selectedCard.imageUri }}
                style={{ width: '100%', height: 250, borderRadius: 10, marginBottom: 12 }}
                resizeMode='cover' />
            ) : (
              <View style={{ marginBottom: 12 }}>
                <Text style={{ color: '#cbd5e1', textAlign: 'center' }}>
                  Nenhuma imagem adicionada para este treino.
                </Text>
              </View>
            )}

          <View style={{ gap: 8 }}>
            <Button
              title={selectedCard?.imageUri ? 'Substituir imagem' : 'Adicionar imagem'}
              onPress={handleReplaceImage}
            />

            <Button
              title='Fechar'
              onPress={() => {
                setShowImageModal(false);
                setSelectedCard(null);
              }}
            />
          </View>

        </ModalGeneric>

        <ModalGeneric
          visible={showEditModal && !!selectedCard}
          title="Editar Treino"
          onClose={() => {
            setShowEditModal(false);
            setSelectedCard(null);
          }}
          onConfirm={handleSaveEdit}
          confirmLabel="Salvar"
          cancelLabel="Cancelar"
        >
          <TextInput
            placeholder='Nome do Treino'
            placeholderTextColor='#94a3b8'
            value={editTitle}
            onChangeText={setEditTitle}
            style={{ backgroundColor: '#0b1220', padding: 12, borderRadius: 8, color: '#fff', marginBottom: 8 }}
          />

          <DropdownWeek
            value={editWeekDay}
            onSelect={(d) => setDay(d)}
            onChangeText={setEditWeekDay}
            placeholder="Escolha o dia do treino"
          />
        </ModalGeneric>

      </View>
    </>
  );
}
