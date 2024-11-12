// export const baseUrl = "https://071a-103-125-71-60.ngrok-free.app";
// export const baseUrl = "https://eaf0-45-199-187-64.ngrok-free.app";
export const baseUrl = "https://blood-hound.cstmpanel.com";
export const imageUrl = `${baseUrl}/storage/`;
export const profilePicUrl = `${baseUrl}/uploads`

export const apiDataLimit = 10;
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
