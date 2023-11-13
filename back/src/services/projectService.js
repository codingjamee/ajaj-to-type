import { Project } from "../db"; // Project 모델을 import

class projectAuthService {
  static async addProject( projectInfo ) {
    const newProject = { ...projectInfo };
    const createdNewProject = await Project.create({ newProject });
    return createdNewProject;
  };

  static async checkProject({ projectId }) {
    const user = await Project.checkProjectId({ projectId });
    return user;
  };

  static async getProjects({ userId }) {
    const projects = await Project.findAll({ userId });
    return projects;
  };

  static async getProject({ projectId }) {
    const project = await Project.findByProjectId({ projectId });
    return project;
  };

  static async setProject({ projectId, toUpdate }) {
    console.log('Service_projectId', projectId)
    let project = await Project.findByProjectId({ projectId });

    // DB에서 찾지 못한 경우, 에러 메시지 반환
    if (!project) {
      const errorMessage = "해당 프로젝트가 존재하지 않습니다";
      return { errorMessage };
    }

    // 업데이트 대상에 projectName이 있다면 업데이트 진행
    if (toUpdate.projectName) {
      const fieldToUpdate = "projectName";
      const newValue = toUpdate.projectName;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.projectDetail) {
      const fieldToUpdate = "projectDetail";
      const newValue = toUpdate.projectDetail;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.projectImgUrl) {
      const fieldToUpdate = "projectImgUrl";
      const newValue = toUpdate.projectImgUrl;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.projectStartDate) {
      const fieldToUpdate = "projectStartDate";
      const newValue = toUpdate.projectStartDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    if (toUpdate.projectEndDate) {
      const fieldToUpdate = "projectEndDate";
      const newValue = toUpdate.projectEndDate;
      project = await Project.update({ projectId, fieldToUpdate, newValue });
    }

    return project;
  }

  static async deleteProject({ projectId }) {
    const result = await Project.delete({ projectId });
    return result;
  }
}

export { projectAuthService };
