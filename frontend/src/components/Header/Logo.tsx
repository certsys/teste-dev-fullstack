import { Text } from "@chakra-ui/react";
import { item, MotionBox } from "../../styles/animation";

export function Logo() {
  return (
    <MotionBox variants={item}>
      <Text
        fontSize={["2xl", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        width="64"
      >
        Imóveis
        <Text as="span" marginLeft="1" color="green.500">
          .
        </Text>
      </Text>
    </MotionBox>
  );
}
