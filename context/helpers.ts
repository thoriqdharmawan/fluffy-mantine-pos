const getInitials = (name: string) => {
  let nameArray = name.split(' ');
  let initials = '';

  for (let i = 0; i < nameArray.length && i < 2; i++) {
    initials += nameArray[i].charAt(0).toUpperCase();
  }

  return initials;
};

const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

function convertToRupiah(nominal: number) {
  return idrFormatter.format(nominal);
}

interface Variants {
  name?: string;
  values: string[];
}

const getVariants = (variants: Variants[], coord: number[]) => {
  const variant1 = variants?.[0]?.values?.[coord?.[0] || 0];
  const variant2 = variants?.[1]?.values?.[coord?.[1] || 0];
  const variant = [variant1, variant2].filter((v) => v);

  return variant;
};

export { getInitials, convertToRupiah, getVariants };
