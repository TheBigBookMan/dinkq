import type { ClubSettingsValues } from '../features/clubs/type'

export const mockClubSettings: ClubSettingsValues = {
  autoCreateNextSession: false,
  autoInvite: false,
  autoInviteWho: 'last-session',
  defaultCourts: 4,
  sessionHours: 3,
  pricePerSession: 150,
  selfCheckIn: true,
  allowGuests: true,
  trackPayments: true,
  avoidRepeatPartners: true,
  matchOnLevel: true,
  showRatingsToPlayers: false,
  approveNewMembers: false,
}