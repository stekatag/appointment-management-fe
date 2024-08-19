import { Container } from "@mui/material";
import { Face, ContentCut, InsertEmoticon, History } from "@mui/icons-material";
import {
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel,
  StatItemInner,
  StatIcon,
} from "./StatsSection.styles";

export default function StatsSection() {
  return (
    <Container maxWidth="lg">
      <StatsContainer>
        <StatItem>
          <StatIcon as={ContentCut} />
          <StatItemInner>
            <StatNumber>20</StatNumber>
            <StatLabel>Skilled Barbers</StatLabel>
          </StatItemInner>
        </StatItem>
        <StatItem>
          <StatIcon as={InsertEmoticon} />
          <StatItemInner>
            <StatNumber>120</StatNumber>
            <StatLabel>Happy Clients</StatLabel>
          </StatItemInner>
        </StatItem>
        <StatItem>
          <StatIcon as={Face} />
          <StatItemInner>
            <StatNumber>230</StatNumber>
            <StatLabel>Custom Haircuts</StatLabel>
          </StatItemInner>
        </StatItem>
        <StatItem>
          <StatIcon as={History} />
          <StatItemInner>
            <StatNumber>15</StatNumber>
            <StatLabel>Years Experience</StatLabel>
          </StatItemInner>
        </StatItem>
      </StatsContainer>
    </Container>
  );
}
