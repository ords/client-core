import { ObservableState } from "./ObservableState";
import { EventHub } from "./EventHub";

export interface AppShellContext {
  title: string;
  container: "none" | "main";
}

export const appShellContext = new ObservableState<AppShellContext>({
  title: "Loading",
  container: "none",
});

const DISPLAY_SNACKBAR = "DISPLAY_SNACKBAR";

export interface DisplaySnackbarEventDetail {
  message: string;
}

interface AppShellEventMap {
  [DISPLAY_SNACKBAR]: DisplaySnackbarEventDetail;
}

export const appshellEventHub = new EventHub<AppShellEventMap>();