if Rails.env.development?
  React::Rails::HotLoader::AssetChangeSet.asset_glob = '**/*.{js,jsx,rb, es6}*'
end