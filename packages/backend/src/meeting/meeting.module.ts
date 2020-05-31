import {Module} from "@nestjs/common";
import {MeetingService} from "./meeting.service";
import {MeetingResolver} from "./meeting.resolver";
import {MongooseModule} from "@nestjs/mongoose";
import {MeetingSchema} from "./meeting.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "meeting",
        schema: MeetingSchema,
      },
    ]),
  ],
  providers: [MeetingService, MeetingResolver],
})
export class MeetingModule {}
