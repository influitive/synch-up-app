require 'rails_helper'
require 'acceptance/pages/home_page'

RSpec.describe "homepage", type: :feature, js: true do
  let(:page) { HomePage.new }

  before do
    page.load
  end

  it "renders the homepage" do
    expect(page).to have_content("It worked!")
  end
end
