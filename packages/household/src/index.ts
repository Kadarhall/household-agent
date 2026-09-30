export type HouseholdMember = {
  id: string;
  name: string;
};

export type Responsibility = {
  id: string;
  name: string;
  memberId: string;
};
