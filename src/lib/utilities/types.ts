export enum MeetLocation {
  "Stairs of Tech",
  "Davis Station",
  "Foster Station",
  "Noyes Station",
}

export enum ClimbLocation {
  "Movement Lincoln Park",
  "Movement Wrigleyville",
  "First Ascent",
  "Brooklyn Boulders",
}

export interface Climb {
  meetLocation: MeetLocation;
  meetDate: Date;
  climbLocation: ClimbLocation;
  organizer: { id: string; displayName: string; photoURL: string };
  attendees: { [id: string]: string };
  withClub: Boolean;
}
