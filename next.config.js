const nextConfig = {
  experimental: {
    appDir: false,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    return config
  }
}

module.exports = nextConfig



