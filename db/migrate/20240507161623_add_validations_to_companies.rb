class AddValidationsToCompanies < ActiveRecord::Migration[7.0]
  def change
    change_column_null :companies, :name, false
    change_column_null :companies, :industry, false
    add_index :companies, %i[name industry], unique: true
  end
end
