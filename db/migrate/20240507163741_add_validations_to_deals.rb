class AddValidationsToDeals < ActiveRecord::Migration[7.0]
  def up
    change_column_null :deals, :name, false
    rename_column :deals, :status, :old_status
    execute <<-SQL
      ALTER TABLE deals ADD status ENUM('pending', 'won', 'lost');
    SQL
  end

  def down
    change_column_null :deals, :name, true
    remove_column :deals, :status
    rename_column :deals, :old_status, :status
  end
end
