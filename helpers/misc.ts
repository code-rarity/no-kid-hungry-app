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