require 'rake'

# lib/tasks/assets.rake
# Use webpack compilation instead of sprockets
# Note that in tests... this task isn't yet defined, so ignore exceptions
Rake::Task["assets:precompile"].clear rescue nil

namespace :assets do
  task :precompile do
    sh "mkdir -p public/assets"
    sh "webpack -p --config webpack.config.js"
  end

  namespace :test do
    task :precompile do
      sh "mkdir -p public/assets"
      sh "webpack --config webpack.config.js"
    end
  end
end
