import { Card, CardFooter, Flex, Image } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: string;
  description: string;
  urls: {
    small: string;
  };
  user: {
    name: string;
  };
  likes: number;

}

interface IProps {
  photo: Photo;
}

const CustomCard = ({ photo }: IProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleNavigate = () => {
    queryClient.setQueryData(["detail-photo"], () => photo);
    navigate(`/detail-photo/${photo.id}`);
  };

  return (
    <Card maxW="sm" w="fit-content">
      <Image
        objectFit="cover"
        maxH="300px"
        src={photo.urls.small}
        alt={photo.description}
        onClick={handleNavigate}
        cursor="pointer"
      />

      <CardFooter justify="space-between" gap={3} flexDir="column">
        <p>{photo.description || "No description"}</p>
        <Flex justify="space-between">
          <p>{photo.user.name}</p>
          <p>{photo.likes} likes</p>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
