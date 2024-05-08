# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_05_08_121306) do
  create_table "companies", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", options: "ENGINE=InnoDB ROW_FORMAT=DYNAMIC", force: :cascade do |t|
    t.string "name", null: false
    t.integer "employee_count"
    t.string "industry", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_count"], name: "index_companies_on_employee_count"
    t.index ["industry"], name: "index_companies_on_industry"
    t.index ["name", "industry"], name: "index_companies_on_name_and_industry", unique: true
    t.index ["name"], name: "index_companies_on_name"
  end

  create_table "deals", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", options: "ENGINE=InnoDB ROW_FORMAT=DYNAMIC", force: :cascade do |t|
    t.string "name", null: false
    t.integer "amount"
    t.string "old_status"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.column "status", "enum('pending','won','lost')"
    t.index ["amount"], name: "index_deals_on_amount"
    t.index ["company_id"], name: "index_deals_on_company_id"
  end

  add_foreign_key "deals", "companies"
end
