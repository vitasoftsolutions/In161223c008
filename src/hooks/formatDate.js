// Function to format the date string
export const formatDate = (props) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(props).toLocaleDateString(undefined, options);
};
