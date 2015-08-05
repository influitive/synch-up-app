source "https://rubygems.org"

gem "rails"
gem "active_model_serializers"
gem "pg"
gem "puma"

group :development, :test do
  gem "dotenv-rails"

  gem "pry-byebug"
  gem "pry-rails"

  gem "guard"
  gem "guard-rspec"
  gem "terminal-notifier-guard"
  gem "terminal-notifier"
end

group :test do
  gem "rspec-rails"
  gem "factory_girl_rails"
  gem "capybara"
  gem "site_prism"
  gem "poltergeist"
end

group :development do
  gem "foreman"
  # source "http://<username>:<password>@gems.internal.influitive.com" do
  #   gem "infl-toolbelt"
  # end
end
