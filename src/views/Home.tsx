import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { UNSPLASH_KEY, FILTER_OPTIONS } from "../constants";

// Components
import Searchbar from "../components/Searchbar";
import GridCard from "../components/GridCard";

const fetchPhotos = async (page: number, params: URLSearchParams) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?page=${page}&query=dog&client_id=${UNSPLASH_KEY}&${params}`
  );
  return response.json();
};

function Home() {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { data, fetchNextPage, refetch, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["photos"],
    queryFn: ({ pageParam }) => fetchPhotos(pageParam, params),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
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
      <Searchbar onSearchButtonClick={refetch} filterOptions={FILTER_OPTIONS} />
      <SimpleGrid
        spacing="10px"
        minChildWidth='300px'
        justifyItems="center"
      >
        {_photos?.map((photo, i) =>
          i === _photos.length - 1 ? (
            <div key={photo.id} ref={ref}>
              <GridCard photo={photo}></GridCard>
            </div>
          ) : (
            <GridCard key={photo.id} photo={photo}></GridCard>
          )
        )}
        {isFetchingNextPage && "Loading more..."}
      </SimpleGrid>
    </Container>
  );
}

export default Home;
