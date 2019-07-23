import * as React from "react";

import { HeadingLevel, SectionData } from "./types";
import SectionGroup from "./SectionGroup";
import { LinkedText } from "./Link";

export default (props: { level: HeadingLevel; section: SectionData }) => {
  const Heading: React.Component<any> = ("h" + props.level) as any;

  return (
    <section>
      <Heading>{props.section.title}</Heading>
      <LinkedText onLinkSelected={() => {}}>{props.section.content}</LinkedText>
      {props.section.items && (
        <SectionGroup
          level={(props.level + 1) as HeadingLevel}
          sections={props.section.items}
        />
      )}
    </section>
  );
};
