import { TextInput, TextInputProps, ActionIcon } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';

const SearchBar = (props: TextInputProps) => {
  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      w="100%"
      rightSectionWidth={42}
      {...props}
    />
  );
};

export default SearchBar;
