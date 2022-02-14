import React from "react";
import Card from "../../components/Card";
import { Grid ,Box,Button,Flex} from "@chakra-ui/react";
import { useInfiniteQuery } from 'react-query'
import {fetchProductList} from "../../api"
function Products() {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('product',
   fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
   
      const morePageExist=lastGroup.length=12;

if(!morePageExist){
  return
}
     return allGroups.length+1;
  }
  })
if (status==="loading") return 'Loading...'

if (status==="error") return 'An error has occurred: ' + error.message
console.log(process.env.REACT_APP_BASE_ENDPOINT);

  return (
    <div>
      <Grid templateColumns="repeat(3,1fr)" gap={4}>
  
       {data.pages.map((group,i)=>(
       <>
       {group.map((item)=>(
			<Box w="100%" key={item._id}>     
          <Card item={item} />
         </Box>
       ))}     
         </>
        ) )}
         </Grid>

    	<Flex mt="10" justifyContent="center">
				<Button
					onClick={() => fetchNextPage()}
					isLoading={isFetchingNextPage}
					disabled={!hasNextPage || isFetchingNextPage}
				>
					{isFetchingNextPage
						? "Loading more..."
						: hasNextPage
						? "Load More"
						: "Nothing more to load"}
				</Button>
			</Flex>
   
       
    
 
    </div>
  );
}

export default Products;
