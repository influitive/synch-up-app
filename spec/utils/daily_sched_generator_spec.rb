require 'rails_helper'

RSpec.describe DailyScheduleGenerator do
  it "returns a schedule for every day of given month" do
    month    = 1
    year     = 2015
    subject  = described_class.new(month, year)
    days     = Time.days_in_month(month, year)

    expect(subject.generate_schedule.count).to eq(days)
  end

  it "does not allocate the same department on consecutive days" do
    month    = 7
    year     = 2015
    subject  = described_class.new(month, year)
    days     = Time.days_in_month(month, year)

    # Ignore weekends
    schedule = subject.generate_schedule.select {|item| item[:department] !=  "" }

    schedule.each_with_index do |item, i|
      department          = item[:department]
      previous_department = schedule[i - 1][:department]
      expect(department).to_not eq(previous_department)
    end
  end
end
