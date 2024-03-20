import {
    Card,
    CardBody,
    Container,
    Heading,
    Image,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { useQueryClient } from "@tanstack/react-query";
  
  const PhotoDetail = () => {
    const photo = useQueryClient().getQueryData<any>(["detail-photo"])!;
  
    return (
      <Container maxW="6xl" paddingY={10}>
        <Card overflow="hidden" variant="outline" alignItems={"center"}>
          <CardBody>
            <Image objectFit="cover" height="600px" src={photo?.urls?.small} />
            <Stack>
              <Heading size="md">{photo?.user.name}</Heading>
              <Text py="2">{photo?.description || ""}</Text>
              <Text color='blue.600' fontSize='2xl'>
                {photo?.likes} likes
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    );
  };
  
  export default PhotoDetail;
