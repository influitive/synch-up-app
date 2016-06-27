class AddEmailAndTopicToSchedule < ActiveRecord::Migration
  def up
    Schedule.all.map do |s|
      sched      =    s.schedule
      s.schedule = sched.map{|d| d.merge("email" => "", "topic" => "") }
      s.save
    end
  end

  def down
  end

end
