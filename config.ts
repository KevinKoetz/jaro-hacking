export type HackConfig = {
  hackId: number;
  isAuthenticated: boolean;
  hasSecret: boolean;
  component: string;
};

const configs: Omit<HackConfig, "hackId">[] = [
  {
    component: "UrlManipulation",
    isAuthenticated: false,
    hasSecret: false,
  },
  {
    component: "PasswordAsComment",
    isAuthenticated: false,
    hasSecret: true,
  },
  {
    component: "DisabledAttribute",
    isAuthenticated: true,
    hasSecret: true,
  },
  {
    component: "CommonlyUsedPasswords",
    isAuthenticated: true,
    hasSecret: true,
  },
];

export const hackConfigs: HackConfig[] = configs.map((c, i) => ({
  hackId: i,
  ...c,
}));
