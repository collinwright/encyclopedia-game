import * as React from "react";
import { Api } from "../../wikimedia";

import SectionGroup from "./SectionGroup";
import { SectionData } from "./types";
import { LinkSet } from "./Link";

export default (props: { title: string }) => {
  const api = React.useContext(Api);
  const [article, setArticle] = React.useState<{
    summary: string;
    sections: SectionData[];
    links: string[];
  }>(null);
  React.useEffect(() => {
    const work = async () => {
      const page = await api.page(props.title);

      const [summary, sections, links] = await Promise.all([
        page.summary(),
        page.content(),
        page.links()
      ]);

      setArticle({ summary, sections, links });
    };

    work();
  }, [props.title]);

  return (
    <article>
      {article ? (
        <LinkSet links={article.links}>
          <summary>{article.summary}</summary>
          <SectionGroup level={1} sections={article.sections} />
        </LinkSet>
      ) : (
        "Loading..."
      )}
    </article>
  );
};
