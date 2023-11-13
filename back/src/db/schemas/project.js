import { Schema, model } from 'mongoose';


const ProjectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // projectId: {
    //   type: String,
    //   required: true,
    // },
    projectName: {
      type: String,
      required: true,
    },
    projectDetail: {
      type: String,
      required: true,
    },
    projectImgUrl: {
      type: String, // URL을 저장하는 필드는 일반적으로 String으로 정의
      required: false,
    },
    projectStartDate: {
      type: String,
      required: false,
    },
    projectEndDate: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
