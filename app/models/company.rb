class Company < ApplicationRecord
  has_many :deals

  validates :name, presence: true
  validates :industry, presence: true
  validates :name, uniqueness: { scope: :industry, case_sensitive: false }
end
