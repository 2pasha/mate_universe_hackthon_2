const STORAGE_KEY = "wear-ai:history"
const MAX_ENTRIES = 20

export interface HistoryEntry {
  id: string
  createdAt: string
  tryOnImageUrl: string
  videoUrl: string
}

export function getEntries(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as HistoryEntry[]
  } catch {
    return []
  }
}

export function saveEntry(entry: Omit<HistoryEntry, "id" | "createdAt">): HistoryEntry {
  const newEntry: HistoryEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...entry,
  }

  const existing = getEntries()
  const updated = [newEntry, ...existing].slice(0, MAX_ENTRIES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return newEntry
}

export function deleteEntry(id: string): void {
  const updated = getEntries().filter((e) => e.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}
