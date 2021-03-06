# The webpack task must run before assets:environment task.
# Otherwise Sprockets cannot find the files that webpack produces.
# credit where it's due: http://www.tomdooner.com/2014/05/26/webpack.html

Rake::Task['assets:precompile']
    .clear_prerequisites
    .enhance(['assets:compile_environment'])

namespace :assets do
  task :compile_environment => :webpack do
    Rake::Task['assets:environment'].invoke
  end

  desc 'Compile assets with webpack'
  task :webpack do
    sh "NODE_ENV=#{Rails.env} $(npm bin)/webpack --config webpack-#{Rails.env}.config.js --progress"
  end

  namespace :webpack do
    desc 'compile with webpack and watch for changes'
    task :watch do
      sh "NODE_ENV=#{Rails.env} $(npm bin)/webpack --config webpack-#{Rails.env}.config.js --progress --watch"
    end
  end
end