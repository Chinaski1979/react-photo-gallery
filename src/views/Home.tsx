import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, Divider, SimpleGrid } from "@chakra-ui/react";
// Components
import Searchbar from "../components/Searchbar/Searchbar";
import CustomCard from "../components/card";

const key = "bPfgiIw4vW72MUt72sWrzfIR4KSMdhe3J0brvyZqoCs";

const fetchPhotos = async (page: number, params: URLSearchParams) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=dog&client_id=${key}&${params}`
  );
  return response.json();
};

function Home() {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { data, fetchNextPage, refetch, isFetchingNextPage } = useInfiniteQuery(
    {
      queryKey: ["photos"],
      queryFn: ({ pageParam }) => fetchPhotos(pageParam, params),
      initialPageParam: 1,
      getNextPageParam: (_, pages) => pages.length + 1,
    }
  );
  const filterOptions = [
    {
      name: "orientation",
      options: ["landscape", "portrait", "squarish"],
    },
    {
      name: "color",
      options: [
        "black_and_white",
        "black",
        "white",
        "yellow",
        "orange",
        "red",
        "purple",
        "magenta",
        "green",
        "teal",
        "blue",
      ],
    },
  ];
  const lastPhotoRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPhotoRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage]);

  const _photos = data?.pages.flatMap((page) => page.results);

  return (
    <Container maxW="6xl" paddingY={20}>
      <Searchbar onSearchButtonClick={refetch} filterOptions={filterOptions} />
      <Divider />
      <SimpleGrid
        columns={{ sm: 2, md: 3 }}
        spacing="40px"
        justifyItems="center"
      >
        {_photos?.map((photo, i) =>
          i === _photos.length - 1 ? (
            <div ref={ref}>
              <CustomCard key={photo.id}  photo={photo}></CustomCard>
            </div>
          ) : (
            <CustomCard key={photo.id} photo={photo}></CustomCard>
          )
        )}
        {isFetchingNextPage && "Loading more..."}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
