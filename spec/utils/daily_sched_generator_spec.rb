require 'rails_helper'

RSpec.describe DailyScheduleGenerator do
  it "returns a schedule for every day of given month" do
    month    = 1
    year     = 2015
    subject  = described_class.new(month, year)
    days     = Time.days_in_month(month, year)

    expect(subject.generate_schedule.keys.count).to eq(days)
  end

  it "does not allocate the same department on consecutive days" do
    month    = 7
    year     = 2015
    subject  = described_class.new(month, year)
    days     = Time.days_in_month(month, year)

    # Ignore weekends
    schedule = subject.generate_schedule.select {|k, v| v !=  nil }

    schedule.each_with_index do |(day, department), i|
      expect(department).to_not eq(schedule[schedule.keys[i - 1]])
    end
  end

end
