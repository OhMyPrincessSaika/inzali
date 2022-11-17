import millify from 'millify';
import {BsGridFill} from 'react-icons/bs';
import {FaBed, FaBath} from 'react-icons/fa';
import {GoVerified} from 'react-icons/go';
import {Box , Flex, Text, Avatar} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from '../assets/images/house.jpg'

const Property = ({property : {price,externalID,coverPhoto,rentFrequency,rooms,title,baths,area,agency,isVerified}}) => {
    return  (
        <Link href={`/property/${externalID}`} passHref>
          <Flex flexWrap="wrap" w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer" >
            <Box>
                <Image src={coverPhoto ? coverPhoto.url : defaultImage} width={400} height={200}  alt="house" style={{aspectRatio: '3/2'}} />
            </Box>
            <Box w="full"> 
                <Flex alignItems="center"  justifyContent="space-between" paddingTop="2">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">{<GoVerified/>}</Box>
                        <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                    </Flex>
                    <Box>
                        <Avatar src={agency?.logo?.url} size="sm"/>
                    </Box>
                </Flex>
                <Flex  alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {rooms} <FaBed/> | {baths}<FaBath/> |  {millify(area)} sqft <BsGridFill/>
                </Flex>
                <Text fontSize="lg">
                    {title.length > 30 ? `${title.substring(0,30)}...` : title}
                </Text>
            </Box>
          </Flex>
        </Link>
    )
}
export default Property;