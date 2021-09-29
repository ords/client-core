import { DependencyManager } from "./DependencyManager";

export interface Authorization {
  authenticated: boolean;
}

export interface PersonalProfile {
  /**
   * Group which this profile belongs to
   */
  groupCode: number;
  onboardingCompleted: boolean;
}

export const dependencyManager = new DependencyManager<{
  authorization: Authorization;
  personalProfile: PersonalProfile;
}>();

async function resolve() {
  const data = await dependencyManager.resolve("personalProfile");

  data.groupCode;
}
