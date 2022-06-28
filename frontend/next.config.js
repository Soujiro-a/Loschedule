/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    backendUrl:process.env.BACKEND_URL
  }
}
