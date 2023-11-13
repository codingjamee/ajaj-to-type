import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // eduId: {
    //   type: String,
    //   required: true,
    // },
    schoolName: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: String,
      required: true,
    },
    graduationDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
