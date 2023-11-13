export type HackConfig = {
  hackId: number;
  isAuthenticated: boolean;
  hasSecret: boolean;
  component: string;
};

const configs: Omit<HackConfig, "hackId">[] = [
  {
    component: "Intro",
    isAuthenticated: false,
    hasSecret: false,
  },
  {
    component: "UrlManipulation",
    isAuthenticated: false,
    hasSecret: false,
  },
  {
    component: "DisabledAttribute",
    isAuthenticated: true,
    hasSecret: false,
  },
  {
    component: "CommonlyUsedPasswords",
    isAuthenticated: true,
    hasSecret: false,
  },
  {
    component: "PasswordAsComment",
    isAuthenticated: true,
    hasSecret: false,
  },
  {
    component: "Secret",
    isAuthenticated: true,
    hasSecret: true,
  },
  {
    component: "ExtraChallenge",
    isAuthenticated: true,
    hasSecret: false,
  },
];

export const hackConfigs: HackConfig[] = configs.map((c, i) => ({
  hackId: i,
  ...c,
}));
