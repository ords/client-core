import { DependencyManager } from "../_framework/DependencyManager";

import { Authorization } from "./Authorization";
import { PersonalProfile } from "./PersonalProfile";

export const dependencyManager = new DependencyManager<{
  authorization: Authorization;
  personalProfile: PersonalProfile;
}>();
