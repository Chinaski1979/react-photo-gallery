import React from "react";
import { InputGroup, Stack, Select, Box, Text, Button } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

interface IFilter {
  name: string;
  options: string[];
}

interface SearchbarProps {
  onSearchButtonClick: () => void;
  filterOptions: IFilter[];
}

const Searchbar: React.FC<SearchbarProps> = ({
  onSearchButtonClick,
  filterOptions,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (
    filter: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.currentTarget;
    const newSearchParams = new URLSearchParams(searchParams);
    value ? newSearchParams.set(filter, value) : newSearchParams.delete(filter);
    setSearchParams(newSearchParams);
  };

  return (
    <Box position="relative" paddingBottom="10">
      <Stack w="40%">
        <InputGroup gap={2} alignItems="center">
          <Text fontSize="xl">Filters: </Text>
          {filterOptions.map((filter, i) => (
            <Select
              key={i}
              placeholder={filter.name}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange(filter.name, event)}
            >
              {filter.options.map((option, k) => (
                <option key={k} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ))}
          <Button
            colorScheme="teal"
            paddingX={8}
            size="md"
            onClick={onSearchButtonClick}
          >
            Search
          </Button>
        </InputGroup>
      </Stack>
    </Box>
  );
};

export default Searchbar;
