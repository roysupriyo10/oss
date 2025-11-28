type IMvOptions = {
  source: string | string[];
  destination: string;
};

type IMv = (options: IMvOptions) => Promise<void>;

export type { IMv };
