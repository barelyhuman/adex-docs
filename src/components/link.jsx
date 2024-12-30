let baseURL = import.meta.env.BASE_URL;
baseURL = baseURL.endsWith("/") ? baseURL : baseURL + "/";

export const Link = ({ href, ...props }) => {
  const url = (baseURL + href).replace(/\/{2,}/, "/");
  return (
    <a
      href={url}
      target="_self"
      {...props}
    ></a>
  );
};
