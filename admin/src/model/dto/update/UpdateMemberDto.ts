import { MemberStatus } from "@src/model/type/MemberType";

export interface UpdateMemberDto {   
   gender: string;
   birthDate: string;
   status: MemberStatus;
   uuid: string;
}
