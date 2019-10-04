import wikijs from "wikijs";

export type Options = {
  apiEndpoint?: string | null;
};

export default (options: Options) => {
  const client = wikijs({ apiUrl: options.apiEndpoint || "/w/api.php" });

  return {
    findArticlePair: async () => {
      const [start, end] = await client.random(2);
      return [start, end];
    }
  };
};
