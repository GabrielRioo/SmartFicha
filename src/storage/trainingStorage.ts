import AsyncStorage from '@react-native-async-storage/async-storage'
import { TrainingCard } from '@/types/TrainingCard'
import type { ExerciseCard } from '@/types/ExerciseCard';

const KEY_TRAINING = '@smartficha:treinos';
const KEY_EXERCISE = '@smartficha:exercise';

export async function saveCards(cards: TrainingCard[]) {
  await AsyncStorage.setItem(KEY_TRAINING, JSON.stringify(cards));
}

export async function loadCards(): Promise<TrainingCard[]> {
  const data = await AsyncStorage.getItem(KEY_TRAINING);
  return data ? JSON.parse(data) : [];
}

export async function saveExercises(cards: ExerciseCard[]) {
  await AsyncStorage.setItem(KEY_EXERCISE, JSON.stringify(cards))
}

export async function loadExercises(): Promise<ExerciseCard[]> {
  const data = await AsyncStorage.getItem(KEY_EXERCISE)
  return data ? JSON.parse(data) : [];
}