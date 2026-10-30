import type { Club } from "../features/clubs/type";
import { delay } from "./delay";

// daysFromNow > 0 is the future, < 0 is the past
function at(daysFromNow: number, hour: number) {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

export const mockMyClubsData: Club[] = [
  {
    clubId: 'c_001',
    clubName: 'The Beans',
    clubIcon: '',
    description: 'Friendly open play for all levels. Beginners welcome, bring water and good vibes.',
    playerCount: 42,
    address: '123 Nimmanhaemin Rd, Suthep',
    city: 'Chiang Mai',
    country: 'Thailand',
    latitude: 18.7992,
    longitude: 98.9681,
    courtCount: 4,
    newThisMonth: 5,
    guestsToReview: 6,
    nextSessionAt: at(5, 18),
    lastSessionAt: at(-1, 18),
    isLive: true,
    contactEmail: 'hello@thebeans.example',
    contactPhone: '+66 81 234 5678',
    schedule: 'Tue & Thu 18:00-21:00, Sat 09:00-12:00',
    createdAt: '2026-03-12T09:30:00.000Z',
  },
  {
    clubId: 'c_002',
    clubName: 'Pick Me',
    clubIcon: '',
    playerCount: 1,
    city: 'Bangkok',
    country: 'Thailand',
    courtCount: 2,
    nextSessionAt: at(2, 19),
    lastSessionAt: at(-8, 18),
    contactEmail: '',
    contactPhone: '',
    createdAt: '2026-10-02T04:00:00.000Z',
  },
]

// the home-page ClubCard data is just the first club now
export const mockClubData = mockMyClubsData[0]

export const getClub = async (clubId: string): Promise<Club> => {
  await delay();
  const club = mockMyClubsData.find((c) => c.clubId === clubId)
  if (!club) throw new Error('Club not found')
  return club // DUMMY: later, call your API
}

export const getMyClubs = async (): Promise<Club[]> => {
  await delay();
  return mockMyClubsData // DUMMY: later, call your API
}