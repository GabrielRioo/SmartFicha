import { Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native'
import { styles } from '@/app/Exercise/styles'
import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { useNavigation } from '@react-navigation/native'
import { Download, ImageIcon } from 'lucide-react-native'
import { useState } from 'react'
import { ModalGeneric } from '@/components/ModalGeneric'
import * as ImagePicker from 'expo-image-picker';
import { DropdownWeek } from '@/components/DropdownWeek'

type TrainingCard = {
  id: string;
  title: string;
  serie: string;
  reps: string;
  imageUri?: string | null;
};

export function Exercise() {
  const [selectedCard, setSelectedCard] = useState<TrainingCard | null>(null);

  const [cards, setCards] = useState<TrainingCard[]>([
      { id: '1', title: 'Peito e tríceps', serie: '3', reps: '12', imageUri: null },
      { id: '2', title: 'Costas e bíceps', serie: '3', reps: '14', imageUri: null },
    ]);

  // modals
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  // estados para edição
  const [editTitle, setEditTitle] = useState('');
  const [editWeekDay, setEditWeekDay] = useState('');

  const [exerciseName, setExerciseName] = useState("")
  const [exerciseImage, setExerciseImage] = useState<string | null>(null);
  const navigation = useNavigation();

  function handleCreateNewExercise() {
    setOpenModal(false)
  }

  async function handlePickImage() {
    // pedir permissao
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      console.log("Permissao para acessar a galeria negada");
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
      setExerciseImage(uri)
    }
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
      // setEditWeekDay(card.weekDay);
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
      <Header onPress={() => navigation.goBack()} />

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button title='Exportar' icon={<Download size={18} color={'white'} />} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button title='Novo Exercicio' onPress={() => setOpenModal(true)} />
        </View>
      </View>

      <View style={styles.container}>
        {cards.map(card => (
            <Card
              key={card.id}
              title={card.title}
              serie={card.serie}
              reps={card.reps}
              image={true}
              onPress={() => navigation.navigate('Exercise' as never)}
              onPressImage={() => handleOpenImageModal(card)}
              onPressEdit={() => handleOpenEditModal(card)}
              onPressDelete={() => handleDeleteCard(card)}
            />
          ))}
        {/* <Card title='Rosca direta' serie='3' reps='12' image onPressImage={() => handleOpenImageModal(card)}
              onPressEdit={() => handleOpenEditModal(card)}
              onPressDelete={() => handleDeleteCard(card)}/>
        <Card title='Supino Reto' serie='3' reps='12' image/>
        <Card title='Cruxifixo inverso na barra' serie='3' reps='12' image/> */}
      </View>

      <ModalGeneric
        title='Novo Exercício'
        visible={openModal}
        confirmLabel='Criar'
        cancelLabel='Fechar'
        onClose={handleCreateNewExercise}
        onConfirm={handleCreateNewExercise}
      >
        <TextInput
          placeholder="Nome do Exercício"
          placeholderTextColor="#94a3b8"
          value={exerciseName}
          onChangeText={setExerciseName}
          style={{ backgroundColor: '#0b1220', padding: 12, borderRadius: 8, color: '#fff', marginBottom: 8 }}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Séries"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            style={[styles.input, styles.half, styles.rightGap]}
          />

          <TextInput
            placeholder="Repetições"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            style={[styles.input, styles.half, styles.leftGap]}
          />
        </View>

        {/* Botão de upload de imagem */}
        <View>
          <Button
            title='Adicionar Imagem'
            onPress={handlePickImage}
            icon={<ImageIcon size={18} color="white" />}
          />

          {exerciseImage && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: exerciseImage }}
                style={styles.imagePreview}
                resizeMode="cover"
              />

              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => setExerciseImage(null)}
              >
                <Text style={styles.removeImageText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ModalGeneric>

      {/* Modal Imagem */}
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
      
              {/* Modal Edit */}
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
              </ModalGeneric>
    </>
  )
}