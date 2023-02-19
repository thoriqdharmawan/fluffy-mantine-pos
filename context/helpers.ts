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

export { getInitials, convertToRupiah };
