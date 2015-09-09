class Schedule < ActiveRecord::Base
  serialize :schedule, Array
end
