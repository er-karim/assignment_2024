class Company < ApplicationRecord
  has_many :deals

  validates :name, presence: true
  validates :industry, presence: true
  validates :name, uniqueness: { scope: :industry, case_sensitive: false }

  scope :by_name, lambda { |name|
    where('companies.name LIKE ?', "%#{sanitize_sql_like(name)}%") if name.present?
  }

  scope :by_industry, lambda { |industry|
    where('companies.industry LIKE ?', "%#{sanitize_sql_like(industry)}%") if industry.present?
  }

  scope :by_employee_count, lambda { |employee_count|
    having('employee_count >= ?', employee_count) if employee_count.present?
  }
end
