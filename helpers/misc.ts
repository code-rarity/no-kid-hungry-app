import * as SecureStore from 'expo-secure-store';

export const parseDateString = (dateString) => {
  if (!dateString) {
    return null;
  }

  // Ensure the dateString is a string and has the correct length
  if (typeof dateString !== 'string' || dateString.length !== 8) {
    throw new Error('Invalid date string format. Expected "yyyymmdd".');
  }

  // Extract year, month, and day from the string
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // Month is 0-based
  const day = parseInt(dateString.substring(6, 8), 10);

  // Create and return a new Date object
  return new Date(year, month, day);
};

export const formatSecondsToMinutes = (seconds: number) => {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)

	const formattedMinutes = String(minutes).padStart(2, '0')
	const formattedSeconds = String(remainingSeconds).padStart(2, '0')

	return `${formattedMinutes}:${formattedSeconds}`
}

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}

export async function saveKeyValue(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteValueFor(key) {
  await SecureStore.deleteItemAsync(key);
}

export async function getValueFor(key) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export function mergeObjects(obj1, obj2) {
  const result = { ...obj1 }; // Start with properties from obj1

  for (const key in obj2) {
    if (key in result) {
      // If the key exists in both, combine values
      result[key] = Array.isArray(result[key]) 
        ? [...result[key], obj2[key]] 
        : [result[key], obj2[key]]; // Combine into an array
    } else {
      // Otherwise, just add the key-value pair
      result[key] = obj2[key];
    }
  }
  
  return result;
}