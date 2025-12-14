import { Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native'
import { styles } from '@/app/Exercise/styles'
import { Card } from '@/components/Card'
import { Header } from '@/components/Header'
import { Button } from '@/components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Download, ImageIcon } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { ModalGeneric } from '@/components/ModalGeneric'
import * as ImagePicker from 'expo-image-picker';
import { DropdownWeek } from '@/components/DropdownWeek'
import { ExerciseCard } from '@/types/ExerciseCard'
import { loadExercises, saveExercises } from '@/storage/trainingStorage'

// type ExerciseCard = {
//   id: string;
//   title: string;
//   serie: string;
//   reps: string;
//   imageUri?: string | null;
// };

export function Exercise() {
  const route = useRoute();
  const { title, trainingId } = route.params as { title: string; trainingId: string; }

  const [selectedCard, setSelectedCard] = useState<ExerciseCard | null>(null);
  const [cards, setCards] = useState<ExerciseCard[]>([]);
  const [cardToDelete, setCardToDelete] = useState<ExerciseCard | null>(null);


  const exercisesOfTraining = cards.filter(
    item => item.trainingId === trainingId
  );

  // const [cards, setCards] = useState<ExerciseCard[]>([
  //   { id: '1', title: 'Peito e tríceps', serie: '3', reps: '12', imageUri: null },
  //   { id: '2', title: 'Costas e bíceps', serie: '3', reps: '14', imageUri: null },
  // ]);

  // modals
  const [showImageModal, setShowImageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  // estados para edição
  const [editTitle, setEditTitle] = useState('');
  const [editSerie, setEditSerie] = useState('');
  const [editReps, setEditReps] = useState('');

  const [cardTitle, setCardTitle] = useState('')
  const [cardSerie, setCardSerie] = useState('')
  const [cardReps, setCardReps] = useState('')
  const [exerciseImage, setExerciseImage] = useState<string | null>(null);
  const navigation = useNavigation();

  function handleCreateNewExercise() {
    const newExercise: ExerciseCard = {
      id: String(Date.now()),
      trainingId, // 🔥 vínculo com o treino atual
      title: cardTitle,
      serie: cardSerie,
      reps: cardReps,
      imageUri: exerciseImage,
    };

    setCards(prev => {
      const updated = [...prev, newExercise];
      saveExercises(updated);
      return updated;
    });

    setOpenModal(false);
    setCardTitle('');
    setCardSerie('');
    setCardReps('');
    setExerciseImage(null);
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

  function handleOpenImageModal(card: ExerciseCard) {
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

  function handleOpenEditModal(card: ExerciseCard) {
    setSelectedCard(card);
    setEditTitle(card.title)
    setEditSerie(card.serie)
    setEditReps(card.reps)
    // setEditWeekDay(card.weekDay);
    setShowEditModal(true);
  }

  function handleSaveEdit() {
    if (!selectedCard) return;

    setCards(prev => {
      const updatedCard =
        prev.map(item =>
          item.id === selectedCard.id
            ? { ...item, title: editTitle, serie: editSerie, reps: editReps }
            : item
        )
      saveExercises(updatedCard)
      return updatedCard;
    });

    setShowEditModal(false);
    setSelectedCard(null);
  }

  function handleDeleteCard(card: ExerciseCard) {
    setCardToDelete(card);
    setShowDeleteModal(true);
  }

  // function handleDeleteCard(card: ExerciseCard) {
  //   Alert.alert(
  //     'Excluir treino',
  //     `Tem certeza que deseja excluir "${card.title}"?`,
  //     [
  //       { text: 'Cancelar', style: 'cancel' },
  //       {
  //         text: 'Excluir',
  //         style: 'destructive',
  //         onPress: () => {
  //           setCards(prev => {
  //             const deletedCard = prev.filter(item => item.id !== card.id)
  //             saveExercises(deletedCard)
  //             return deletedCard
  //           });
  //         },
  //       },
  //     ]
  //   );
  // }

  useEffect(() => {
    async function load() {
      const stored = await loadExercises();
      setCards(stored)
    }

    load();
  }, [])

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

      <Text style={styles.title}>{title}</Text>

      <View style={styles.container}>
        {exercisesOfTraining.map(card => (
          <Card
            key={card.id}
            title={card.title}
            serie={card.serie}
            reps={card.reps}
            image
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
          value={cardTitle}
          onChangeText={setCardTitle}
          style={{ backgroundColor: '#0b1220', padding: 12, borderRadius: 8, color: '#fff', marginBottom: 8 }}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="Séries"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={cardSerie}
            onChangeText={setCardSerie}
            style={[styles.input, styles.half, styles.rightGap]}
          />

          <TextInput
            placeholder="Repetições"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={cardReps}
            onChangeText={setCardReps}
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

        <View style={styles.row}>
          <TextInput
            placeholder="Séries"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={editSerie}
            onChangeText={setEditSerie}
            style={[styles.input, styles.half, styles.rightGap]}
          />

          <TextInput
            placeholder="Repetições"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={editReps}
            onChangeText={setEditReps}
            style={[styles.input, styles.half, styles.leftGap]}
          />
        </View>
      </ModalGeneric>

      {/* Modal para deletar */}
              <ModalGeneric
                visible={showDeleteModal && !!cardToDelete}
                title="Excluir treino"
                confirmLabel="Excluir"
                cancelLabel="Cancelar"
                onClose={() => {
                  setShowDeleteModal(false);
                  setCardToDelete(null);
                }}
                onConfirm={() => {
                  if (!cardToDelete) return;
      
                  setCards(prev => {
                    const updated = prev.filter(item => item.id !== cardToDelete.id);
                    saveExercises(updated);
                    return updated;
                  });
      
                  setShowDeleteModal(false);
                  setCardToDelete(null);
                }}
              >
                <Text style={{ color: '#cbd5e1', textAlign: 'center' }}>
                  Tem certeza que deseja excluir{" "}
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    {cardToDelete?.title}
                  </Text>
                  ?
                </Text>
              </ModalGeneric>
    </>
  )
}