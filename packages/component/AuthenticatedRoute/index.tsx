import React, { useState, useEffect } from "react";

interface AuthenticatedRoute {
  onboardingRequired: boolean;
  children: any;
}

export default function AuthenticatedRoute(props) {
  const [state, setState] = useState(false);

  useEffect(function () {
    // here we check onboarding required and then auth state and that stuff
  }, []);

  return state ?? props.children;
}
