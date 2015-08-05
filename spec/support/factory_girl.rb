# Support create(:obj) rather than FactoryGirl.create(:obj)
RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
