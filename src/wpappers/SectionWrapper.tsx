import { ISectionW } from "../types/Types";
import {
  ContentWrapper,
  Section,
  SectionBackground,
  SectionBorder,
  Content,
} from "../css/UnityDataBase.styled";

export default function SectionWrapper(props: ISectionW) {
  const { background, content } = props;
  return (
    <Section>
      <SectionBorder>
        <SectionBackground>{background}</SectionBackground>
      </SectionBorder>
      <ContentWrapper>
        <Content>{content}</Content>
      </ContentWrapper>
    </Section>
  );
}
