module Api
  class SchedulesController < ApplicationController
    def show
      month = params[:month].to_i
      year = params[:year].to_i

      schedule = DailyScheduleGenerator.new(month, year).generate_schedule

      render json: schedule, root: false
    end

    def update
      schedule = Schedule.find_by(month: params[:month].to_i, year: params[:year].to_i )
      if schedule.present?
        schedule.update(schedule: JSON.parse(params[:schedule]))
      end

      render json: {status: "ok"}
    end
  end
end

__END__

{
  month: '',
  year:
}
