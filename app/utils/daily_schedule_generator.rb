class DailyScheduleGenerator
  def initialize(month, year)
    @month                  = month
    @year                   = year

    @four_index             = 0 # index to keep track of departments that should be allocated four timesi
    @allocated_days         = []
  end

  def generate_schedule
    schedule = Schedule.where(month: @month, year: @year).first_or_create do |s|
      s.schedule = schedule_helper
    end
    schedule.schedule
  end

  private

  def schedule_helper
    schedule = days_in_month.map {|day| {date: format_day(day), department: allocate_department(day)}}

    schedule[random_relevant_day - 1][:department] = 'B/D'
    schedule[random_relevant_day - 1][:department] = 'Talent'
    schedule[random_relevant_day - 1][:department] = 'Finance/Ops'
    schedule[random_relevant_day - 1][:department] = 'Finance/Ops'

    schedule
  end

  def four_time_departments
    @four_time_departments ||= ['Dev', 'PM/Design', 'Marketing', 'Sales', 'CS'].shuffle
  end

  def allocate_department(day)
    date = Date.new(@year, @month, day)
    if date.saturday? || date.sunday?
      return ''
    end

    department  = four_time_departments[@four_index % (four_time_departments.length)]
    @four_index = @four_index + 1
    return department
  end

  def format_day(day)
    DateTime.new(@year, @month, day).strftime("%A, %B %d, %Y")
  end

  def days_in_month
    @days_in_month ||= [*1..Time.days_in_month(@month, @year)]
  end

  def relevant_days
    days_in_month.reject do |day|
      date = Date.new(@year, @month, day)
      date.saturday? || date.sunday?
    end
  end

  def random_relevant_day
    day = relevant_days.sample

    #Prevent collisions by storing state
    while @allocated_days.include?(day)
      day = relevant_days.sample
    end
    @allocated_days.push(day)

    day
  end
end
