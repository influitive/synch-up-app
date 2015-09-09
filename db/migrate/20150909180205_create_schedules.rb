class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.integer :month, null: false
      t.integer :year,  null: false
      t.text :schedule, default: "[]"

      t.timestamps null: false
    end

    add_index :schedules, [:month, :year]
  end
end
