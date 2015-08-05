# precompile assets
# NOTE *must* be done before requiring rails so sprockets picks these up
load "tasks/assets.rake"

Rake::Task["assets:test:precompile"].invoke

RSpec.configure do |config|
  config.after(:suite) do
    Rake::Task["assets:clobber"].invoke
  end
end
