export type Club = { 
  clubId: string; 
  clubName: string; 
  clubIcon: string | null;
  playerCount: number;
  description: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: string;
}

export type NewClub = {
  clubName: string;
  clubIcon?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}