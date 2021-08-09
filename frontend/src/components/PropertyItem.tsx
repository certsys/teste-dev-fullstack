import Link from 'next/link';
import { memo } from 'react';
import {
  Divider,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react';
import { RiHotelLine } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';

import { item, MotionBox } from '../styles/animation';
import { Button } from './Button';


type Property = {
  id: string;
  title: string;
  value: number;
  city: string;
  uf: string;
};

interface PropertyItemProps {
  property: Property;
  isActive?: boolean;
}

function PropertyItemComponent({ property, isActive = false }: PropertyItemProps) {
  return (
    <MotionBox
      variants={item}
      width="100%"
      height="100%"
      borderRadius={8}
      background="gray.800"
      border="2px"
      color="gray.700"
      shadow="3xl"
      // boxShadow="3xl"

      flexWrap="wrap"
      minWidth="0"
    >
      <Flex justifyContent="flex-start" alignItems="center" padding={6}>
        <Flex
          alignItems="center"
          justifyContent="center"
          borderRadius={8}
          height="4rem"
          width="4rem"
          marginRight="1rem"
          background="gray.700"
        >
          <Icon as={RiHotelLine} boxSize="2rem" color="white" />
        </Flex>
        <Text
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          margin="0"
          color="white"
          fontSize="1rem"
        >
          {property.title}
        </Text>
      </Flex>
      <Flex paddingX={6} paddingBottom={4} flexDirection="column">
        <Flex flexDirection="row">
          <Text color="white" fontWeight="medium" flexDirection="row">Preço: </Text>
          <Text color="white" fontWeight="semibold" marginLeft="0.5rem">{property.value}</Text>
        </Flex>
        <Flex flexDirection="row">
          <Text color="white" fontWeight="medium" flexDirection="row">Localização: </Text>
          <Text
            color="white"
            fontWeight="semibold"
            marginLeft="0.5rem"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >{property.city} / {property.uf}</Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex padding={4} justifyContent="center" alignItems="center">
        <Link href={`/home/${property.id}`}>
          <a>
            <Button
              color="green.400"
              title="Ver detalhes"
              icon={AiOutlineEye}
              handle={() => { }}
            />
          </a>
        </Link>
      </Flex>
    </MotionBox>
  );
}

export const PropertyItem = memo(PropertyItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.property.id, nextProps.property.id);
})