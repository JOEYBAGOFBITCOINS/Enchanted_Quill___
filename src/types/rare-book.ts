export interface RareBook {
  id: string;
  title: string;
  author: string;
  year: number;
  price: number;
  imageUrl: string;
  provenance: string;
  condition: string;
  conditionGrade: string;
  description: string;
  appraisalSummary: string;
  verified: boolean;
  slug: string;
}

export interface EscrowFee {
  range: string;
  fee: number;
}
