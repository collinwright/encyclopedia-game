import wikijs from "wikijs";

export type Options = {
  apiEndpoint: string;
  maximumDistance: number;
  minimumDistance: number;
};

export interface ArticlePair {
  start: string;
  end: string;
  distance: number;
}

const DEFAULT_OPTIONS: Options = {
  apiEndpoint: "/w/api.php",
  maximumDistance: 4,
  minimumDistance: 2
};

export default (customOptions: Partial<Options>) => {
  const options: Options = {
    ...DEFAULT_OPTIONS,
    ...customOptions
  };
  const client = wikijs({ apiUrl: options.apiEndpoint });

  const linkCandidatesForTitle = async (title: string) => {
    const page = await client.page(title);
    const links = await page.links();

    for (let i = links.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [links[i], links[j]] = [links[j], links[i]];
    }

    return links;
  };

  return {
    findArticlePair: async (): Promise<ArticlePair> => {
      while (true) {
        const [start] = await client.random(1);

        let trail = [start];
        let candidates = [await linkCandidatesForTitle(start)];

        while (
          candidates.length > 0 &&
          trail.length < options.maximumDistance
        ) {
          const links = candidates[candidates.length - 1];

          const candidate = links.pop();
          if (candidate == null) {
            candidates.pop();
            continue;
          }
          if (!trail.includes(candidate)) {
            trail.push(candidate);
            candidates.push(
              await linkCandidatesForTitle(candidate).then(newLinks =>
                newLinks.filter(
                  link =>
                    !candidates.some(listOfLinks => listOfLinks.includes(link))
                )
              )
            );
          }
        }

        if (trail.length >= options.minimumDistance) {
          return {
            start,
            end: trail[trail.length - 1],
            distance: trail.length - 1
          };
        }
      }
    }
  };
};
