export const useMe = async (token: string) => {
  const BACKEND_URL = process.env.BACKEND_URL;
  const user = await (
    await fetch(`${BACKEND_URL}/user`, {
      headers: {
        "x-jwt": token,
      },
    })
  ).json();
  return user;
};
