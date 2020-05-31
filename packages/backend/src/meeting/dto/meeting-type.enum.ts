import {registerEnumType} from "@nestjs/graphql";

export enum MeetingTypeEnum {
  Offline = "offline",
  Online = "online",
}

registerEnumType(MeetingTypeEnum, {
  name: "MeetingTypeEnum",
});
