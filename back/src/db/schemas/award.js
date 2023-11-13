import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
   {
     userId: {
       type: Schema.Types.ObjectId,
       required: true,
       ref: "User",
     },
    //  awardId: {
    //    type: String,
    //    required: true,
    //  },
     awardName: {
       type: String,
       required: true,
     },
     awardDetail: {
       type: String,
       required: true,
     },
     awardOrganization: {
       type: String,
       required: true,
     },
     awardDate: {
       type: String,
       required: true,
     },
   },
   {
     timestamps: true,
   }
 );
 
const AwardModel = model("Award", AwardSchema);

export { AwardModel };