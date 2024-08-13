export const episodeTitleFilter = (title: string) => (episode: any) => episode.title?.toLowerCase().includes(title.toLowerCase())

export const eventTitleFilter = (title: string) => (episode: any) => episode.title?.toLowerCase().includes(title.toLowerCase())