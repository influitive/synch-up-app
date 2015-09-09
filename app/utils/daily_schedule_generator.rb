class DailyScheduleGenerator
  def initialize(month, year)
    @month                  = month
    @year                   = year

    @two_index              = 0 # index to keep track of departments that should be allocated two times
    @four_index             = 0 # index to keep track of departments that should be allocated four times
  end

  def generate_schedule()
    total_days = Time.days_in_month(@month, @year)
    schedule = [*1..total_days].map do |day|
                  {
                     date: format_day(day),
                     department: allocate_department(day)
                  }
               end
  end

  def four_time_departments
    @four_time_departments ||= ['Dev', 'PM/Design', 'Marketing', 'Sales', 'CS'].shuffle
  end

  def two_time_departments
    @two_time_departments ||= ['Finance/Ops', 'B/D'].shuffle
  end

  def allocate_department(day)
    date = Date.new(@year, @month, day)

    if date.saturday? || date.sunday?
      return ''
    elsif date.monday?
      department = two_time_departments[@two_index % (two_time_departments.length)]
      @two_index = @two_index + 1
      return department
    end

    department  = four_time_departments[@four_index % (four_time_departments.length)]
    @four_index = @four_index + 1
    return department
  end

  def format_day(day)
    DateTime.new(@year, @month, day).strftime("%A, %B %d, %Y")
  end
end

__END__

data = {
  1: 'Dev'
  2: 'B/D'
  3:
  4:
}

4 times:
Dev
PM/Design
Marketing
Sales
CS

2 times:
Finance /Ops
B/D


1 time:
Executive Office
Talent
