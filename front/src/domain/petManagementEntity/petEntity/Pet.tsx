import { MediaFile } from "../../../shared/models/dto/MediaFile";
import { Requisite } from "../../../shared/models/dto/Requisite";

export type Pet = {
  id: string;
  name: string;
  speciesId: string;
  description: string;
  breedId: string;
  color: string;
  shelterId: string;
  weight: number;
  isCastrated: boolean;
  birthDate: string;
  isVaccinated: boolean;
  status: string;
  volunteerId: string;
  requisites: Requisite[];
  avatar: MediaFile;
};
