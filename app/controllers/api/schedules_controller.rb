module Api
  class SchedulesController < ApplicationController


    #GET  /schedule/
    def show
      month = params[:month].to_i
      year = params[:year].to_i

      schedule = DailyScheduleGenerator.new(month, year).generate_schedule

      render json: schedule, root: false
    end

  end
end

__END__

{
  month: '',
  year:
}
