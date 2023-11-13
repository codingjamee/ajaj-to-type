import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
   {
     userId: {
       type: Schema.Types.ObjectId,
       required: true,
       ref: "User",
     },
    //  certificateId: {
    //    type: String,
    //    required: true,
    //  },
     certificateName: {
       type: String,
       required: true,
     },
     certificateDetail: {
      type: String,
      required: false,
    },
     certificateOrganization: {
       type: String,
       required: true,
     },
     acquisitionDate: {
       type: String,
       required: true,
     },
   },
   {
     timestamps: true,
   }
 );
 
const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };