import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Container,
    Heading,
    Image,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { useQueryClient } from "@tanstack/react-query";
  
  const DetailPhoto = () => {
    const photo = useQueryClient().getQueryData<any>(["detail-photo"])!;
  
    return (
      <Container maxW="6xl" paddingY={10}>
        <Card overflow="hidden" variant="outline" alignItems={"center"}>
          <Image
            objectFit="cover"
            height="600px"
            src={photo?.urls?.small}
            alt="Caffe Latte"
          />
  
          <Stack>
            <CardBody>
              <Heading size="md">{photo.user.name}</Heading>
              <Text py="2">{photo.description || "No description"}</Text>
            </CardBody>
  
            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                {photo.likes} likes
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Container>
    );
  };
  
  export default DetailPhoto;
  