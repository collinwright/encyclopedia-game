import * as React from "react";

import { HeadingLevel, SectionData } from "./types";
import Section from "./Section";

export default (props: { level: HeadingLevel; sections: SectionData[] }) => (
  <>
    {props.sections.map(section => (
      <Section key={section.title} level={props.level} section={section} />
    ))}
  </>
);
