import { BsFilter } from "react-icons/bs";
import React from 'react';
import {useRouter} from "next/router";
import {Box,Flex,Text,Icon} from '@chakra-ui/react';
import Image from 'next/image';
import SearchFilters from '../components/SearchFilters';
import Property from "../components/Property";
import { fetchApi,baseUrl } from "../util/fetchApi";
import noresult from '../assets/images/noresult.png'
const Search = ({properties}) => {
    const [searchFilter,setSearchFilter] = React.useState(false);
    const router = useRouter();
    return (
       <Box>
        <Flex 
        cursor="pointer"
        bg="gray.100"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        p="2"
        borderBottom="1px"
        borderColor="gray.200"
        onClick={() => setSearchFilter(prev => !prev)}
        >
            <Text>Search Property By Filters</Text>
            <Icon as={BsFilter} paddingLeft="2" w="7"/>
        </Flex>
        {searchFilter && <SearchFilters/>}
        <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}
        </Text>
        <Flex flexWrap="wrap">
            {properties?.map((property) => <Property key={property.id} property={property}/>)}
        </Flex>
        {properties?.length === 0 && (
            <Flex justifyContent="center" flexDirection="column" alignItems="center" marginTop="5" marginBottom="5">
                <Image alt="no result" src={noresult} width={400} height={300}/>
                <Text fontSize="2xl" marginTop="5">No Results Found</Text>
            </Flex>
        )} 
       </Box>
    )
}
export default Search;

export async function getServerSideProps({query}) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

    return {
        props: {
            properties : data?.hits
        }
    }
}