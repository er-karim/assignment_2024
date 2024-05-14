class Deal < ApplicationRecord
  belongs_to :company

  validates :name, presence: true
  enum status: {
    pending: 'pending',
    won: 'won',
    lost: 'lost'
  }
end
