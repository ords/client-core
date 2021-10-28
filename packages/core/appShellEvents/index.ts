import { EventHub } from "../_framework/EventHub";

const DISPLAY_SNACKBAR = "DISPLAY_SNACKBAR";

export interface DisplaySnackbarEventDetail {
  message: string;
}

interface AppShellEventMap {
  [DISPLAY_SNACKBAR]: DisplaySnackbarEventDetail;
}

export const appshellEventHub = new EventHub<AppShellEventMap>();
