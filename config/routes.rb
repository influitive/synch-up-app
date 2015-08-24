Rails.application.routes.draw do
  root to: redirect('/home')


  namespace :api do
    #resources :schedule, only: [:show]
    get '/schedule' => "schedules#show"
  end

  get '/*whatever' => 'home#index', constraints: ->(req) { req.format.html? }
end
