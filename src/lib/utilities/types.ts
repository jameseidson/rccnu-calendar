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
  organizer: { string: string };
  attendees: { [id: string]: string };
  withClub: Boolean;
}

export interface Profile {
  displayName: string;
  email: string;
  photoURL: string;
}
