import {Box, Flex, Spacer ,Avatar,Text} from '@chakra-ui/react'
import millify from 'millify';
import {BsGridFill} from 'react-icons/bs';
import {FaBed, FaBath} from 'react-icons/fa';
import {GoVerified} from 'react-icons/go'; 
import ImageScrollbar from '../../components/ImageScrollbar'
import {fetchApi , baseUrl} from '../../util/fetchApi';

const PropertyDetails = ({propertyDetails : {rooms,price,rentFrequency,title,baths,area,agency,type,isVerified,description,purpose,furnishingStatus, amenities,photos}}) => {
    console.log(rooms);
    return (
        <Box maxWidth="1000px" margin="auto" p="4">
            {photos && <ImageScrollbar data={photos} />}
            <Box w="full" p="6">
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
                <Box marginTop="2">

                </Box>
                <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                    {title}
                </Text>
                <Text lineHeight="2" color="gray.600">
                    {description}
                </Text>
            </Box>
            <Flex flexWrap='wrap' textTransform="uppercase" justifyContent="center">
                <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                    <Text>Type</Text>
                    <Text fontWeight="bold">{type}</Text>
                </Flex>
                <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                    <Text>Purpose</Text>
                    <Text fontWeight="bold">{purpose}</Text>
                </Flex>
                { furnishingStatus && (
                    <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                        <Text>Furnishing Status</Text>
                        <Text fontWeight="bold">{furnishingStatus}</Text>
                    </Flex>
                )
                }
            </Flex>
            <Box>
                {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
                <Flex flexWrap="wrap">
                    {amenities?.map((item) => {
                        return item.amenities.map((amenity) => {
                            return <Text 
                            fontWeight="bold"
                            bg="gray.100"
                            color="blue.400"
                            fontSize="lg"
                            m="2"
                            p="1"
                            borderRadius="5"
                            key={amenity.text}
                            >
                                {amenity.text}
                            </Text>
                        })
                    })}
                </Flex>
            </Box>

        </Box>
    )
}

export default PropertyDetails;
export async function getServerSideProps({params : {id}}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

    return {
        props : {
            propertyDetails : data
        }
    }
}